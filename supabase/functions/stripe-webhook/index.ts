import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, stripe-signature",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    // Validar configuración crítica
    if (!stripeKey || !webhookSecret || !supabaseUrl || !serviceRoleKey) {
      console.error("Missing critical environment variables for webhook", {
        hasStripeKey: !!stripeKey,
        hasWebhookSecret: !!webhookSecret,
        hasSupabaseUrl: !!supabaseUrl,
        hasServiceRoleKey: !!serviceRoleKey,
      });
      return new Response("Webhook misconfigured", {
        status: 500,
        headers: corsHeaders,
      });
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    const signature = req.headers.get("stripe-signature");
    const body = await req.text();

    if (!signature) {
      console.error("Missing Stripe signature header");
      return new Response("Missing signature", {
        status: 400,
        headers: corsHeaders,
      });
    }

    let event: Stripe.Event;

    // Validación ESTRICTA de firma (sin fallback)
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response("Invalid signature", {
        status: 400,
        headers: corsHeaders,
      });
    }

    console.log("✅ Received Stripe event:", event.id, event.type);

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout completed:", {
          session_id: session.id,
          payment_intent: session.payment_intent,
        });

        const userId = session.metadata?.user_id;
        const courseId = session.metadata?.course_id;

        if (!userId) {
          console.error("❌ No user_id in session metadata, aborting update");
          break;
        }

        // Actualizar registro de pagos si existe
        const { error: paymentError } = await supabase
          .from("payments")
          .update({
            status: "completed",
            stripe_payment_intent_id: session.payment_intent as string,
          })
          .eq("stripe_session_id", session.id);

        if (paymentError) {
          console.error("Error updating payment:", paymentError);
        }

        // Marcar usuario como pagado (solo vía service role)
        const { error: profileError } = await supabase
          .from("profiles")
          .update({ is_paid: true })
          .eq("user_id", userId);

        if (profileError) {
          console.error("Error updating profile:", profileError);
        } else {
          console.log("✅ User marked as paid:", { user_id: userId, courseId });
        }

        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout expired:", { session_id: session.id });

        const { error } = await supabase
          .from("payments")
          .update({ status: "expired" })
          .eq("stripe_session_id", session.id);

        if (error) {
          console.error("Error updating expired payment:", error);
        }

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", { payment_intent_id: paymentIntent.id });

        const { error } = await supabase
          .from("payments")
          .update({ status: "failed" })
          .eq("stripe_payment_intent_id", paymentIntent.id);

        if (error) {
          console.error("Error updating failed payment:", error);
        }

        break;
      }

      default:
        // No hacemos nada para otros eventos, solo log
        console.log("Unhandled event type:", event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
