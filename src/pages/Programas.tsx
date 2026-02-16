import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Clock, BarChart3, Monitor, GraduationCap } from 'lucide-react';

const allPrograms = [
  // Maestrías
  {
    slug: 'maestria-marketing-digital',
    type: 'Maestría',
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
    type: 'Maestría',
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
    type: 'Maestría',
    title: 'Maestría en Negocios Digitales',
    description: 'Gestión de empresas en entornos digitales. Estrategia empresarial, innovación tecnológica y liderazgo digital.',
    hours: '160+',
    duration: '10 meses',
    modality: 'Híbrido',
    level: 'Posgrado',
    area: 'Estrategia Digital',
  },

  // Máster Profesional
  {
    slug: 'master-marketing-digital-2026',
    type: 'Máster Profesional',
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
    type: 'Máster Profesional',
    title: 'Máster Profesional en Analítica Digital',
    description: 'Especialización en análisis de datos, dashboards y toma de decisiones basada en evidencia para campañas digitales.',
    hours: '45+',
    duration: '5 meses',
    modality: '100% en línea',
    level: 'Avanzado',
    area: 'Estrategia Digital',
  },

  // Diplomados
  {
    slug: 'diplomado-seo-avanzado',
    type: 'Diplomado',
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
    type: 'Diplomado',
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
    type: 'Diplomado',
    title: 'Diplomado en Programación Full Stack',
    description: 'Desarrollo web completo desde cero: JavaScript, Python y Node.js. Aplicaciones reales y proyectos profesionales.',
    hours: '40',
    duration: '3 meses',
    modality: '100% en línea',
    level: 'Intermedio',
    area: 'Tecnología',
  },

  // Certificaciones
  {
    slug: 'certificado-marketing-digital',
    type: 'Certificado Profesional',
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
    type: 'Certificado Profesional',
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
    type: 'Certificado Profesional',
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
    type: 'Certificado Profesional',
    title: 'Certificado Profesional en Inteligencia Artificial Básica',
    description: 'Fundamentos de IA, machine learning y aplicaciones prácticas para profesionales no técnicos.',
    hours: '5',
    duration: '1 semana',
    modality: '100% en línea',
    level: 'Introductorio',
    area: 'Inteligencia Artificial',
  },

  // Doctorado
  {
    slug: 'doctorado-inteligencia-estrategica',
    type: 'Doctorado Profesional',
    title: 'Doctorado Profesional en Inteligencia Estratégica Digital',
    description: 'Programa de investigación aplicada orientado a la dirección estratégica digital. Incluye tesis doctoral, mentoría personalizada y publicación académica.',
    hours: '120+',
    duration: '12 meses',
    modality: '100% en línea',
    level: 'Especialización',
    area: 'Inteligencia Artificial',
  },
];

const types = ['Todos', 'Maestría', 'Máster Profesional', 'Doctorado Profesional', 'Diplomado', 'Certificado Profesional'];

const Programas = () => {
  const [filterType, setFilterType] = useState('Todos');

  const filtered = filterType === 'Todos'
    ? allPrograms
    : allPrograms.filter(p => p.type === filterType);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              CATÁLOGO DE PROGRAMAS
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferta académica completa de UTAMV. Programas estructurados por nivel de formación, 
              con información clara sobre duración, horas y competencias.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b border-border sticky top-20 bg-background/95 backdrop-blur-sm z-40">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 ${
                    filterType === type
                      ? 'bg-platinum text-[#0A1128] shadow-platinum'
                      : 'bg-white/5 text-white/70 hover:text-platinum hover:bg-white/10 border border-transparent hover:border-platinum/20'
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filtered.map((prog) => (
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
                      {prog.type}
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

export default Programas;
