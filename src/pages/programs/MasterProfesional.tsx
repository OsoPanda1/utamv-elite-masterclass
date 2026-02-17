import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Clock, BarChart3, Monitor, GraduationCap } from 'lucide-react';

const MasterProfesional = () => {
  const programs = [
    {
      slug: 'master-marketing-digital-2026',
      title: 'Máster Profesional en Marketing Digital',
      description: 'Programa insignia de formación avanzada en SEO, AEO, metadatos, geo-targeting, automatización con IA y estrategia omnicanal. 10 módulos con evaluación continua y proyecto integrador.',
      hours: '50+',
      duration: '6 meses',
      modality: '100% en línea',
      level: 'Avanzado',
      area: 'Marketing Digital',
      featured: true,
    },
    {
      slug: 'master-analitica-digital',
      title: 'Máster Profesional en Analítica Digital',
      description: 'Especialización en análisis de datos, dashboards y toma de decisiones basada en evidencia para campañas digitales.',
      hours: '45+',
      duration: '5 meses',
      modality: '100% en línea',
      level: 'Avanzado',
      area: 'Estrategia Digital',
    },
    {
      slug: 'master-ia-empresarial',
      title: 'Máster Profesional en IA para Negocios',
      description: 'Aplicación práctica de inteligencia artificial en automatización, análisis predictivo y optimización de procesos empresariales.',
      hours: '55+',
      duration: '6 meses',
      modality: '100% en línea',
      level: 'Avanzado',
      area: 'Inteligencia Artificial',
    },
    {
      slug: 'master-transformacion-digital',
      title: 'Máster Profesional en Transformación Digital',
      description: 'Liderazgo en procesos de transformación digital, innovación tecnológica y adaptación a entornos disruptivos.',
      hours: '50+',
      duration: '6 meses',
      modality: '100% en línea',
      level: 'Avanzado',
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
              MÁSTER PROFESIONAL
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Programas intensivos de especialización para profesionales que buscan desarrollar competencias avanzadas en áreas digitales.
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
                      Máster Profesional
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

export default MasterProfesional;