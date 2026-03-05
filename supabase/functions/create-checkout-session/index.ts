// ============================================
// UTAMV Campus - Edge Function: Create Checkout Session
// ============================================

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.10.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (req) => {
  // Verificar método
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), { 
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Verificar autenticación
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { 
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { 
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Parsear body
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ message: "Invalid JSON body" }), { 
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { programId, successUrl, cancelUrl } = body;
  
  if (!programId || !successUrl || !cancelUrl) {
    return new Response(JSON.stringify({ message: "Missing required fields" }), { 
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Obtener información del programa
    const { data: program, error: programError } = await supabase
      .from("programs")
      .select("id, name, price_cents, currency")
      .eq("id", programId)
      .eq("is_active", true)
      .single();

    if (programError || !program) {
      return new Response(JSON.stringify({ message: "Program not found" }), { 
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Crear orden en estado pending
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        program_id: program.id,
        status: "pending",
        total_amount_cents: program.price_cents,
        currency: program.currency,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      console.error("Order creation error:", orderError);
      return new Response(JSON.stringify({ message: "Failed to create order" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: program.currency,
            product_data: {
              name: program.name,
              metadata: {
                program_id: program.id,
              },
            },
            unit_amount: program.price_cents,
          },
          quantity: 1,
        },
      ],
      success_url: `${successUrl}?order_id=${order.id}`,
      cancel_url: `${cancelUrl}?order_id=${order.id}`,
      metadata: {
        order_id: order.id,
        program_id: program.id,
        user_id: user.id,
      },
      customer_email: user.email,
    });

    // Actualizar orden con el ID de sesión
    await supabase
      .from("orders")
      .update({ external_checkout_id: session.id })
      .eq("id", order.id);

    return new Response(
      JSON.stringify({ 
        checkoutUrl: session.url,
        orderId: order.id 
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  } catch (error: any) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Internal server error" }), 
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
});
