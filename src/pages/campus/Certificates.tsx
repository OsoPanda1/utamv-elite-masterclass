// ============================================
// UTAMV Campus - Página de Certificados (simplificada)
// ============================================

import { useCertificates } from "@/hooks/useCertificates";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Award, CheckCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function CertificatesPage() {
  const { certificates, loading } = useCertificates();

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
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Mis certificados</h1>
          <p className="text-muted-foreground">Certificados académicos emitidos por UTAMV Campus</p>
        </div>

        {certificates.length > 0 ? (
          <div className="grid gap-4">
            {certificates.map((cert) => (
              <Card key={cert.id} className="border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                        <Award className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Certificado UTAMV</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          N.° {cert.certificate_number}
                        </p>
                        {cert.generated_at && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Emitido: {new Date(cert.generated_at).toLocaleDateString("es-MX")}
                          </p>
                        )}
                        <Badge variant="outline" className="mt-2 text-green-600 border-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Válido
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" asChild>
                      <Link to={`/verificar-certificado`}>
                        Verificar
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <Award className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Aún no tienes certificados</h2>
              <p className="text-muted-foreground mb-6">
                Completa un programa para obtener tu certificado académico.
              </p>
              <Button asChild>
                <Link to="/programas">Ver programas</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
