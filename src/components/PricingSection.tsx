import { Check, Sparkles, Shield, Clock, Award, Users, FileText, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import studentsCelebrating from '@/assets/students-celebrating.jpg';

const PricingSection = () => {
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

  const handleEnroll = async () => {
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
        body: { origin: window.location.origin },
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
    <section id="inscripcion" className="py-24 bg-gradient-to-b from-background to-navy-medium/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-10">
        <img 
          src={studentsCelebrating} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold text-sm font-medium mb-4">
            Inversión Única
          </span>
          <h2 className="section-title">Tu Transformación Comienza Hoy</h2>
          <p className="section-subtitle">
            Un solo pago para acceso completo y vitalicio al Master Elite Profesional 
            en Marketing Digital 2026.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold via-teal to-gold rounded-3xl blur-lg opacity-50 animate-pulse-gold" />
            
            <div className="relative bg-card rounded-3xl border-2 border-gold/50 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-gold/20 via-teal/10 to-gold/20 p-8 text-center border-b border-border">
                <span className="inline-block px-4 py-1 rounded-full bg-gold text-primary-foreground text-sm font-bold mb-4">
                  ACCESO COMPLETO
                </span>
                <h3 className="font-display text-3xl font-bold mb-2 text-foreground">
                  Master Elite Profesional
                </h3>
                <p className="text-muted-foreground">Marketing Digital 2026</p>
              </div>

              {/* Price */}
              <div className="p-8 text-center border-b border-border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl text-muted-foreground line-through">$499 USD</span>
                  <span className="px-2 py-1 rounded bg-teal/20 text-teal text-sm font-bold">-60%</span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-6xl font-display font-bold text-gradient-gold">$199</span>
                  <span className="text-2xl text-muted-foreground">USD</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Pago único • Acceso vitalicio</p>
              </div>

              {/* Features */}
              <div className="p-8">
                <div className="grid gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                        <feature.icon className="w-4 h-4 text-gold" />
                      </div>
                      <span className="text-foreground">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-8 pt-0">
                <Button 
                  variant="elite" 
                  size="xl" 
                  className="w-full text-lg py-6"
                  onClick={handleEnroll}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground" />
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Inscribirme Ahora - $199 USD
                    </>
                  )}
                </Button>
                
                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-teal" />
                    <span>Pago Seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal" />
                    <span>Garantía 30 días</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust elements */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">Métodos de pago aceptados</p>
          <div className="flex justify-center gap-4 items-center opacity-60">
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
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
