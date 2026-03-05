// ============================================
// UTAMV Campus - Página de Checkout por Programa
// ============================================

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCheckout } from "@/hooks/useCheckout";
import { useEnrollments } from "@/hooks/useEnrollments";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Loader2, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle,
  AlertCircle,
  BookOpen,
  Clock,
  Award
} from "lucide-react";
import { toast } from "sonner";
import { formatAmount } from "@/lib/payments";

interface Program {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  currency: string;
  slug: string;
}

export default function ProgramCheckoutPage() {
  const { programSlug } = useParams<{ programSlug: string }>();
  const navigate = useNavigate();
  const { startCheckout, loading: checkoutLoading, error } = useCheckout();
  const { hasActiveEnrollment, loading: enrollmentsLoading } = useEnrollments();
  
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);

  useEffect(() => {
    const loadProgram = async () => {
      if (!programSlug) {
        navigate("/programas");
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("programs")
        .select("id, name, description, price_cents, currency, slug")
        .eq("slug", programSlug)
        .eq("is_active", true)
        .single();

      if (error || !data) {
        toast.error("Programa no encontrado");
        navigate("/programas");
        return;
      }

      setProgram(data);
      
      // Verificar si ya está inscrito
      const enrolled = hasActiveEnrollment(data.id);
      setAlreadyEnrolled(enrolled);
      
      setLoading(false);
    };

    loadProgram();
  }, [programSlug, navigate, hasActiveEnrollment]);

  const handleCheckout = async () => {
    if (!program) return;

    const successUrl = `${window.location.origin}/checkout/success`;
    const cancelUrl = `${window.location.origin}/checkout/cancel`;

    await startCheckout(program.id, successUrl, cancelUrl);
  };

  if (loading || enrollmentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!program) {
    return null;
  }

  // Si ya está inscrito, mostrar mensaje
  if (alreadyEnrolled) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200">
            <CardContent className="pt-6 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Ya estás inscrito!
              </h1>
              <p className="text-gray-600 mb-6">
                Ya tienes acceso activo a este programa. Puedes continuar tu aprendizaje desde tu campus.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => navigate("/campus-virtual")}>
                  Ir al Campus
                </Button>
                <Button variant="outline" onClick={() => navigate("/programas")}>
                  Ver otros programas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Finalizar inscripción
          </h1>
          <p className="text-gray-600">
            Completa tu pago para obtener acceso inmediato al programa
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Resumen del programa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Resumen del programa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {program.name}
                </h3>
                <p className="text-gray-600 mt-2">{program.description}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Acceso de por vida</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="h-4 w-4" />
                  <span>Certificado digital incluido</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Garantía de 30 días</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Precio total</span>
                <span className="text-3xl font-bold text-blue-600">
                  {formatAmount(program.price_cents, program.currency)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Pago */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Método de pago
              </CardTitle>
              <CardDescription>
                Pago seguro procesado por Stripe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Seguridad */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">
                      Pago 100% seguro
                    </p>
                    <p className="text-sm text-blue-700">
                      Tu información está protegida con encriptación SSL de 256 bits.
                    </p>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Botón de pago */}
              <Button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full h-14 text-lg"
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Pagar {formatAmount(program.price_cents, program.currency)}
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-gray-500">
                Al hacer clic, serás redirigido a Stripe para completar tu pago de forma segura.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
