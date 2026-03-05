// ============================================
// UTAMV Campus - Página de Éxito de Pago
// ============================================

import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, BookOpen } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Card className="border-green-500/20">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-2">¡Pago completado!</h1>
            <p className="text-muted-foreground mb-6">
              Tu pago ha sido procesado correctamente.
              Recibirás un correo de confirmación con los detalles.
            </p>

            <div className="space-y-3">
              <Button asChild className="w-full h-12 text-lg">
                <Link to="/campus-virtual">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Entrar al Campus Virtual
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/programas">Ver programas</Link>
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Confirmación enviada</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Acceso inmediato</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
