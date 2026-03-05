// ============================================
// UTAMV Campus - Página de Cancelación de Pago
// ============================================

import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  XCircle, 
  Loader2, 
  RefreshCw,
  HelpCircle,
  ArrowLeft
} from "lucide-react";

export default function CheckoutCancelPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [updating, setUpdating] = useState(true);

  useEffect(() => {
    const cancelOrder = async () => {
      if (!orderId) {
        setUpdating(false);
        return;
      }

      try {
        // Actualizar orden a cancelada
        const { error } = await supabase
          .from("orders")
          .update({ status: "cancelled" })
          .eq("id", orderId);

        if (error) {
          console.error("Error canceling order:", error);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setUpdating(false);
      }
    };

    cancelOrder();
  }, [orderId]);

  if (updating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            {/* Icono */}
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-10 w-10 text-gray-500" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pago cancelado
            </h1>
            
            <p className="text-gray-600 mb-6">
              No te preocupes, no se ha realizado ningún cargo a tu cuenta.
              Puedes intentar nuevamente cuando estés listo.
            </p>

            <div className="space-y-3">
              <Button asChild variant="outline" className="w-full">
                <Link to="/programas">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a programas
                </Link>
              </Button>
              
              <Button asChild className="w-full">
                <Link to="/ayuda">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  ¿Necesitas ayuda?
                </Link>
              </Button>
            </div>

            {/* Razones comunes */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-left">
              <h3 className="font-medium text-gray-900 mb-3">
                Razones comunes de cancelación:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <RefreshCw className="h-4 w-4 mt-0.5 text-gray-400" />
                  <span>Decidiste continuar en otro momento</span>
                </li>
                <li className="flex items-start gap-2">
                  <RefreshCw className="h-4 w-4 mt-0.5 text-gray-400" />
                  <span>Hubo un problema con el método de pago</span>
                </li>
                <li className="flex items-start gap-2">
                  <RefreshCw className="h-4 w-4 mt-0.5 text-gray-400" />
                  <span>Quieres revisar más detalles del programa</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
