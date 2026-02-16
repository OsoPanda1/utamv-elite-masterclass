import { ArrowLeft, Award, Shield, CheckCircle, Globe, QrCode, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import certificationCeremony from '@/assets/certification-ceremony.jpg';
import certificatePreview from '@/assets/certificate-preview.png';
import utamvLogo from '@/assets/utamv-logo-official.jpg';

const Certificacion = () => {
  const validationFeatures = [
    {
      icon: QrCode,
      title: 'Código QR Único',
      description: 'Cada certificado incluye un QR que enlaza a su validación online.',
    },
    {
      icon: Globe,
      title: 'Verificación Pública',
      description: 'Cualquier empresa puede verificar la autenticidad de tu certificación.',
    },
    {
      icon: Shield,
      title: 'Anti-Falsificación',
      description: 'Sistema criptográfico que garantiza la autenticidad del documento.',
    },
    {
      icon: FileCheck,
      title: 'Registro Académico',
      description: 'Tu certificación queda registrada en el sistema académico UTAMV.',
    },
    {
      icon: Shield,
      title: 'Seguridad Social en la Web',
      description: 'Cuentas con protección de datos y cumplimiento normativo GDPR/LGPD.',
    },
    {
      icon: Globe,
      title: 'Validez Internacional',
      description: 'Reconocimiento en más de 15 países con verificación digital.',
    },
  ];

  const certificationLevels = [
    {
      level: 'Certificado Profesional',
      description: 'Por completar módulos individuales',
      requirements: ['Aprobar el examen del módulo (70% mínimo)', 'Completar las prácticas del módulo'],
    },
    {
      level: 'Master Elite Profesional',
      description: 'Por completar el programa completo',
      requirements: ['Aprobar los 10 módulos', 'Presentar proyecto final', 'Obtener calificación global de 80%+'],
    },
    {
      level: 'Doctorado Profesional',
      description: 'Nivel máximo de certificación',
      requirements: ['Completar el Master', 'Desarrollar tesis de investigación', 'Defensa ante comité académico'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={certificationCeremony} 
            alt="" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-silver/50 shadow-silver">
              <img src={utamvLogo} alt="UTAMV" className="w-full h-full object-cover" />
            </div>
            <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold text-sm font-medium mb-4">
              Acreditación Académica
            </span>
            <h1 className="section-title">Certificación UTAMV</h1>
            <p className="section-subtitle">
              Obtén una certificación reconocida con validación verificable, 
              respaldada por la Universidad Tecnológica Avanzada del Marketing Virtual.
            </p>
          </div>
        </div>
      </section>

      {/* Certificate Preview */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-silver/20 via-teal/10 to-silver/20 rounded-3xl blur-xl opacity-30" />
              <div className="relative rounded-2xl overflow-hidden border border-silver/30 shadow-silver">
                <img 
                  src={certificatePreview} 
                  alt="Vista previa del certificado UTAMV"
                  className="w-full h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Validation Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-foreground">
            Sistema de Validación
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {validationFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-card border border-border">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Levels */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-foreground">
            Niveles de Certificación
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {certificationLevels.map((cert, index) => (
              <div key={index} className="card-elite p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      {cert.level}
                    </h3>
                    <p className="text-muted-foreground mb-4">{cert.description}</p>
                    <div className="space-y-2">
                      {cert.requirements.map((req, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-teal flex-shrink-0" />
                          <span className="text-foreground">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4 text-foreground">
            Verifica un Certificado
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            ¿Necesitas verificar la autenticidad de un certificado UTAMV? 
            Usa nuestro sistema de validación pública.
          </p>
          <Button variant="goldOutline" size="lg" asChild>
            <Link to="/verificar-certificado">
              <Shield className="w-5 h-5 mr-2" />
              Verificar Certificado
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4 text-foreground">
            Obtén tu Certificación
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Inicia tu camino hacia la certificación profesional en marketing digital.
          </p>
          <Button variant="elite" size="xl" asChild>
            <Link to="/inscripcion">Inscribirme Ahora</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Certificacion;
