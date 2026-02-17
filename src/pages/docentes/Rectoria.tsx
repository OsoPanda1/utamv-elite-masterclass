import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Users, Award } from 'lucide-react';

const Rectoria = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              RECTORÍA
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              El equipo de dirección que guía la visión académica y estratégica de la UTAMV.
            </p>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* Rector */}
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-6 rounded-full border-4 border-platinum overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop" 
                    alt="Rector UTAMV"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Dr. Juan Carlos Pérez</h3>
                <p className="text-platinum font-semibold mb-4">Rector</p>
                <p className="text-sm text-muted-foreground mb-6">
                  PhD en Tecnologías de la Información. Experto en transformación digital educativa y modelos de aprendizaje virtual.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Award className="w-4 h-4" />
                  <span>30 años experiencia</span>
                </div>
              </div>

              {/* Vicerrector Académico */}
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-6 rounded-full border-4 border-platinum overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" 
                    alt="Vicerrector Académico"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Dra. María Rodriguez</h3>
                <p className="text-platinum font-semibold mb-4">Vicerrectora Académica</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Maestría en Educación Tecnológica. Especialista en currículo digital y evaluación formativa.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Award className="w-4 h-4" />
                  <span>25 años experiencia</span>
                </div>
              </div>

              {/* Vicerrector Administrativo */}
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-6 rounded-full border-4 border-platinum overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop" 
                    alt="Vicerrector Administrativo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Dr. Carlos Gómez</h3>
                <p className="text-platinum font-semibold mb-4">Vicerrector Administrativo</p>
                <p className="text-sm text-muted-foreground mb-6">
                  MBA en Gestión Financiera. Experto en gestión de recursos educativos y modelado financiero.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Award className="w-4 h-4" />
                  <span>20 años experiencia</span>
                </div>
              </div>

              {/* Director de Innovación */}
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-6 rounded-full border-4 border-platinum overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" 
                    alt="Director de Innovación"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Ing. Patricia Martínez</h3>
                <p className="text-platinum font-semibold mb-4">Directora de Innovación</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Ingeniera de Software especializada en IA educativa y plataformas de aprendizaje.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Award className="w-4 h-4" />
                  <span>18 años experiencia</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision and Mission */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Misión</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Formar profesionales competentes en entornos digitales, integrando tecnologías avanzadas con valores éticos,
                  para contribuir al desarrollo social y económico de América Latina.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-platinum/20 flex items-center justify-center">
                  <Users className="w-8 h-8 text-platinum" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Visión</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ser la institución educativa líder en América Latina en formación digital, reconocida por su excelencia académica,
                  innovación tecnológica y impacto social.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Rectoria;