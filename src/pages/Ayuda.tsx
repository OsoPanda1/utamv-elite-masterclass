import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, MessageCircle, FileText, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: '¿Cómo accedo al Campus Virtual?',
    a: 'Una vez completado el proceso de admisión y pago, recibirás credenciales de acceso. Ingresa desde el menú "Campus Virtual" o directamente en /campus-virtual.',
  },
  {
    q: '¿Cómo se guarda mi progreso?',
    a: 'El sistema guarda tu avance automáticamente cada 30 segundos mientras estás activo en una lección. Tu progreso se mantiene al cerrar sesión.',
  },
  {
    q: '¿Cuántas consultas de IA tengo disponibles?',
    a: 'Cada estudiante tiene 10 consultas diarias con Isabella IA. El contador se reinicia cada día a las 00:00 UTC.',
  },
  {
    q: '¿Cómo verifico mi certificado?',
    a: 'Puedes verificar cualquier certificado UTAMV ingresando el número de certificado en la página de verificación.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos tarjetas Visa, Mastercard, American Express y PayPal a través de nuestra pasarela de pago segura.',
  },
];

const Ayuda = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-20">
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            CENTRO DE AYUDA
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más frecuentes o contacta con nuestro equipo de soporte.
          </p>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <a href="mailto:info@utamv.edu" className="p-6 rounded-xl border border-border bg-card/30 text-center hover:bg-card/60 transition-colors">
              <Mail className="w-6 h-6 text-silver mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-foreground mb-1">Correo electrónico</h3>
              <p className="text-xs text-muted-foreground">info@utamv.edu</p>
            </a>
            <Link to="/campus-virtual" className="p-6 rounded-xl border border-border bg-card/30 text-center hover:bg-card/60 transition-colors">
              <MessageCircle className="w-6 h-6 text-silver mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-foreground mb-1">Soporte en Campus</h3>
              <p className="text-xs text-muted-foreground">Chat y tickets</p>
            </Link>
            <Link to="/verificar-certificado" className="p-6 rounded-xl border border-border bg-card/30 text-center hover:bg-card/60 transition-colors">
              <FileText className="w-6 h-6 text-silver mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-foreground mb-1">Verificar certificado</h3>
              <p className="text-xs text-muted-foreground">Validación en línea</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center tracking-wider uppercase">
            Preguntas Frecuentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group p-4 rounded-xl border border-border bg-card/30">
                <summary className="flex items-center gap-3 cursor-pointer text-sm font-semibold text-foreground list-none">
                  <HelpCircle className="w-4 h-4 text-silver shrink-0" />
                  {faq.q}
                </summary>
                <p className="text-sm text-muted-foreground mt-3 ml-7 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Ayuda;
