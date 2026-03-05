// ============================================
// UTAMV Campus - Página de Éxito de Pago
// ============================================

import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById, formatAmount } from "@/lib/payments";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Loader2, 
  Mail,
  BookOpen,
  ExternalLink
} from "lucide-react";
import type { Order } from "@/lib/payments";

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      } catch (err) {
        console.error("Error loading order:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Card className="border-green-200">
          <CardContent className="pt-8 pb-8 text-center">
            {/* Icono de éxito */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Pago completado!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Tu pago ha sido procesado correctamente. 
              Recibirás un correo de confirmación con los detalles de tu inscripción.
            </p>

            {order && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Programa:</span>
                  <span className="font-medium">{order.programs?.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Monto:</span>
                  <span className="font-medium">
                    {formatAmount(order.total_amount_cents, order.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Orden:</span>
                  <span className="font-mono text-sm">{order.id.slice(0, 8)}...</span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Button asChild className="w-full h-12 text-lg">
                <Link to="/campus-virtual">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Entrar al Campus Virtual
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link to="/campus/enrollments">
                  Ver mis programas
                </Link>
              </Button>
            </div>

            {/* Info adicional */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Confirmación enviada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Acceso inmediato</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Soporte */}
        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Tienes alguna pregunta?{" "}
          <Link to="/ayuda" className="text-blue-600 hover:underline">
            Contacta a soporte
          </Link>
        </p>
      </div>
    </div>
  );
}
