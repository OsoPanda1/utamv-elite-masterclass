import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import InstructorsSection from '@/components/InstructorsSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Award, Users, Sparkles } from 'lucide-react';
import utamvLogo from '@/assets/utamv-logo-official.jpg';

const Index = () => {
  const quickLinks = [
    {
      icon: BookOpen,
      title: 'Programa',
      description: 'Conoce los 4 pilares fundamentales del Master',
      href: '/programa',
    },
    {
      icon: Award,
      title: '10 Módulos',
      description: 'Explora el plan de estudios completo',
      href: '/modulos',
    },
    {
      icon: Users,
      title: 'Expertos',
      description: 'Conoce a tu equipo académico',
      href: '/expertos',
    },
    {
      icon: Sparkles,
      title: 'Certificación',
      description: 'Sistema de validación y acreditación',
      href: '/certificacion',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        {/* Quick Navigation Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Explora el Master Elite
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Navega por las diferentes secciones para conocer todo sobre el programa 
                de marketing digital más avanzado de Latinoamérica.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {quickLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.href}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-silver/50 transition-all duration-300 hover:shadow-silver hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-silver/10 flex items-center justify-center mb-4 group-hover:bg-silver/20 transition-colors">
                    <link.icon className="w-6 h-6 text-silver" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-silver transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {link.description}
                  </p>
                  <div className="flex items-center text-silver text-sm font-medium">
                    Explorar
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <InstructorsSection />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-8 rounded-2xl overflow-hidden border-2 border-silver/50 shadow-silver">
                <img src={utamvLogo} alt="UTAMV" className="w-full h-full object-cover" />
              </div>
              <h2 className="font-display text-4xl font-bold mb-6 text-foreground">
                Tu Transformación Comienza Hoy
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Únete a la cohorte fundadora y obtén 50% de descuento. 
                Primeros 5,000 estudiantes con acceso preferencial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="elite" size="xl" asChild>
                  <Link to="/inscripcion">
                    <Sparkles className="w-5 h-5" />
                    Inscribirme - $199 USD
                  </Link>
                </Button>
                <Button variant="silverOutline" size="xl" asChild>
                  <Link to="/modulos">Ver Plan de Estudios</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
