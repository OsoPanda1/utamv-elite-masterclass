import { Check, Shield, Clock, Award, Users, FileText, Headphones, Sparkles, CreditCard, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Inscripcion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    { icon: FileText, text: 'Contenido multimedia estructurado por módulos' },
    { icon: Clock, text: 'Formación académica con horas acreditables' },
    { icon: Award, text: 'Certificación UTAMV con verificación digital QR' },
    { icon: Users, text: 'Acceso a la comunidad de estudiantes y egresados' },
    { icon: Headphones, text: 'Soporte académico y tutoría con IA' },
    { icon: Shield, text: 'Acceso permanente al contenido del programa' },
  ];

  const tiers = [
    {
      name: 'Certificado Profesional',
      priceMXN: 1200, promoMXN: 600,
      priceUSD: 60,
      monthly: null,
      description: 'Programa introductorio en áreas específicas.',
      features: ['5–8 horas de formación', 'Certificado digital UTAMV', 'Acceso a recursos básicos', 'Evaluación continua por quiz'],
      slug: 'certificado-profesional',
    },
    {
      name: 'Diplomado',
      priceMXN: 4900, promoMXN: 2450,
      priceUSD: 250,
      monthly: { months: 3, amount: 850 },
      description: 'Formación especializada intensiva con proyectos prácticos.',
      features: ['25–40 horas de formación', 'Diplomado UTAMV con sello digital', 'Proyectos prácticos guiados', 'Tutoría semanal', 'Comunidad de especialización'],
      slug: 'diplomado-seo-avanzado',
    },
    {
      name: 'Máster Profesional',
      priceMXN: 6900, promoMXN: 3450,
      priceUSD: 350,
      monthly: { months: 4, amount: 900 },
      description: 'Programa insignia de formación avanzada con proyecto integrador.',
      features: ['50+ horas de formación', 'Certificación UTAMV completa', 'Proyecto integrador con caso real', 'Tutoría personalizada', 'Comunidad VIP', 'Acceso permanente'],
      slug: 'master-marketing-digital-2026',
      featured: true,
    },
    {
      name: 'Maestría',
      priceMXN: 11900, promoMXN: 5950,
      priceUSD: 600,
      monthly: { months: 6, amount: 1050 },
      description: 'Programa de posgrado con investigación aplicada y tesis.',
      features: ['160–200+ horas de formación', 'Grado de maestría UTAMV', 'Tesis con asesor académico', 'Mentoría personalizada', 'Red profesional de egresados'],
      slug: 'maestria-marketing-digital',
    },
    {
      name: 'Doctorado Profesional',
      priceMXN: 29900, promoMXN: 14950,
      priceUSD: 1500,
      monthly: { months: 10, amount: 1600 },
      description: 'Investigación aplicada y dirección estratégica. Incluye tesis doctoral.',
      features: ['120+ horas de formación', 'Tesis doctoral con comité', 'Mentoría personalizada', 'Publicación académica', 'Acceso a seminarios'],
      slug: 'doctorado-inteligencia-estrategica',
    },
  ];

  const handleEnroll = async (tier: string) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: 'Inicia sesión primero', description: 'Necesitas una cuenta para solicitar admisión.' });
        navigate('/auth');
        return;
      }
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { origin: window.location.origin, tier },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch {
      toast({ title: 'Error', description: 'No se pudo iniciar el proceso. Intenta nuevamente.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              ADMISIONES
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Selecciona el programa que mejor se adapte a tu perfil profesional.
              Precios en pesos mexicanos (MXN) con equivalente en USD.
            </p>
            {/* Promo Banner */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary">
              <Tag className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Primera Generación 2026–2027: 50% de descuento para los primeros 100 estudiantes
              </span>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {tiers.map((tier, i) => (
                <div key={i}
                  className={`relative rounded-xl border overflow-hidden ${
                    tier.featured ? 'border-secondary/40 ring-1 ring-secondary/20 bg-card/60' : 'border-border bg-card/30'
                  }`}>
                  {tier.featured && (
                    <div className="bg-secondary/10 text-secondary text-[10px] font-bold tracking-[0.2em] text-center py-1.5 uppercase">
                      Programa insignia
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">{tier.name}</span>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">{tier.description}</p>

                    {/* Pricing with promo */}
                    <div className="mb-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-display font-bold text-foreground">
                          ${tier.promoMXN.toLocaleString('es-MX')}
                        </span>
                        <span className="text-sm text-muted-foreground">MXN</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground line-through">
                          ${tier.priceMXN.toLocaleString('es-MX')} MXN
                        </span>
                        <span className="text-[10px] font-bold text-secondary bg-secondary/15 px-1.5 py-0.5 rounded">-50%</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">≈ ${Math.round(tier.priceUSD / 2)} USD</p>
                    </div>

                    {tier.monthly && (
                      <div className="mb-4 px-3 py-2 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-center gap-1.5 text-xs text-foreground">
                          <CreditCard className="w-3.5 h-3.5 text-primary" />
                          <span className="font-medium">
                            {tier.monthly.months} mensualidades de ${tier.monthly.amount.toLocaleString('es-MX')} MXN
                          </span>
                        </div>
                      </div>
                    )}

                    <ul className="space-y-2 mb-6">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="text-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-2">
                      <Button variant={tier.featured ? 'outline' : 'ghost'} className="w-full"
                        onClick={() => handleEnroll(tier.name)} disabled={isLoading}>
                        Solicitar admisión
                      </Button>
                      <Link to={`/programas/${tier.slug}`}
                        className="block text-center text-[10px] text-muted-foreground hover:text-foreground tracking-wider transition-colors">
                        Ver ficha académica →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-lg font-bold text-center mb-8 text-foreground tracking-wider uppercase">
                Incluido en todos los programas
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/30">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <f.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Becas */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-lg font-bold text-foreground mb-4 tracking-wider uppercase">Becas y apoyos</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                UTAMV ofrece becas parciales para estudiantes con mérito académico, profesionales en transición
                laboral y grupos comunitarios. Contacta al equipo de admisiones para conocer los requisitos.
              </p>
              <Button variant="ghost" asChild>
                <Link to="/admisiones/contacto">Solicitar beca →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Payment trust */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs text-muted-foreground mb-4">Procesamiento de pago seguro</p>
            <div className="flex justify-center gap-4 items-center flex-wrap">
              {['Visa', 'Mastercard', 'American Express', 'PayPal'].map(m => (
                <div key={m} className="px-3 py-1.5 rounded-lg bg-muted border border-border text-xs text-muted-foreground">{m}</div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /><span>Conexión SSL</span></div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /><span>Garantía 30 días</span></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Inscripcion;
