import { Target, Brain, Zap, TrendingUp, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import analyticsDashboard from '@/assets/analytics-dashboard.jpg';
import seoVsAeo from '@/assets/seo-vs-aeo.png';
import aiMarketingAutomation from '@/assets/ai-marketing-automation.png';
import omnichannelStrategy from '@/assets/omnichannel-strategy.jpg';
import predictiveAnalytics from '@/assets/predictive-analytics-ai.jpg';

const Programa = () => {
  const pillars = [
    {
      icon: Target,
      title: 'SEO Avanzado',
      description: 'Domina la indexación inteligente y optimización semántica con IA.',
    },
    {
      icon: Brain,
      title: 'Metadatos Estratégicos',
      description: 'Arquitectura de información que posiciona tu marca en el ecosistema digital.',
    },
    {
      icon: Zap,
      title: 'Geo-Targeting',
      description: 'Conecta con clientes locales y aparece en búsquedas geolocalizadas.',
    },
    {
      icon: TrendingUp,
      title: 'Marketing Predictivo',
      description: 'Automatización y campañas impulsadas por inteligencia artificial.',
    },
  ];

  const outcomes = [
    'Dominar SEO avanzado y AEO (Answer Engine Optimization)',
    'Crear arquitecturas de metadatos profesionales',
    'Implementar estrategias de geo-targeting efectivas',
    'Automatizar campañas con inteligencia artificial',
    'Desarrollar narrativas digitales de alto impacto',
    'Certificarte como Master en Marketing Digital 2026',
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
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-teal/20 text-teal text-sm font-medium mb-4">
              Programa Académico
            </span>
            <h1 className="section-title">
              Master Elite Profesional en Marketing Digital 2026
            </h1>
            <p className="section-subtitle">
              El primer programa internacional de clase elite nacido desde Latinoamérica. 
              Formación estructurada, actualizada y diseñada para aplicar desde el primer módulo.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold mb-6 text-foreground">
                4 Pilares Fundamentales
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {pillars.map((pillar, index) => (
                  <div 
                    key={index}
                    className="p-5 rounded-xl bg-card/50 border border-border hover:border-silver/30 transition-all duration-300 hover:shadow-silver group"
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-silver/10">
                      <pillar.icon className="w-6 h-6 text-silver" />
                    </div>
                    <h3 className="font-semibold mb-2 text-foreground group-hover:text-silver transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-silver/20 via-teal/10 to-silver/20 rounded-3xl blur-xl opacity-30" />
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-card">
                <img 
                  src={analyticsDashboard} 
                  alt="Panel de Analytics Marketing Digital"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold mb-8 text-center text-foreground">
              Al finalizar el programa podrás
            </h2>
            <div className="grid gap-4">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                  <CheckCircle className="w-6 h-6 text-teal flex-shrink-0" />
                  <span className="text-foreground">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual Resources */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold mb-8 text-center text-foreground">
            Metodología y Herramientas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-border shadow-card group">
              <img src={seoVsAeo} alt="SEO vs AEO" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-4">
                <h4 className="font-semibold text-sm text-foreground">SEO vs AEO</h4>
                <p className="text-xs text-muted-foreground">Optimización dual para buscadores y motores de IA</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-card group">
              <img src={aiMarketingAutomation} alt="Marketing con IA" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-4">
                <h4 className="font-semibold text-sm text-foreground">Marketing con IA</h4>
                <p className="text-xs text-muted-foreground">Automatización inteligente de campañas</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-card group">
              <img src={omnichannelStrategy} alt="Estrategia Omnicanal" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-4">
                <h4 className="font-semibold text-sm text-foreground">Omnicanalidad</h4>
                <p className="text-xs text-muted-foreground">Integración total de canales digitales</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-card group">
              <img src={predictiveAnalytics} alt="Analítica Predictiva" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-4">
                <h4 className="font-semibold text-sm text-foreground">Analítica Predictiva</h4>
                <p className="text-xs text-muted-foreground">Machine learning aplicado al marketing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4 text-foreground">
            ¿Listo para transformar tu carrera?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Únete a la cohorte fundadora y obtén acceso preferencial con 50% de descuento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="elite" size="xl" asChild>
              <Link to="/auth">Inscribirme Ahora</Link>
            </Button>
            <Button variant="silverOutline" size="xl" asChild>
              <Link to="/modulos">Ver Módulos</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programa;
