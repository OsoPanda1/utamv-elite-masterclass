// ============================================
// UTAMV Campus - Edge Function: Stripe Webhook
// ============================================

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.10.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (req) => {
  const sig = req.headers.get("Stripe-Signature");
  const body = await req.text();

  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Manejar evento checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};
    const orderId = metadata.order_id;
    const programId = metadata.program_id;
    const userId = metadata.user_id;

    if (!orderId || !programId || !userId) {
      console.error("Missing metadata in checkout session");
      return new Response("Missing metadata", { status: 400 });
    }

    try {
      // Verificar que la orden existe y está pendiente
      const { data: existingOrder } = await supabase
        .from("orders")
        .select("id, status")
        .eq("id", orderId)
        .single();

      if (!existingOrder) {
        console.error("Order not found:", orderId);
        return new Response("Order not found", { status: 404 });
      }

      if (existingOrder.status === "paid") {
        console.log("Order already processed:", orderId);
        return new Response("OK", { status: 200 });
      }

      // Registrar el pago
      const paymentIntentId = session.payment_intent as string;
      const amount = session.amount_total ?? 0;
      const currency = session.currency ?? "mxn";

      const { error: paymentError } = await supabase.from("payments").insert({
        order_id: orderId,
        provider: "stripe",
        provider_payment_id: paymentIntentId,
        amount_cents: amount,
        currency,
        status: "succeeded",
        raw_payload: event,
      });

      if (paymentError) {
        console.error("Payment insert error:", paymentError);
      }

      // Actualizar orden a pagada
      const { error: orderError } = await supabase
        .from("orders")
        .update({ 
          status: "paid",
          updated_at: new Date().toISOString()
        })
        .eq("id", orderId);

      if (orderError) {
        console.error("Order update error:", orderError);
        return new Response("Failed to update order", { status: 500 });
      }

      // Crear o actualizar matrícula
      const { error: enrollError } = await supabase
        .from("enrollments")
        .upsert(
          {
            user_id: userId,
            program_id: programId,
            order_id: orderId,
            status: "inscrito",
            started_at: new Date().toISOString(),
          },
          { 
            onConflict: "unique_user_program",
            ignoreDuplicates: false 
          }
        );

      if (enrollError) {
        console.error("Enrollment upsert error:", enrollError);
        return new Response("Failed to create enrollment", { status: 500 });
      }

      console.log("Payment processed successfully for order:", orderId);
    } catch (error: any) {
      console.error("Error processing checkout:", error);
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  }

  // Manejar evento charge.refunded
  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    
    // Buscar el pago relacionado
    const { data: payment } = await supabase
      .from("payments")
      .select("id, order_id")
      .eq("provider_payment_id", charge.payment_intent)
      .single();

    if (payment) {
      // Actualizar estado del pago
      await supabase
        .from("payments")
        .update({ status: "refunded" })
        .eq("id", payment.id);

      // Actualizar orden
      await supabase
        .from("orders")
        .update({ status: "refunded" })
        .eq("id", payment.order_id);

      // Opcional: revocar acceso
      const { data: order } = await supabase
        .from("orders")
        .select("user_id, program_id")
        .eq("id", payment.order_id)
        .single();

      if (order) {
        await supabase
          .from("enrollments")
          .update({ status: "revocado" })
          .eq("user_id", order.user_id)
          .eq("program_id", order.program_id);
      }
    }
  }

  return new Response("OK", { status: 200 });
});
