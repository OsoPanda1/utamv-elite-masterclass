// ============================================
// UTAMV Campus - Página de Matrículas (simplificada)
// ============================================

import { Link } from "react-router-dom";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useCertificates } from "@/hooks/useCertificates";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, BookOpen, CheckCircle } from "lucide-react";
import { formatAmount } from "@/lib/payments";

export default function EnrollmentsPage() {
  const { enrollments, loading } = useEnrollments();
  const { certificates } = useCertificates();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Mis programas</h1>
          <p className="text-muted-foreground">Programas en los que estás inscrito</p>
        </div>

        {enrollments.length === 0 ? (
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Aún no estás inscrito en ningún programa
              </h2>
              <p className="text-muted-foreground mb-6">
                Explora nuestros programas disponibles y comienza tu formación.
              </p>
              <Button asChild>
                <Link to="/programas">Ver programas</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {enrollments.map((enrollment) => (
              <Card key={enrollment.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {enrollment.course_title || "Programa UTAMV"}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Inscrito: {new Date(enrollment.created_at).toLocaleDateString("es-MX")}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Activo
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatAmount(enrollment.amount_cents, enrollment.currency)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button asChild>
                      <Link to="/campus-virtual">
                        Continuar
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
