// ============================================
// UTAMV Campus - Página de Matrículas
// ============================================

import { Link } from "react-router-dom";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useCertificates } from "@/hooks/useCertificates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Loader2, 
  BookOpen, 
  GraduationCap, 
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  FileText
} from "lucide-react";
import { formatAmount } from "@/lib/payments";
import { formatPublicId } from "@/lib/certificates";

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  preinscrito: { 
    label: "Preinscrito", 
    color: "bg-gray-100 text-gray-700",
    icon: <Clock className="h-4 w-4" />
  },
  inscrito: { 
    label: "Inscrito", 
    color: "bg-blue-100 text-blue-700",
    icon: <CheckCircle className="h-4 w-4" />
  },
  en_curso: { 
    label: "En curso", 
    color: "bg-yellow-100 text-yellow-700",
    icon: <BookOpen className="h-4 w-4" />
  },
  completado: { 
    label: "Completado", 
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle className="h-4 w-4" />
  },
  egresado: { 
    label: "Egresado", 
    color: "bg-purple-100 text-purple-700",
    icon: <GraduationCap className="h-4 w-4" />
  },
  titulado: { 
    label: "Titulado", 
    color: "bg-indigo-100 text-indigo-700",
    icon: <Award className="h-4 w-4" />
  },
  suspendido: { 
    label: "Suspendido", 
    color: "bg-orange-100 text-orange-700",
    icon: <AlertCircle className="h-4 w-4" />
  },
  baja: { 
    label: "Baja", 
    color: "bg-red-100 text-red-700",
    icon: <AlertCircle className="h-4 w-4" />
  },
  revocado: { 
    label: "Revocado", 
    color: "bg-red-100 text-red-700",
    icon: <AlertCircle className="h-4 w-4" />
  },
};

export default function EnrollmentsPage() {
  const { enrollments, loading } = useEnrollments();
  const { certificates, canRequestCertificate, requestCertificate } = useCertificates();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Separar matrículas activas de inactivas
  const activeEnrollments = enrollments.filter(e => 
    ["inscrito", "en_curso", "completado", "egresado", "titulado"].includes(e.status)
  );
  
  const inactiveEnrollments = enrollments.filter(e => 
    ["preinscrito", "suspendido", "baja", "revocado"].includes(e.status)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mis programas
          </h1>
          <p className="text-gray-600">
            Gestiona tus inscripciones y accede a tus programas activos
          </p>
        </div>

        {enrollments.length === 0 ? (
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Aún no estás inscrito en ningún programa
              </h2>
              <p className="text-gray-600 mb-6">
                Explora nuestros programas disponibles y comienza tu formación hoy.
              </p>
              <Button asChild>
                <Link to="/programas">Ver programas disponibles</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Programas activos */}
            {activeEnrollments.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Programas activos ({activeEnrollments.length})
                </h2>
                <div className="grid gap-4">
                  {activeEnrollments.map((enrollment) => (
                    <EnrollmentCard 
                      key={enrollment.id} 
                      enrollment={enrollment}
                      certificate={certificates.find(c => c.enrollment_id === enrollment.id)}
                      canRequestCert={canRequestCertificate(enrollment.id)}
                      onRequestCertificate={() => requestCertificate(enrollment.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Programas inactivos */}
            {inactiveEnrollments.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Inscripciones inactivas ({inactiveEnrollments.length})
                </h2>
                <div className="grid gap-4">
                  {inactiveEnrollments.map((enrollment) => (
                    <EnrollmentCard 
                      key={enrollment.id} 
                      enrollment={enrollment}
                      certificate={certificates.find(c => c.enrollment_id === enrollment.id)}
                      canRequestCert={false}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface EnrollmentCardProps {
  enrollment: import("@/hooks/useEnrollments").Enrollment;
  certificate?: import("@/lib/certificates").Certificate;
  canRequestCert: boolean;
  onRequestCertificate?: () => void;
}

function EnrollmentCard({ enrollment, certificate, canRequestCert, onRequestCertificate }: EnrollmentCardProps) {
  const status = statusConfig[enrollment.status] || statusConfig.preinscrito;
  const isCompleted = ["completado", "egresado", "titulado"].includes(enrollment.status);
  const isActive = ["inscrito", "en_curso"].includes(enrollment.status);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Info del programa */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge className={status.color}>
                <span className="flex items-center gap-1">
                  {status.icon}
                  {status.label}
                </span>
              </Badge>
              {certificate && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <Award className="h-3 w-3 mr-1" />
                  Certificado emitido
                </Badge>
              )}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {enrollment.program?.name || "Programa"}
            </h3>
            
            <p className="text-sm text-gray-500 mb-4">
              Iniciado el {new Date(enrollment.started_at).toLocaleDateString("es-MX")}
            </p>

            {/* Progreso */}
            {isActive && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progreso</span>
                  <span className="font-medium">{enrollment.progress_percent}%</span>
                </div>
                <Progress value={enrollment.progress_percent} className="h-2" />
              </div>
            )}

            {/* Calificación final */}
            {enrollment.final_grade && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-gray-600">Calificación final:</span>
                <span className={`font-semibold ${
                  enrollment.final_grade >= 80 ? "text-green-600" : 
                  enrollment.final_grade >= 60 ? "text-yellow-600" : "text-red-600"
                }`}>
                  {enrollment.final_grade}/100
                </span>
              </div>
            )}

            {/* Info de certificado */}
            {certificate && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-green-800">
                  <Award className="h-4 w-4" />
                  <span className="font-medium">Certificado válido</span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  ID: {formatPublicId(certificate.public_id)}
                </p>
              </div>
            )}
          </div>

          {/* Acciones */}
          <div className="flex flex-col gap-2 md:items-end">
            {isActive && enrollment.program?.slug && (
              <Button asChild>
                <Link to={`/campus/programas/${enrollment.program.slug}`}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Continuar
                </Link>
              </Button>
            )}

            {canRequestCert && onRequestCertificate && (
              <Button variant="outline" onClick={onRequestCertificate}>
                <FileText className="mr-2 h-4 w-4" />
                Solicitar certificado
              </Button>
            )}

            {certificate && (
              <Button variant="outline" asChild>
                <Link to={`/verificar-certificado/${certificate.public_id}`} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Verificar certificado
                </Link>
              </Button>
            )}

            {enrollment.order && (
              <div className="text-sm text-gray-500 mt-2">
                <p>Pagado: {formatAmount(enrollment.order.total_amount_cents, enrollment.order.currency)}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
