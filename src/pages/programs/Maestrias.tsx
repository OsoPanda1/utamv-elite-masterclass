import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Clock, BarChart3, Monitor, GraduationCap } from 'lucide-react';

const Maestrias = () => {
  const programs = [
    {
      slug: 'maestria-marketing-digital',
      title: 'Maestría en Marketing Digital Estratégico',
      description: 'Programa de posgrado avanzado enfocado en estrategias digitales, analítica de datos y gestión de campañas omnicanal. Incluye proyecto de investigación y diplomado internacional.',
      hours: '200+',
      duration: '12 meses',
      modality: 'Híbrido',
      level: 'Posgrado',
      area: 'Marketing Digital',
      featured: true,
    },
    {
      slug: 'maestria-ia-empresarial',
      title: 'Maestría en Inteligencia Artificial Aplicada',
      description: 'Formación avanzada en desarrollo y aplicación de IA en entornos empresariales. Aprendizaje de algoritmos, automatización y análisis predictivo.',
      hours: '180+',
      duration: '12 meses',
      modality: '100% en línea',
      level: 'Posgrado',
      area: 'Inteligencia Artificial',
    },
    {
      slug: 'maestria-negocios-digitales',
      title: 'Maestría en Negocios Digitales',
      description: 'Gestión de empresas en entornos digitales. Estrategia empresarial, innovación tecnológica y liderazgo digital.',
      hours: '160+',
      duration: '10 meses',
      modality: 'Híbrido',
      level: 'Posgrado',
      area: 'Estrategia Digital',
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
              MAESTRÍAS
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Programas de posgrado avanzado para profesionales que buscan especializarse y liderar en el ámbito digital.
            </p>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {programs.map((prog) => (
                <Link
                  key={prog.slug}
                  to={`/programas/${prog.slug}`}
                  className={`group block rounded-xl border bg-card/50 hover:bg-card transition-all duration-300 overflow-hidden ${
                    prog.featured ? 'border-platinum/40 ring-1 ring-platinum/20' : 'border-border'
                  }`}
                >
                  {prog.featured && (
                    <div className="bg-platinum/10 text-platinum text-[10px] font-bold tracking-[0.2em] text-center py-1.5 uppercase">
                      Programa insignia
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                      Maestría
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground mt-2 mb-3 group-hover:text-platinum transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {prog.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{prog.hours} horas</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>{prog.level}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Monitor className="w-3.5 h-3.5" />
                        <span>{prog.modality}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{prog.duration}</span>
                      </div>
                    </div>
                    <div className="mt-4 text-xs font-semibold text-platinum tracking-wider group-hover:translate-x-1 transition-transform">
                      Ver ficha académica →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Maestrias;