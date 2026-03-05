// ============================================
// UTAMV Campus - Librería de Pagos
// ============================================

import { supabase } from "@/integrations/supabase/client";

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
 * Obtiene los pagos del usuario actual
 */
export async function getUserPayments() {
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener pagos: ${error.message}`);
  }

  return data || [];
}

/**
 * Obtiene el estado de pago de un curso para el usuario actual
 */
export async function getCoursePaymentStatus(courseId: string): Promise<{
  hasPaid: boolean;
  paymentStatus: string | null;
}> {
  const { data } = await supabase
    .from("payments")
    .select("status")
    .eq("course_id", courseId)
    .eq("status", "succeeded")
    .maybeSingle();

  return {
    hasPaid: !!data,
    paymentStatus: data?.status || null,
  };
}
