// ============================================
// UTAMV Campus - Librería de Pagos
// ============================================

import { supabase } from "@/integrations/supabase/client";

export interface CheckoutSessionParams {
  programId: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutSessionResult {
  checkoutUrl: string;
  orderId: string;
}

export interface Order {
  id: string;
  user_id: string;
  program_id: string;
  status: "pending" | "paid" | "cancelled" | "expired" | "refunded";
  total_amount_cents: number;
  currency: string;
  external_checkout_id: string | null;
  created_at: string;
  updated_at: string;
  programs?: {
    name: string;
    slug: string;
  };
}

export interface Payment {
  id: string;
  order_id: string;
  provider: string;
  provider_payment_id: string;
  amount_cents: number;
  currency: string;
  status: "succeeded" | "failed" | "refunded" | "pending" | "disputed";
  created_at: string;
}

/**
 * Crea una sesión de checkout de Stripe para un programa
 */
export async function createCheckoutSession(
  params: CheckoutSessionParams
): Promise<CheckoutSessionResult> {
  const baseUrl = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || 
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
  
  const defaultSuccessUrl = `${window.location.origin}/checkout/success`;
  const defaultCancelUrl = `${window.location.origin}/checkout/cancel`;

  const { data: session } = await supabase.auth.getSession();
  const token = session?.session?.access_token;

  if (!token) {
    throw new Error("Usuario no autenticado");
  }

  const res = await fetch(`${baseUrl}/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      programId: params.programId,
      successUrl: params.successUrl || defaultSuccessUrl,
      cancelUrl: params.cancelUrl || defaultCancelUrl,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Error desconocido" }));
    throw new Error(error.message || "No se pudo iniciar el proceso de pago");
  }

  const data = await res.json();
  return {
    checkoutUrl: data.checkoutUrl,
    orderId: data.orderId,
  };
}

/**
 * Obtiene las órdenes del usuario actual
 */
export async function getUserOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      programs(name, slug)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener órdenes: ${error.message}`);
  }

  return (data || []).map((order) => ({
    ...order,
    programs: order.programs ? {
      name: (order.programs as any).name,
      slug: (order.programs as any).slug,
    } : undefined,
  }));
}

/**
 * Obtiene una orden específica por ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      programs(name, slug)
    `)
    .eq("id", orderId)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Error al obtener orden: ${error.message}`);
  }

  return {
    ...data,
    programs: data.programs ? {
      name: (data.programs as any).name,
      slug: (data.programs as any).slug,
    } : undefined,
  };
}

/**
 * Obtiene los pagos del usuario actual
 */
export async function getUserPayments(): Promise<Payment[]> {
  const { data, error } = await supabase
    .from("payments")
    .select(`
      *,
      orders!inner(user_id)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener pagos: ${error.message}`);
  }

  return data || [];
}

/**
 * Formatea un monto en centavos a formato de moneda
 */
export function formatAmount(cents: number, currency: string = "mxn"): string {
  const amount = cents / 100;
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: currency.toUpperCase(),
  });
  return formatter.format(amount);
}

/**
 * Obtiene el estado de pago de un programa para el usuario actual
 */
export async function getProgramPaymentStatus(programId: string): Promise<{
  hasActiveEnrollment: boolean;
  enrollmentStatus: string | null;
  orderStatus: string | null;
}> {
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("status")
    .eq("program_id", programId)
    .maybeSingle();

  const { data: order } = await supabase
    .from("orders")
    .select("status")
    .eq("program_id", programId)
    .eq("status", "paid")
    .maybeSingle();

  return {
    hasActiveEnrollment: enrollment?.status === "active" || enrollment?.status === "en_curso",
    enrollmentStatus: enrollment?.status || null,
    orderStatus: order?.status || null,
  };
}

/**
 * Mapea productos de Stripe a programas UTAMV
 */
export function mapStripeProductToProgram(stripeProductId: string): {
  programId: string | null;
  programName: string | null;
} {
  const productMap: Record<string, { programId: string; programName: string }> = {
    // Agregar aquí los mapeos de productos de Stripe
    "prod_example": {
      programId: "master-marketing-digital-2026",
      programName: "Master Profesional en Marketing Digital e IA",
    },
  };

  const mapping = productMap[stripeProductId];
  return {
    programId: mapping?.programId || null,
    programName: mapping?.programName || null,
  };
}

/**
 * Valida el estado de un pago con Stripe
 */
export async function validateStripePayment(
  paymentIntentId: string
): Promise<{
  valid: boolean;
  status: string;
  amount: number;
}> {
  const baseUrl = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || 
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

  const { data: session } = await supabase.auth.getSession();
  const token = session?.session?.access_token;

  const res = await fetch(`${baseUrl}/validate-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
    body: JSON.stringify({ paymentIntentId }),
  });

  if (!res.ok) {
    throw new Error("Error al validar el pago");
  }

  return await res.json();
}
