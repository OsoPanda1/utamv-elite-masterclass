// ============================================
// UTAMV Campus - Página de Cancelación de Pago
// ============================================

import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, HelpCircle, RefreshCw } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-10 w-10 text-muted-foreground" />
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-2">Pago cancelado</h1>
            <p className="text-muted-foreground mb-6">
              No se ha realizado ningún cargo. Puedes intentar nuevamente cuando estés listo.
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

            <div className="mt-8 pt-6 border-t border-border text-left">
              <h3 className="font-medium text-foreground mb-3">Razones comunes:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <RefreshCw className="h-4 w-4 mt-0.5" />
                  <span>Decidiste continuar en otro momento</span>
                </li>
                <li className="flex items-start gap-2">
                  <RefreshCw className="h-4 w-4 mt-0.5" />
                  <span>Problema con el método de pago</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
