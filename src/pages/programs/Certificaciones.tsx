import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Clock, BarChart3, Monitor, GraduationCap } from 'lucide-react';

const Certificaciones = () => {
  const programs = [
    {
      slug: 'certificado-marketing-digital',
      title: 'Certificado Profesional en Marketing Digital',
      description: 'Programa introductorio que cubre los conceptos esenciales del marketing digital, herramientas básicas de análisis y fundamentos de posicionamiento en línea.',
      hours: '5',
      duration: '1 semana',
      modality: '100% en línea',
      level: 'Introductorio',
      area: 'Marketing Digital',
    },
    {
      slug: 'certificado-analitica-digital',
      title: 'Certificado Profesional en Analítica Digital',
      description: 'Medición de resultados, configuración de dashboards y toma de decisiones basada en datos para campañas digitales.',
      hours: '8',
      duration: '2 semanas',
      modality: '100% en línea',
      level: 'Introductorio',
      area: 'Estrategia Digital',
    },
    {
      slug: 'certificado-seguridad-web',
      title: 'Certificado Profesional en Seguridad Web',
      description: 'Formación en protección de datos, ciberseguridad, cumplimiento normativo GDPR/LGPD y seguridad en plataformas educativas.',
      hours: '6',
      duration: '2 semanas',
      modality: '100% en línea',
      level: 'Introductorio',
      area: 'Tecnología',
    },
    {
      slug: 'certificado-ia-basica',
      title: 'Certificado Profesional en Inteligencia Artificial Básica',
      description: 'Fundamentos de IA, machine learning y aplicaciones prácticas para profesionales no técnicos.',
      hours: '5',
      duration: '1 semana',
      modality: '100% en línea',
      level: 'Introductorio',
      area: 'Inteligencia Artificial',
    },
    {
      slug: 'certificado-email-marketing',
      title: 'Certificado Profesional en Email Marketing',
      description: 'Estrategias de email marketing efectivas, automatización de secuencias y optimización de conversiones.',
      hours: '4',
      duration: '1 semana',
      modality: '100% en línea',
      level: 'Introductorio',
      area: 'Marketing Digital',
    },
    {
      slug: 'certificado-social-media',
      title: 'Certificado Profesional en Social Media Marketing',
      description: 'Gestión de redes sociales profesionales, creación de contenido y medición de resultados.',
      hours: '5',
      duration: '1 semana',
      modality: '100% en línea',
      level: 'Introductorio',
      area: 'Marketing Digital',
    },
    {
      slug: 'certificado-ecommerce',
      title: 'Certificado Profesional en E-commerce',
      description: 'Operaciones y estrategias para tiendas online, gestión de inventario y optimización de conversiones.',
      hours: '6',
      duration: '1.5 semanas',
      modality: '100% en línea',
      level: 'Introductorio',
      area: 'Negocios',
    },
    {
      slug: 'certificado-google-analytics',
      title: 'Certificado Profesional en Google Analytics',
      description: 'Configuración y análisis de datos en Google Analytics 4 para tomar decisiones basadas en datos.',
      hours: '4',
      duration: '1 semana',
      modality: '100% en línea',
      level: 'Introductorio',
      area: 'Tecnología',
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
              CERTIFICACIONES
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Programs introductorios de corta duración para adquirir competencias básicas y certificarse en áreas digitales.
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
                      Certificado Profesional
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

export default Certificaciones;