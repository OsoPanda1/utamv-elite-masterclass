import { Check, Shield, Clock, Award, Users, FileText, Headphones, Sparkles } from 'lucide-react';
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
    { icon: FileText, text: '10 módulos con contenido multimedia estructurado' },
    { icon: Clock, text: '50+ horas de formación académica' },
    { icon: Award, text: 'Certificación UTAMV con verificación digital' },
    { icon: Users, text: 'Acceso a la comunidad de estudiantes' },
    { icon: Headphones, text: 'Soporte académico y tutoría IA' },
    { icon: Shield, text: 'Acceso permanente al contenido del programa' },
  ];

  const tiers = [
    {
      name: 'Certificado Profesional',
      price: 60,
      description: 'Programa introductorio de fundamentos de marketing digital.',
      features: ['5 horas de formación', 'Certificado de finalización', 'Acceso a recursos básicos'],
      slug: 'fundamentos-marketing-digital',
    },
    {
      name: 'Máster Profesional',
      price: 199,
      description: 'Programa insignia de formación avanzada en marketing digital.',
      features: ['50+ horas de formación', 'Certificación UTAMV completa', 'Comunidad de estudiantes', 'Tutoría con IA'],
      slug: 'master-marketing-digital-2026',
      featured: true,
    },
    {
      name: 'Doctorado Profesional',
      price: 1750,
      description: 'Programa de investigación aplicada y dirección estratégica.',
      features: ['120+ horas de formación', 'Tesis doctoral', 'Mentoría personalizada', 'Publicación académica'],
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
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              ADMISIONES
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Selecciona el programa que mejor se adapte a tu perfil profesional y nivel de formación. 
              Todos los programas incluyen certificación UTAMV con verificación digital.
            </p>
          </div>
        </section>

        {/* Tiers */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {tiers.map((tier, i) => (
                <div
                  key={i}
                  className={`relative rounded-xl border overflow-hidden ${
                    tier.featured ? 'border-silver/40 ring-1 ring-silver/20 bg-card/60' : 'border-border bg-card/30'
                  }`}
                >
                  {tier.featured && (
                    <div className="bg-silver/10 text-silver text-[10px] font-bold tracking-[0.2em] text-center py-1.5 uppercase">
                      Programa insignia
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                      {tier.name}
                    </span>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">{tier.description}</p>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl font-display font-bold text-foreground">${tier.price}</span>
                      <span className="text-sm text-muted-foreground">USD</span>
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs">
                          <Check className="w-3.5 h-3.5 text-silver shrink-0" />
                          <span className="text-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-2">
                      <Button
                        variant={tier.featured ? 'outline' : 'ghost'}
                        className="w-full"
                        onClick={() => handleEnroll(tier.name)}
                        disabled={isLoading}
                      >
                        Solicitar admisión
                      </Button>
                      <Link
                        to={`/programas/${tier.slug}`}
                        className="block text-center text-[10px] text-muted-foreground hover:text-foreground tracking-wider transition-colors"
                      >
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
              <h2 className="font-display text-xl font-bold text-center mb-8 text-foreground tracking-wider uppercase">
                Incluido en todos los programas
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/30">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <f.icon className="w-4 h-4 text-silver" />
                    </div>
                    <span className="text-sm text-foreground">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Payment trust */}
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs text-muted-foreground mb-4">Procesamiento de pago seguro</p>
            <div className="flex justify-center gap-4 items-center flex-wrap">
              {['Visa', 'Mastercard', 'American Express', 'PayPal'].map(m => (
                <div key={m} className="px-3 py-1.5 rounded-lg bg-muted border border-border text-xs text-muted-foreground">
                  {m}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Conexión SSL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Garantía 30 días</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Inscripcion;
