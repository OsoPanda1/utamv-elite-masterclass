import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Clock, BarChart3, Monitor, GraduationCap } from 'lucide-react';

const allPrograms = [
  {
    slug: 'fundamentos-marketing-digital',
    type: 'Certificado Profesional',
    title: 'Fundamentos de Marketing Digital',
    description: 'Programa introductorio que cubre los conceptos esenciales del marketing digital, herramientas básicas de análisis y fundamentos de posicionamiento en línea.',
    hours: '5',
    duration: '1 semana',
    modality: '100% en línea',
    level: 'Introductorio',
    area: 'Marketing Digital',
  },
  {
    slug: 'master-marketing-digital-2026',
    type: 'Máster Profesional',
    title: 'Marketing Digital 2026',
    description: 'Programa insignia de formación avanzada en SEO, AEO, metadatos, geo-targeting, automatización con IA y estrategia omnicanal. 10 módulos con evaluación continua y proyecto integrador.',
    hours: '50+',
    duration: '6 meses',
    modality: '100% en línea',
    level: 'Avanzado',
    area: 'Marketing Digital',
    featured: true,
  },
  {
    slug: 'doctorado-inteligencia-estrategica',
    type: 'Doctorado Profesional',
    title: 'Inteligencia Estratégica Digital',
    description: 'Programa de investigación aplicada orientado a la dirección estratégica digital. Incluye tesis doctoral, mentoría personalizada y publicación académica.',
    hours: '120+',
    duration: '12 meses',
    modality: '100% en línea',
    level: 'Especialización',
    area: 'Inteligencia Artificial',
  },
  {
    slug: 'diplomado-seo-avanzado',
    type: 'Diplomado',
    title: 'SEO Avanzado y AEO',
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
    title: 'Inteligencia Artificial para Marketing',
    description: 'Aplicación práctica de herramientas de IA en automatización de campañas, análisis predictivo y generación de contenido.',
    hours: '25',
    duration: '2 meses',
    modality: '100% en línea',
    level: 'Intermedio',
    area: 'Inteligencia Artificial',
  },
  {
    slug: 'curso-analitica-digital',
    type: 'Curso',
    title: 'Analítica Digital y KPIs',
    description: 'Medición de resultados, configuración de dashboards y toma de decisiones basada en datos para campañas digitales.',
    hours: '10',
    duration: '3 semanas',
    modality: '100% en línea',
    level: 'Introductorio',
    area: 'Estrategia Digital',
  },
  {
    slug: 'certificado-seguridad-web',
    type: 'Certificado Profesional',
    title: 'Seguridad Social en la Web',
    description: 'Formación en protección de datos, ciberseguridad, cumplimiento normativo GDPR/LGPD y seguridad en plataformas educativas.',
    hours: '8',
    duration: '2 semanas',
    modality: '100% en línea',
    level: 'Introductorio',
    area: 'Tecnología',
  },
  {
    slug: 'diplomado-programacion-fullstack',
    type: 'Diplomado',
    title: 'Programación Full Stack',
    description: 'Desarrollo web completo desde cero: JavaScript, Python y Node.js. Aplicaciones reales y proyectos profesionales.',
    hours: '40',
    duration: '3 meses',
    modality: '100% en línea',
    level: 'Intermedio',
    area: 'Tecnología',
  },
  {
    slug: 'master-tecnologias-digitales',
    type: 'Máster Profesional',
    title: 'Tecnologías Digitales y Programación',
    description: 'Especialización en desarrollo web, seguridad informática y aplicaciones de IA. Programación desde cero a experto.',
    hours: '60+',
    duration: '4 meses',
    modality: '100% en línea',
    level: 'Avanzado',
    area: 'Tecnología',
  },
];

const types = ['Todos', 'Máster Profesional', 'Doctorado Profesional', 'Diplomado', 'Curso', 'Certificado Profesional'];

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
                      ? 'bg-gold text-[#0A1128] shadow-gold'
                      : 'bg-white/5 text-white/70 hover:text-gold hover:bg-white/10 border border-transparent hover:border-gold/20'
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
                    prog.featured ? 'border-gold/40 ring-1 ring-gold/20' : 'border-border'
                  }`}
                >
                  {prog.featured && (
                    <div className="bg-gold/10 text-gold text-[10px] font-bold tracking-[0.2em] text-center py-1.5 uppercase">
                      Programa insignia
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                      {prog.type}
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground mt-2 mb-3 group-hover:text-gold transition-colors">
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
                    <div className="mt-4 text-xs font-semibold text-gold tracking-wider group-hover:translate-x-1 transition-transform">
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
