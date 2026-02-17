import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Clock, BarChart3, Monitor, GraduationCap } from 'lucide-react';

const Diplomados = () => {
  const programs = [
    {
      slug: 'diplomado-seo-avanzado',
      title: 'Diplomado en SEO y AEO Avanzado',
      description: 'Formación especializada en optimización para motores de búsqueda tradicionales y motores de respuesta con inteligencia artificial.',
      hours: '30',
      duration: '2 meses',
      modality: '100% en línea',
      level: 'Intermedio',
      area: 'Marketing Digital',
    },
    {
      slug: 'diplomado-ia-marketing',
      title: 'Diplomado en Inteligencia Artificial para Marketing',
      description: 'Aplicación práctica de herramientas de IA en automatización de campañas, análisis predictivo y generación de contenido.',
      hours: '25',
      duration: '2 meses',
      modality: '100% en línea',
      level: 'Intermedio',
      area: 'Inteligencia Artificial',
    },
    {
      slug: 'diplomado-programacion-fullstack',
      title: 'Diplomado en Programación Full Stack',
      description: 'Desarrollo web completo desde cero: JavaScript, Python y Node.js. Aplicaciones reales y proyectos profesionales.',
      hours: '40',
      duration: '3 meses',
      modality: '100% en línea',
      level: 'Intermedio',
      area: 'Tecnología',
    },
    {
      slug: 'diplomado-data-science',
      title: 'Diplomado en Data Science y Analítica',
      description: 'Análisis de datos, machine learning y visualización para toma de decisiones basada en evidencia.',
      hours: '35',
      duration: '2.5 meses',
      modality: '100% en línea',
      level: 'Intermedio',
      area: 'Tecnología',
    },
    {
      slug: 'diplomado-ux-ui',
      title: 'Diplomado en Diseño UX/UI',
      description: 'Principios de diseño centrado en el usuario, investigación de usuarios y creación de interfaces intuitivas.',
      hours: '30',
      duration: '2 meses',
      modality: '100% en línea',
      level: 'Intermedio',
      area: 'Diseño',
    },
    {
      slug: 'diplomado-negocios-internacionales',
      title: 'Diplomado en Negocios Internacionales',
      description: 'Estrategias para expansion internacional, comercio electrónico cross-border y gestión de operaciones globales.',
      hours: '35',
      duration: '2.5 meses',
      modality: '100% en línea',
      level: 'Intermedio',
      area: 'Negocios',
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
              DIPLOMADOS
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Programas especializados de medio plazo para desarrollar competencias técnicas en áreas específicas.
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
                  className="group block rounded-xl border bg-card/50 hover:bg-card transition-all duration-300 overflow-hidden border-border"
                >
                  <div className="p-6">
                    <span className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                      Diplomado
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

export default Diplomados;