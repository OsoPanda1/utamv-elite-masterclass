import { Check, Sparkles, Shield, Clock, Award, Users, FileText, Headphones, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import studentsCelebrating from '@/assets/students-celebrating.jpg';
import utamvLogo from '@/assets/utamv-logo-official.jpg';

const Inscripcion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    { icon: FileText, text: '10 Módulos Completos con Video y Audio IA' },
    { icon: Clock, text: '+50 Horas de Contenido Premium' },
    { icon: Award, text: 'Certificación UTAMV con Validación Académica' },
    { icon: Users, text: 'Acceso a Comunidad Exclusiva de Alumnos' },
    { icon: Headphones, text: 'Soporte Académico Personalizado' },
    { icon: Shield, text: 'Acceso Vitalicio al Programa' },
    { icon: Sparkles, text: 'Actualizaciones Gratuitas 2026-2027' },
    { icon: Check, text: 'Proyecto Final con Clientes Reales' },
  ];

  const pricingTiers = [
    {
      name: 'Módulo Individual',
      price: 60,
      originalPrice: 120,
      description: 'Acceso a 1 módulo de tu elección',
      features: ['1 módulo completo', 'Certificado de módulo', 'Audio IA incluido'],
      isPopular: false,
    },
    {
      name: 'Master Completo',
      price: 199,
      originalPrice: 499,
      description: 'Acceso completo al programa',
      features: ['10 módulos completos', 'Certificación UTAMV', 'Comunidad exclusiva', 'Soporte prioritario'],
      isPopular: true,
    },
    {
      name: 'Doctorado Profesional',
      price: 1750,
      originalPrice: 3500,
      description: 'Programa de investigación aplicada',
      features: ['Todo el Master', 'Tesis doctoral', 'Mentoría 1:1', 'Publicación académica'],
      isPopular: false,
    },
  ];

  const handleEnroll = async (tier: string) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Inicia sesión primero',
          description: 'Necesitas una cuenta para inscribirte.',
        });
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { origin: window.location.origin, tier },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      toast({
        title: 'Error',
        description: 'No se pudo iniciar el pago. Intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      <section className="py-16 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-10">
          <img 
            src={studentsCelebrating} 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-silver/50 shadow-silver">
              <img src={utamvLogo} alt="UTAMV" className="w-full h-full object-cover" />
            </div>
            <span className="inline-block px-4 py-1 rounded-full bg-teal/20 text-teal text-sm font-medium mb-4">
              Cohorte Fundadora - 50% Descuento
            </span>
            <h1 className="section-title">Elige tu Plan de Estudios</h1>
            <p className="section-subtitle">
              Primeros 5,000 estudiantes fundadores obtienen acceso preferencial y precio especial de lanzamiento.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`relative rounded-2xl border-2 overflow-hidden ${
                  tier.isPopular 
                    ? 'border-silver bg-gradient-to-b from-silver/10 to-card' 
                    : 'border-border bg-card'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-silver text-primary-foreground text-center py-2 text-sm font-bold">
                    MÁS POPULAR
                  </div>
                )}

                <div className={`p-6 ${tier.isPopular ? 'pt-12' : ''}`}>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tier.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg text-muted-foreground line-through">
                        ${tier.originalPrice} USD
                      </span>
                      <span className="px-2 py-0.5 rounded bg-teal/20 text-teal text-xs font-bold">
                        -50%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-display font-bold text-gradient-silver">
                        ${tier.price}
                      </span>
                      <span className="text-muted-foreground">USD</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-teal flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={tier.isPopular ? 'elite' : 'silverOutline'} 
                    className="w-full"
                    onClick={() => handleEnroll(tier.name)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
                    ) : (
                      <>Inscribirme</>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-center mb-8 text-foreground">
              Todos los planes incluyen
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-full bg-silver/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-silver" />
                  </div>
                  <span className="text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust elements */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-4">Métodos de pago aceptados</p>
          <div className="flex justify-center gap-4 items-center opacity-60 flex-wrap">
            <div className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium">
              💳 Visa
            </div>
            <div className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium">
              💳 Mastercard
            </div>
            <div className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium">
              💳 American Express
            </div>
            <div className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium">
              🏦 PayPal
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal" />
              <span>Pago Seguro SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal" />
              <span>Garantía 30 días</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inscripcion;
