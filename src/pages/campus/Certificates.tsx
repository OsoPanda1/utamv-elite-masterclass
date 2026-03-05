// ============================================
// UTAMV Campus - Página de Certificados
// ============================================

import { Link } from "react-router-dom";
import { useCertificates } from "@/hooks/useCertificates";
import { useEnrollments } from "@/hooks/useEnrollments";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  Award, 
  ExternalLink,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Download
} from "lucide-react";
import { formatPublicId } from "@/lib/certificates";
import { canRequestCertificate } from "@/lib/academic-rules";
import { toast } from "sonner";

export default function CertificatesPage() {
  const { certificates, requests, loading, requestCertificate } = useCertificates();
  const { enrollments } = useEnrollments();

  // Matrículas que pueden solicitar certificado
  const eligibleEnrollments = enrollments.filter(e => 
    canRequestCertificate(e.status)
  );

  // Filtrar las que no tienen certificado ni solicitud pendiente
  const canRequestFor = eligibleEnrollments.filter(e => {
    const hasCert = certificates.some(c => c.enrollment_id === e.id);
    const hasPendingRequest = requests.some(r => 
      r.enrollment_id === e.id && r.status === "pending"
    );
    return !hasCert && !hasPendingRequest;
  });

  const handleRequest = async (enrollmentId: string) => {
    try {
      await requestCertificate(enrollmentId);
    } catch (err) {
      // Error ya manejado en el hook
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mis certificados
          </h1>
          <p className="text-gray-600">
            Gestiona tus certificados académicos y solicita nuevos
          </p>
        </div>

        {/* Solicitudes pendientes */}
        {requests.filter(r => r.status === "pending").length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Solicitudes en proceso
            </h2>
            <div className="grid gap-4">
              {requests
                .filter(r => r.status === "pending")
                .map(request => {
                  const enrollment = enrollments.find(e => e.id === request.enrollment_id);
                  return (
                    <Card key={request.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-yellow-600" />
                          <div>
                            <p className="font-medium">{enrollment?.program?.name}</p>
                            <p className="text-sm text-gray-500">
                              Solicitud pendiente de revisión
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          En revisión
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </section>
        )}

        {/* Certificados emitidos */}
        {certificates.length > 0 ? (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Certificados emitidos ({certificates.length})
            </h2>
            <div className="grid gap-4">
              {certificates.map((cert) => (
                <Card key={cert.id} className="overflow-hidden border-green-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {cert.programs?.name || "Programa"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Emitido el {new Date(cert.issue_date).toLocaleDateString("es-MX", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Válido
                            </Badge>
                            <span className="text-sm font-mono text-gray-600">
                              ID: {formatPublicId(cert.public_id)}
                            </span>
                          </div>
                          {cert.final_average && (
                            <p className="text-sm mt-1">
                              Promedio final: <span className="font-semibold">{cert.final_average}/100</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button asChild variant="outline">
                          <Link to={`/verificar-certificado/${cert.public_id}`} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Verificar
                          </Link>
                        </Button>
                        {cert.pdf_url && (
                          <Button asChild>
                            <a href={cert.pdf_url} target="_blank" rel="noopener noreferrer">
                              <Download className="mr-2 h-4 w-4" />
                              Descargar PDF
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ) : (
          <Card className="mb-8">
            <CardContent className="pt-8 pb-8 text-center">
              <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Aún no tienes certificados
              </h2>
              <p className="text-gray-600">
                Completa un programa para solicitar tu certificado académico.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Programas elegibles para certificado */}
        {canRequestFor.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Programas listos para certificación
            </h2>
            <div className="grid gap-4">
              {canRequestFor.map((enrollment) => (
                <Card key={enrollment.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{enrollment.program?.name}</p>
                        <p className="text-sm text-gray-500">
                          Estado: {enrollment.status} • 
                          Promedio: {enrollment.final_grade}/100
                        </p>
                      </div>
                    </div>
                    <Button onClick={() => handleRequest(enrollment.id)}>
                      Solicitar certificado
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
