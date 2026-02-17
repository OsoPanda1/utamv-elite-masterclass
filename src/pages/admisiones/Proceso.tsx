import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, FileText, CheckCircle2, Clock, Mail, GraduationCap } from 'lucide-react';

const Proceso = () => {
  const steps = [
    {
      step: 1,
      title: 'Solicitud Online',
      description: 'Completa el formulario de admisión en línea con tus datos personales y académicos.',
      icon: FileText,
      duration: '15 minutos',
    },
    {
      step: 2,
      title: 'Envío de Documentos',
      description: 'Sube los documentos requeridos en formato digital (PDF).',
      icon: ArrowRight,
      duration: '1-2 días',
    },
    {
      step: 3,
      title: 'Evaluación Previa',
      description: 'Equipo de admisiones revisa tu solicitud y documentos.',
      icon: CheckCircle2,
      duration: '3-5 días',
    },
    {
      step: 4,
      title: 'Entrevista',
      description: 'Entrevista personal o por videoconferencia (para posgrado y maestrías).',
      icon: Clock,
      duration: '15-30 minutos',
    },
    {
      step: 5,
      title: 'Aprobación',
      description: 'Recibe la notificación de admisión por email.',
      icon: Mail,
      duration: '2-3 días',
    },
    {
      step: 6,
      title: 'Inscripción',
      description: 'Realiza el pago y completa tu inscripción.',
      icon: GraduationCap,
      duration: '1 día',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              PROCESO DE ADMISIÓN
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Guía completa para postular y ingresar a la UTAMV.
            </p>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="relative">
                      {index < steps.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-platinum/20 hidden md:block" />
                      )}
                      <div className="flex gap-6 items-start">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center border-2 border-platinum">
                            <Icon className="w-6 h-6 text-platinum" />
                          </div>
                          <div className="text-center mt-2 text-xs text-platinum font-bold">
                            Paso {step.step}
                          </div>
                        </div>
                        <div className="flex-1 bg-card/50 p-6 rounded-xl border border-platinum/20">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="font-display text-xl font-bold text-foreground">{step.title}</h3>
                            <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                Cronograma de Admisión
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-card/50 border border-platinum/20 rounded-xl">
                  <span className="text-foreground">Solicitud y documentos</span>
                  <span className="text-platinum font-semibold">1-3 días</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-card/50 border border-platinum/20 rounded-xl">
                  <span className="text-foreground">Evaluación y entrevista</span>
                  <span className="text-platinum font-semibold">3-7 días</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-card/50 border border-platinum/20 rounded-xl">
                  <span className="text-foreground">Aprobación y notificación</span>
                  <span className="text-platinum font-semibold">2-3 días</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-card/50 border border-platinum/20 rounded-xl">
                  <span className="text-foreground">Inscripción completa</span>
                  <span className="text-platinum font-semibold">1 día</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements Checklist */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                Checklist de Admisión
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card/50 p-6 rounded-xl border border-platinum/20">
                  <h3 className="font-semibold text-foreground mb-4">Documentos</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Identificación oficial (INE/IFE/Pasaporte)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Certificado de nacimiento</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Título de bachillerato/licenciatura</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Curriculum vitae actualizado</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Carta de motivación</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-card/50 p-6 rounded-xl border border-platinum/20">
                  <h3 className="font-semibold text-foreground mb-4">Proceso</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Formulario de admisión completado</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Documentos digitalizados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Evaluación previa aprobada</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Entrevista realizada</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Pago de inscripción</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-12 bg-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                ¿Necesitas Ayuda?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Nuestro equipo de admisiones está aquí para ayudarte en cada paso del proceso.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-platinum/20 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-platinum" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground">admisiones@utamv.edu.mx</p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-platinum/20 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-platinum" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Horario</h3>
                  <p className="text-sm text-muted-foreground">Lunes-Viernes: 9am-6pm</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Proceso;