// ============================================
// UTAMV Campus - Hook de Checkout
// ============================================

import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UseCheckoutReturn {
  startCheckout: (successUrl?: string, cancelUrl?: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

/**
 * Hook para manejar el proceso de checkout de pagos
 */
export function useCheckout(): UseCheckoutReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = useCallback(
    async (successUrl?: string, cancelUrl?: string) => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fnError } = await supabase.functions.invoke("create-checkout-session", {
          body: {
            origin: window.location.origin,
            successUrl: successUrl || `${window.location.origin}/checkout/success`,
            cancelUrl: cancelUrl || `${window.location.origin}/checkout/cancel`,
          },
        });

        if (fnError) throw fnError;

        if (data?.url) {
          window.location.href = data.url;
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
  };
}
