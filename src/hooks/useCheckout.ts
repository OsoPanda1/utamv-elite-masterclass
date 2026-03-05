// ============================================
// UTAMV Campus - Hook de Checkout
// ============================================

import { useState, useCallback } from "react";
import { createCheckoutSession, CheckoutSessionParams } from "@/lib/payments";
import { toast } from "sonner";

interface UseCheckoutReturn {
  startCheckout: (programId: string, successUrl?: string, cancelUrl?: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  orderId: string | null;
}

/**
 * Hook para manejar el proceso de checkout de pagos
 * @returns Funciones y estado para el proceso de pago
 */
export function useCheckout(): UseCheckoutReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const startCheckout = useCallback(
    async (programId: string, successUrl?: string, cancelUrl?: string) => {
      setLoading(true);
      setError(null);
      setOrderId(null);

      try {
        const result = await createCheckoutSession({
          programId,
          successUrl,
          cancelUrl,
        });

        setOrderId(result.orderId);
        
        // Redirigir a Stripe
        if (result.checkoutUrl) {
          window.location.href = result.checkoutUrl;
        } else {
          throw new Error("No se recibió URL de checkout");
        }
      } catch (err: any) {
        const errorMessage = err.message || "Error al iniciar el proceso de pago";
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
      }
    },
    []
  );

  return {
    startCheckout,
    loading,
    error,
    orderId,
  };
}
