import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  Calendar, 
  User, 
  BookOpen,
  ArrowLeft,
  Shield,
  ExternalLink
} from 'lucide-react';
import utamvSeal from '@/assets/utamv-seal.png';

interface VerificationResult {
  valid: boolean;
  certificate?: {
    number: string;
    issued_at: string;
    holder: string;
    program: string;
    institution: string;
    status: string;
  };
  verification?: {
    timestamp: string;
    method: string;
    issuer: string;
  };
  error?: string;
  message?: string;
}

const VerifyCertificate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const certificateNumber = searchParams.get('cert');

  useEffect(() => {
    if (certificateNumber) {
      verifyCertificate();
    } else {
      setLoading(false);
    }
  }, [certificateNumber]);

  const verifyCertificate = async () => {
    try {
      // Validar formato de número de certificado
      const validCertFormat = /^UTAMV-\d+-.+/.test(certificateNumber!);
      if (!validCertFormat) {
        setResult({
          valid: false,
          error: 'Formato de certificado inválido',
          message: 'El número de certificado debe seguir el formato UTAMV-YYYYMMDD-XXXX',
        });
        setLoading(false);
        return;
      }

      // Buscar certificado en la base de datos
      const { data: certificate, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('certificate_number', certificateNumber)
        .single();

      if (error) {
        throw new Error('Certificado no encontrado');
      }

      // Obtener datos del usuario
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('user_id', certificate.user_id)
        .single();

      // Obtener datos del curso
      const { data: course } = await supabase
        .from('courses')
        .select('title')
        .eq('id', certificate.course_id)
        .single();

      // Generar resultado de verificación
      const verificationResult: VerificationResult = {
        valid: true,
        certificate: {
          number: certificate.certificate_number,
          issued_at: certificate.generated_at,
          holder: profile?.full_name || 'Estudiante UTAMV',
          program: course?.title || 'Programa no especificado',
          institution: 'UTAMV - Universidad Tecnológica Avanzada del Marketing Virtual',
          status: 'Activo',
        },
        verification: {
          timestamp: new Date().toISOString(),
          method: 'Online Verification System',
          issuer: 'UTAMV Academic Registry',
        },
      };

      setResult(verificationResult);
    } catch (err) {
      console.error('Verification error:', err);
      setResult({
        valid: false,
        error: 'Certificado no válido',
        message: 'El certificado no se encuentra registrado en el sistema académico UTAMV.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-silver-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando certificado...</p>
          <p className="text-sm text-muted-foreground mt-2">
            N°: {certificateNumber}
          </p>
        </div>
      </div>
    );
  }

  if (!certificateNumber) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-card border-2 border-silver-primary mx-auto mb-6 flex items-center justify-center shadow-silver">
            <Shield className="w-10 h-10 text-silver-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient-silver mb-4">
            Verificación de Certificados
          </h1>
          <p className="text-muted-foreground mb-8">
            Sistema de validación oficial UTAMV. Ingrese o escanee un código QR para verificar la autenticidad de un certificado.
          </p>
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-card border-2 border-silver-primary flex items-center justify-center shadow-silver">
              <img src={utamvSeal} alt="UTAMV" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-gradient-silver">
                UTAMV
              </h1>
              <p className="text-sm text-muted-foreground">Sistema de Verificación</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Inicio
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Result Card */}
          <div className={`card-elite p-8 border-2 ${
            result?.valid 
              ? 'border-primary/50 bg-primary/5' 
              : 'border-destructive/50 bg-destructive/5'
          }`}>
            {/* Status Icon */}
            <div className="flex justify-center mb-6">
              {result?.valid ? (
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-scale-in">
                  <CheckCircle2 className="w-14 h-14 text-primary" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center animate-scale-in">
                  <XCircle className="w-14 h-14 text-destructive" />
                </div>
              )}
            </div>

            {/* Status Title */}
            <h2 className={`font-display text-3xl font-bold text-center mb-2 ${
              result?.valid ? 'text-primary' : 'text-destructive'
            }`}>
              {result?.valid ? 'CERTIFICADO VÁLIDO' : 'CERTIFICADO NO VÁLIDO'}
            </h2>

            <p className="text-center text-muted-foreground mb-8">
              {result?.valid 
                ? 'Este certificado ha sido verificado exitosamente.'
                : result?.message || 'No se pudo verificar este certificado.'}
            </p>

            {/* Certificate Details */}
            {result?.valid && result.certificate && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">Número de Certificado</span>
                    </div>
                    <p className="font-mono font-semibold text-foreground">
                      {result.certificate.number}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Fecha de Emisión</span>
                    </div>
                    <p className="font-semibold text-foreground">
                      {new Date(result.certificate.issued_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Titular</span>
                    </div>
                    <p className="font-semibold text-foreground">
                      {result.certificate.holder}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm">Programa</span>
                    </div>
                    <p className="font-semibold text-foreground text-sm">
                      {result.certificate.program}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-silver-primary/10 border border-silver-primary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-silver-primary" />
                    <span className="font-semibold text-foreground">
                      {result.certificate.institution}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Estado: <span className="text-primary font-medium">{result.certificate.status}</span>
                  </p>
                </div>

                {/* Verification metadata */}
                {result.verification && (
                  <div className="pt-4 border-t border-border text-center text-sm text-muted-foreground">
                    <p>Verificación realizada: {new Date(result.verification.timestamp).toLocaleString('es-ES')}</p>
                    <p>Método: {result.verification.method}</p>
                    <p className="mt-2 text-xs">Powered by {result.verification.issuer}</p>
                  </div>
                )}
              </div>
            )}

            {/* Error message */}
            {!result?.valid && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Número consultado: <span className="font-mono">{certificateNumber}</span>
                </p>
                <Button variant="outline" onClick={() => navigate('/')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al inicio
                </Button>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Sistema de verificación digital UTAMV
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Tecnología TAMV ONLINE - Orgullosamente Realmontenses
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyCertificate;
