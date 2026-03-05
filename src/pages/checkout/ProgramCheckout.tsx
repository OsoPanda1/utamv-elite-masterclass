// ============================================
// UTAMV Campus - Página de Checkout por Programa
// ============================================

import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/hooks/useCheckout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, CreditCard, ShieldCheck, BookOpen, Clock, Award, AlertCircle } from "lucide-react";

export default function ProgramCheckoutPage() {
  const navigate = useNavigate();
  const { startCheckout, loading: checkoutLoading, error } = useCheckout();

  const handleCheckout = async () => {
    await startCheckout();
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Finalizar inscripción</h1>
          <p className="text-muted-foreground">Completa tu pago para obtener acceso al programa</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Resumen del programa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Máster Profesional en Marketing Digital 2026</h3>
                <p className="text-muted-foreground mt-2">Programa insignia de formación avanzada en marketing digital con IA.</p>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" /><span>50+ horas de contenido</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4" /><span>Certificado digital incluido</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" /><span>Acceso de por vida</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Método de pago
              </CardTitle>
              <CardDescription>Pago seguro procesado por Stripe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Pago 100% seguro</p>
                    <p className="text-sm text-muted-foreground">Encriptación SSL de 256 bits.</p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                </div>
              )}

              <Button onClick={handleCheckout} disabled={checkoutLoading} className="w-full h-14 text-lg">
                {checkoutLoading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Procesando...</>
                ) : (
                  <><CreditCard className="mr-2 h-5 w-5" />Proceder al pago</>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Serás redirigido a Stripe para completar tu pago de forma segura.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
