import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BarChart3, Monitor, GraduationCap, CheckCircle, BookOpen, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const programsData: Record<string, any> = {
  'master-marketing-digital-2026': {
    type: 'Máster Profesional',
    title: 'Marketing Digital 2026',
    hours: '50+',
    duration: '6 meses',
    modality: '100% en línea',
    level: 'Avanzado',
    description: 'Programa de formación avanzada en marketing digital que integra SEO, AEO, metadatos estratégicos, geo-targeting, inteligencia artificial aplicada y estrategia omnicanal. Diseñado para profesionales que buscan dominar las competencias más demandadas del entorno digital actual.',
    objectives: [
      'Dominar técnicas avanzadas de SEO y AEO (Answer Engine Optimization)',
      'Diseñar arquitecturas de metadatos profesionales para posicionamiento estratégico',
      'Implementar estrategias de geo-targeting y marketing local efectivas',
      'Automatizar campañas y procesos con inteligencia artificial',
      'Desarrollar estrategias omnicanal basadas en datos',
      'Ejecutar proyectos reales con metodología profesional',
    ],
    modules: [
      { title: 'Fundamentos del Marketing Digital Moderno', hours: 5, description: 'Evolución del marketing, ecosistema digital y pensamiento estratégico.' },
      { title: 'Branding e Identidad Digital', hours: 5, description: 'Construcción de marca, identidad visual y posicionamiento.' },
      { title: 'Estrategia de Contenidos y Redes Sociales', hours: 5, description: 'Planificación editorial, gestión de comunidades y métricas de engagement.' },
      { title: 'SEO Avanzado y AEO', hours: 6, description: 'Optimización para buscadores tradicionales y motores de respuesta con IA.' },
      { title: 'Publicidad Digital y PPC', hours: 5, description: 'Google Ads, Meta Ads, programática y optimización de campañas.' },
      { title: 'Email Marketing y Automatización', hours: 4, description: 'Funnels, secuencias automatizadas y personalización con IA.' },
      { title: 'Video Marketing y Producción Multimedia', hours: 4, description: 'Estrategia de video, producción y distribución multiplataforma.' },
      { title: 'E-commerce y Conversión Digital', hours: 5, description: 'Optimización de tiendas, CRO y funnels de venta.' },
      { title: 'Analítica, KPIs y Marketing con IA', hours: 5, description: 'Dashboards, métricas avanzadas y analítica predictiva.' },
      { title: 'Estrategia Integral y Proyecto Final', hours: 6, description: 'Integración de competencias, proyecto aplicado con cliente real.' },
    ],
    methodology: 'Evaluación continua por módulo mediante exámenes de opción múltiple y casos prácticos. Proyecto integrador final con rúbrica detallada. Criterio de aprobación: 70% en cada módulo y entrega satisfactoria del proyecto final.',
    ingressProfile: 'Profesionales, emprendedores o egresados de carreras afines al marketing, comunicación, administración o tecnología. Conocimientos básicos de herramientas digitales.',
    egressProfile: 'Profesional capacitado para diseñar, ejecutar y medir estrategias de marketing digital integrales. Dominio de SEO/AEO, IA aplicada, analítica avanzada y gestión de campañas omnicanal.',
    certification: 'Certificado UTAMV de Máster Profesional en Marketing Digital 2026. Incluye detalle de horas acreditadas, competencias desarrolladas, número de verificación único y sello institucional digital verificable en línea.',
  },
  'fundamentos-marketing-digital': {
    type: 'Certificado Profesional',
    title: 'Fundamentos de Marketing Digital',
    hours: '5',
    duration: '1 semana',
    modality: '100% en línea',
    level: 'Introductorio',
    description: 'Programa introductorio que cubre los conceptos esenciales del marketing digital: ecosistema, herramientas básicas, métricas y fundamentos de posicionamiento en línea.',
    objectives: [
      'Comprender el ecosistema del marketing digital actual',
      'Identificar las herramientas esenciales de análisis y gestión',
      'Conocer los fundamentos de SEO y publicidad digital',
      'Desarrollar un plan básico de presencia digital',
    ],
    modules: [
      { title: 'Ecosistema Digital y Tendencias', hours: 1.5, description: 'Panorama actual, canales y oportunidades.' },
      { title: 'Herramientas y Plataformas Esenciales', hours: 1.5, description: 'Google Analytics, redes sociales y CMS.' },
      { title: 'Fundamentos de SEO y Publicidad', hours: 2, description: 'Principios de optimización y campañas básicas.' },
    ],
    methodology: 'Evaluación tipo quiz al finalizar cada bloque temático. Criterio de aprobación: 60%.',
    ingressProfile: 'Cualquier persona interesada en iniciar su formación en marketing digital. No requiere experiencia previa.',
    egressProfile: 'Profesional con conocimientos fundamentales para gestionar una presencia digital básica y comprender métricas esenciales.',
    certification: 'Certificado UTAMV de Formación Profesional en Fundamentos de Marketing Digital.',
  },
  'doctorado-inteligencia-estrategica': {
    type: 'Doctorado Profesional',
    title: 'Inteligencia Estratégica Digital',
    hours: '120+',
    duration: '12 meses',
    modality: '100% en línea',
    level: 'Especialización',
    description: 'Programa de investigación aplicada orientado a la dirección estratégica digital. Diseñado para profesionales senior que buscan liderar la transformación digital con base en investigación, datos y pensamiento sistémico.',
    objectives: [
      'Desarrollar investigación aplicada en marketing digital e IA',
      'Diseñar marcos estratégicos para organizaciones complejas',
      'Producir conocimiento publicable en el campo del marketing digital',
      'Liderar procesos de transformación digital con evidencia',
    ],
    modules: [
      { title: 'Metodología de Investigación Aplicada', hours: 15, description: 'Diseño de investigación, métodos mixtos y análisis de datos.' },
      { title: 'Teoría Avanzada del Marketing Digital', hours: 15, description: 'Marcos teóricos, modelos de atribución y ecosistemas digitales.' },
      { title: 'IA y Automatización Estratégica', hours: 20, description: 'Machine learning aplicado, NLP y analítica predictiva.' },
      { title: 'Seminario de Tesis I', hours: 20, description: 'Definición de problema, marco teórico y diseño metodológico.' },
      { title: 'Seminario de Tesis II', hours: 20, description: 'Trabajo de campo, análisis y redacción de hallazgos.' },
      { title: 'Publicación y Defensa', hours: 30, description: 'Preparación de artículo, presentación y defensa de tesis.' },
    ],
    methodology: 'Evaluación por portafolio de investigación, seminarios de avance y defensa de tesis ante comité académico.',
    ingressProfile: 'Profesionales con título de máster o experiencia equivalente demostrable (5+ años en posiciones de dirección digital).',
    egressProfile: 'Investigador-profesional capaz de generar conocimiento original, dirigir equipos estratégicos y publicar en el campo del marketing digital.',
    certification: 'Grado de Doctor Profesional en Inteligencia Estratégica Digital, emitido por UTAMV con validación institucional.',
  },
};

const ProgramDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const program = slug ? programsData[slug] : null;

  if (!program) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 text-center">
          <h1 className="font-display text-2xl text-foreground mb-4">Programa no encontrado</h1>
          <Button variant="outline" asChild>
            <Link to="/programas">Ver catálogo completo</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Link to="/programas" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Catálogo de programas
          </Link>
        </div>

        {/* Header */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {program.type}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                {program.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{program.hours} horas</div>
                <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4" />{program.duration}</div>
                <div className="flex items-center gap-2"><Monitor className="w-4 h-4" />{program.modality}</div>
                <div className="flex items-center gap-2"><BarChart3 className="w-4 h-4" />{program.level}</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Description */}
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-4 tracking-wider uppercase">Descripción General</h2>
              <p className="text-muted-foreground leading-relaxed">{program.description}</p>
            </section>

            {/* Objectives */}
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-4 tracking-wider uppercase">Objetivos y Resultados de Aprendizaje</h2>
              <div className="space-y-3">
                {program.objectives.map((obj: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border">
                    <CheckCircle className="w-5 h-5 text-silver mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{obj}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Plan de estudios */}
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-4 tracking-wider uppercase">Plan de Estudios</h2>
              <div className="space-y-2">
                {program.modules.map((mod: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setExpandedModule(expandedModule === i ? null : i)}
                    className="w-full text-left p-4 rounded-lg border border-border bg-card/30 hover:bg-card/60 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-silver" />
                        <span className="text-sm font-semibold text-foreground">
                          Módulo {i + 1}: {mod.title}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{mod.hours}h</span>
                    </div>
                    {expandedModule === i && (
                      <p className="text-xs text-muted-foreground mt-3 ml-7">{mod.description}</p>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Methodology */}
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-4 tracking-wider uppercase">Metodología y Evaluación</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{program.methodology}</p>
            </section>

            {/* Profiles */}
            <div className="grid md:grid-cols-2 gap-8">
              <section className="p-6 rounded-xl border border-border bg-card/30">
                <h3 className="font-display text-sm font-semibold text-foreground mb-3 tracking-wider uppercase">Perfil de Ingreso</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{program.ingressProfile}</p>
              </section>
              <section className="p-6 rounded-xl border border-border bg-card/30">
                <h3 className="font-display text-sm font-semibold text-foreground mb-3 tracking-wider uppercase">Perfil de Egreso</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{program.egressProfile}</p>
              </section>
            </div>

            {/* Certification */}
            <section className="p-8 rounded-xl border border-silver/30 bg-card/30">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-silver shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-3 tracking-wider uppercase">Certificación UTAMV</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{program.certification}</p>
                  <Link to="/verificar-certificado" className="inline-block mt-4 text-xs font-semibold text-silver tracking-wider hover:underline">
                    Verificar un certificado →
                  </Link>
                </div>
              </div>
            </section>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button variant="outline" size="lg" asChild>
                <Link to="/admisiones">Solicitar admisión</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/campus-virtual">Acceder como estudiante</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProgramDetail;
