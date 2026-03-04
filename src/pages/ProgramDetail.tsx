import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BarChart3, Monitor, GraduationCap, CheckCircle, BookOpen, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface ProgramModule {
  title: string;
  hours: number;
  description: string;
}

interface ProgramData {
  type: string;
  title: string;
  hours: string;
  duration: string;
  modality: string;
  level: string;
  description: string;
  objectives: string[];
  modules: ProgramModule[];
  methodology: string;
  ingressProfile: string;
  egressProfile: string;
  certification: string;
}

const programsData: Record<string, ProgramData> = {
  'master-marketing-digital-2026': {
    type: 'Máster Profesional',
    title: 'Marketing Digital 2026',
    hours: '50+',
    duration: '6 meses',
    modality: '100% en línea',
    level: 'Avanzado',
    description: 'Programa insignia de formación avanzada en marketing digital que integra SEO, AEO, metadatos estratégicos, geo-targeting, inteligencia artificial aplicada y estrategia omnicanal. Diseñado para profesionales que buscan dominar las competencias más demandadas del entorno digital actual.',
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

  // ── MAESTRÍAS ──
  'maestria-marketing-digital': {
    type: 'Maestría',
    title: 'Maestría en Marketing Digital Estratégico',
    hours: '200+',
    duration: '12 meses',
    modality: 'Híbrido',
    level: 'Posgrado',
    description: 'Programa de posgrado avanzado enfocado en estrategias digitales, analítica de datos y gestión de campañas omnicanal. Incluye proyecto de investigación aplicada y componente de diplomado internacional.',
    objectives: [
      'Diseñar estrategias de marketing digital integrales para organizaciones complejas',
      'Dominar analítica avanzada, modelado de atribución y business intelligence',
      'Dirigir equipos de marketing digital con visión estratégica',
      'Desarrollar investigación aplicada en marketing digital',
      'Implementar frameworks de transformación digital en marketing',
      'Gestionar presupuestos y ROI de inversión digital a nivel directivo',
    ],
    modules: [
      { title: 'Fundamentos Estratégicos del Marketing Digital', hours: 20, description: 'Teorías del marketing digital, marcos estratégicos y análisis del entorno.' },
      { title: 'Investigación de Mercados Digitales', hours: 20, description: 'Métodos cuantitativos y cualitativos aplicados al entorno digital.' },
      { title: 'Estrategia de Marca y Comunicación Digital', hours: 20, description: 'Brand management, storytelling y comunicación corporativa digital.' },
      { title: 'SEO, SEM y Estrategias de Posicionamiento', hours: 20, description: 'Técnicas avanzadas de posicionamiento orgánico y pagado.' },
      { title: 'Analítica Digital y Business Intelligence', hours: 25, description: 'Google Analytics 4, Tag Manager, dashboards ejecutivos y modelado de datos.' },
      { title: 'Marketing de Contenidos y Redes Sociales', hours: 15, description: 'Content marketing, social listening y gestión de comunidades.' },
      { title: 'E-commerce y Estrategia Omnicanal', hours: 20, description: 'Comercio electrónico, marketplace management y experiencia del cliente.' },
      { title: 'Inteligencia Artificial Aplicada al Marketing', hours: 20, description: 'IA generativa, automatización inteligente y personalización a escala.' },
      { title: 'Dirección de Proyectos Digitales', hours: 15, description: 'Metodologías ágiles, gestión de equipos y liderazgo digital.' },
      { title: 'Tesis de Maestría', hours: 25, description: 'Investigación aplicada, redacción académica y defensa de tesis.' },
    ],
    methodology: 'Evaluación por módulo mediante ensayos, casos prácticos, presentaciones y exámenes. Tesis de maestría con asesor académico. Criterio de aprobación: 75% en cada módulo y defensa exitosa de tesis.',
    ingressProfile: 'Licenciados en marketing, comunicación, administración, ingeniería o áreas afines. Experiencia profesional mínima de 2 años en entornos digitales.',
    egressProfile: 'Director de marketing digital capaz de liderar estrategias integrales, gestionar equipos multidisciplinarios y tomar decisiones basadas en datos.',
    certification: 'Grado de Maestría en Marketing Digital Estratégico, emitido por UTAMV con validación institucional, detalle de créditos y competencias.',
  },
  'maestria-ia-empresarial': {
    type: 'Maestría',
    title: 'Maestría en Inteligencia Artificial Aplicada',
    hours: '180+',
    duration: '12 meses',
    modality: '100% en línea',
    level: 'Posgrado',
    description: 'Formación avanzada en desarrollo y aplicación de inteligencia artificial en entornos empresariales. Cubre algoritmos de machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.',
    objectives: [
      'Comprender los fundamentos matemáticos y algorítmicos de la IA',
      'Implementar modelos de machine learning y deep learning',
      'Aplicar NLP y visión por computadora en contextos empresariales',
      'Diseñar sistemas de IA responsable con gobernanza ética',
      'Desarrollar soluciones de automatización inteligente',
      'Producir investigación aplicada en IA empresarial',
    ],
    modules: [
      { title: 'Matemáticas para IA', hours: 20, description: 'Álgebra lineal, cálculo, probabilidad y estadística aplicada.' },
      { title: 'Programación y Ciencia de Datos', hours: 20, description: 'Python, R, manipulación de datos y visualización.' },
      { title: 'Machine Learning', hours: 25, description: 'Algoritmos supervisados, no supervisados y técnicas de ensemble.' },
      { title: 'Deep Learning', hours: 20, description: 'Redes neuronales, CNNs, RNNs, transformers y arquitecturas modernas.' },
      { title: 'Procesamiento de Lenguaje Natural', hours: 20, description: 'Análisis de texto, sentimiento, chatbots y modelos de lenguaje.' },
      { title: 'IA para Automatización Empresarial', hours: 20, description: 'RPA inteligente, flujos de trabajo y optimización de procesos.' },
      { title: 'Ética y Gobernanza de IA', hours: 15, description: 'Sesgo algorítmico, transparencia, regulación y responsabilidad.' },
      { title: 'Proyecto de Investigación', hours: 20, description: 'Desarrollo de una solución de IA para un problema empresarial real.' },
      { title: 'Tesis de Maestría', hours: 20, description: 'Investigación aplicada con metodología rigurosa y defensa académica.' },
    ],
    methodology: 'Evaluación por portafolio técnico, proyectos de código, ensayos y tesis final. Uso de plataformas como Google Colab, Kaggle y GitHub. Criterio de aprobación: 75%.',
    ingressProfile: 'Licenciados en ingeniería, ciencias de la computación, matemáticas, física o áreas afines. Conocimientos básicos de programación.',
    egressProfile: 'Especialista en IA capaz de diseñar, implementar y evaluar soluciones inteligentes para organizaciones.',
    certification: 'Grado de Maestría en Inteligencia Artificial Aplicada, emitido por UTAMV.',
  },
  'maestria-negocios-digitales': {
    type: 'Maestría',
    title: 'Maestría en Negocios Digitales',
    hours: '160+',
    duration: '10 meses',
    modality: 'Híbrido',
    level: 'Posgrado',
    description: 'Gestión de empresas en entornos digitales con énfasis en estrategia empresarial, innovación tecnológica, modelos de negocio y liderazgo digital. Orientada a directivos y emprendedores.',
    objectives: [
      'Diseñar modelos de negocio digitales sostenibles',
      'Gestionar procesos de transformación digital organizacional',
      'Implementar metodologías ágiles en entornos corporativos',
      'Evaluar y adoptar tecnologías emergentes con criterio estratégico',
      'Liderar equipos multidisciplinarios en entornos digitales',
    ],
    modules: [
      { title: 'Estrategia y Modelos de Negocio Digital', hours: 20, description: 'Canvas, plataformas, ecosistemas y monetización digital.' },
      { title: 'Transformación Digital Organizacional', hours: 20, description: 'Gestión del cambio, cultura digital y madurez tecnológica.' },
      { title: 'Fintech y Economía Digital', hours: 15, description: 'Pagos digitales, blockchain, criptoactivos y regulación.' },
      { title: 'Marketing Digital para Negocios', hours: 20, description: 'Adquisición, retención, LTV y estrategias de crecimiento.' },
      { title: 'Gestión de Productos Digitales', hours: 20, description: 'Product management, UX, roadmaps y métricas de producto.' },
      { title: 'Data-Driven Decision Making', hours: 15, description: 'Analítica de negocio, KPIs, dashboards y cultura de datos.' },
      { title: 'Liderazgo y Gestión de Equipos', hours: 15, description: 'Liderazgo remoto, metodologías ágiles y gestión del talento.' },
      { title: 'Proyecto Empresarial', hours: 20, description: 'Desarrollo de un plan de negocio digital con viabilidad demostrada.' },
      { title: 'Tesis de Maestría', hours: 15, description: 'Investigación aplicada en negocios digitales.' },
    ],
    methodology: 'Casos de estudio reales, simulaciones, presentaciones ejecutivas y tesis final. Criterio de aprobación: 75% por módulo.',
    ingressProfile: 'Profesionales con licenciatura y experiencia en gestión, emprendimiento o tecnología. Mínimo 3 años de experiencia profesional.',
    egressProfile: 'Directivo digital capaz de concebir, lanzar y escalar negocios en el entorno digital.',
    certification: 'Grado de Maestría en Negocios Digitales, emitido por UTAMV.',
  },

  // ── MÁSTER PROFESIONAL ──
  'master-analitica-digital': {
    type: 'Máster Profesional',
    title: 'Analítica Digital',
    hours: '45+',
    duration: '5 meses',
    modality: '100% en línea',
    level: 'Avanzado',
    description: 'Especialización en análisis de datos para marketing digital. Cubre desde la configuración técnica de herramientas de medición hasta la construcción de dashboards ejecutivos y modelos predictivos para la toma de decisiones.',
    objectives: [
      'Configurar Google Analytics 4, GTM y herramientas de medición avanzadas',
      'Diseñar sistemas de etiquetado y atribución multicanal',
      'Construir dashboards ejecutivos con Looker Studio y Power BI',
      'Aplicar modelos de regresión y clustering a datos de marketing',
      'Implementar testing A/B con rigor estadístico',
      'Comunicar hallazgos analíticos a nivel directivo',
    ],
    modules: [
      { title: 'Fundamentos de Analítica Digital', hours: 6, description: 'Métricas clave, KPIs, modelos de atribución y ecosistema de medición.' },
      { title: 'Google Analytics 4 y Tag Manager', hours: 7, description: 'Configuración avanzada, eventos personalizados, audiencias y reportes.' },
      { title: 'Visualización de Datos y Dashboards', hours: 7, description: 'Looker Studio, Power BI, diseño de dashboards y storytelling con datos.' },
      { title: 'Estadística Aplicada al Marketing', hours: 6, description: 'Tests de hipótesis, intervalos de confianza, regresión y correlación.' },
      { title: 'Analítica Predictiva', hours: 7, description: 'Machine learning básico, modelos de propensión y pronóstico de ventas.' },
      { title: 'CRO y Testing A/B', hours: 6, description: 'Optimización de conversiones, diseño de experimentos y herramientas.' },
      { title: 'Proyecto de Analítica Integral', hours: 6, description: 'Caso real: auditoría, implementación y reporte analítico completo.' },
    ],
    methodology: 'Evaluación por proyectos prácticos con datos reales, presentaciones y examen final. Criterio de aprobación: 70%.',
    ingressProfile: 'Profesionales de marketing, comunicación o tecnología con experiencia en gestión de campañas digitales.',
    egressProfile: 'Analista digital senior capaz de diseñar sistemas de medición, interpretar datos complejos y orientar decisiones estratégicas.',
    certification: 'Certificado UTAMV de Máster Profesional en Analítica Digital. Incluye horas, competencias y sello verificable.',
  },
  'master-ia-empresarial': {
    type: 'Máster Profesional',
    title: 'IA para Negocios',
    hours: '55+',
    duration: '6 meses',
    modality: '100% en línea',
    level: 'Avanzado',
    description: 'Programa especializado en la aplicación de inteligencia artificial en entornos empresariales. Implementa soluciones de IA generativa, machine learning y automatización para optimizar procesos y crear valor competitivo.',
    objectives: [
      'Dominar fundamentos de inteligencia artificial y machine learning',
      'Implementar soluciones de IA generativa para negocios',
      'Diseñar automatizaciones inteligentes para procesos empresariales',
      'Aplicar analítica predictiva para la toma de decisiones',
      'Comprender ética y gobernanza en implementación de IA',
      'Desarrollar proyectos reales de IA en entornos empresariales',
    ],
    modules: [
      { title: 'Fundamentos de Inteligencia Artificial', hours: 6, description: 'Historia, conceptos básicos y tipos de IA (generativa, predictiva, prescriptiva).' },
      { title: 'Machine Learning para Negocios', hours: 7, description: 'Algoritmos, modelado predictivo y aplicaciones en marketing, finanzas y operaciones.' },
      { title: 'IA Generativa y Creatividad', hours: 6, description: 'GPT, DALL-E, MidJourney y su aplicación en contenido, diseño y personalización.' },
      { title: 'Automatización Inteligente de Procesos', hours: 7, description: 'RPA, chatbots, asistentes virtuales y optimización de flujos de trabajo.' },
      { title: 'Analítica Predictiva y Business Intelligence', hours: 6, description: 'Modelado de datos, visualización y dashboards para decisiones estratégicas.' },
      { title: 'Ética y Gobernanza de la IA', hours: 5, description: 'Responsabilidad ética, bias, privacidad de datos y regulación global.' },
      { title: 'Proyecto Integral de IA', hours: 8, description: 'Desarrollo de una solución real de IA para un problema empresarial.' },
    ],
    methodology: 'Evaluación por módulo mediante exámenes, ejercicios prácticos y proyecto final. Criterio de aprobación: 70%.',
    ingressProfile: 'Profesionales en marketing, finanzas, operaciones o tecnología. Conocimientos básicos de Excel y herramientas digitales.',
    egressProfile: 'Profesional capacitado para liderar la implementación de IA en empresas, diseñar soluciones inteligentes y demostrar ROI.',
    certification: 'Certificado UTAMV de Máster Profesional en IA para Negocios. Incluye horas acreditadas y sello digital verificable.',
  },
  'master-transformacion-digital': {
    type: 'Máster Profesional',
    title: 'Transformación Digital',
    hours: '50+',
    duration: '6 meses',
    modality: '100% en línea',
    level: 'Avanzado',
    description: 'Programa de liderazgo en transformación digital que combina estrategia, cultura y tecnología. Direcciona cambios organizacionales, implementa marcos digitales y mide el impacto de la transformación.',
    objectives: [
      'Comprender el contexto de la transformación digital',
      'Diseñar estrategias de transformación para organizaciones',
      'Gestionar cambios culturales y organizacionales',
      'Implementar marcos de trabajo ágiles y metodologías modernas',
      'Medir el impacto y ROI de la transformación digital',
      'Desarrollar liderazgo digital para equipos multidisciplinarios',
    ],
    modules: [
      { title: 'Contexto y Drivers de la Transformación', hours: 5, description: 'Tendencias digitales, disrupción y modelos de negocio digitales.' },
      { title: 'Estrategia Digital y Modelos de Negocio', hours: 6, description: 'Modelos canvas, servitización, plataformas y datos como activo.' },
      { title: 'Gestión del Cambio Cultural', hours: 7, description: 'Resistencia al cambio, liderazgo transformacional y cultura digital.' },
      { title: 'Metodologías Ágiles y Gestión Moderna', hours: 6, description: 'Scrum, Kanban, Design Thinking y Lean para transformación.' },
      { title: 'Stack Tecnológico para Transformación', hours: 6, description: 'Cloud, APIs, microservicios y arquitectura de referencia digital.' },
      { title: 'Métricas y ROI de la Transformación', hours: 5, description: 'KPIs digitales, valorización de datos y reporte ejecutivo.' },
      { title: 'Proyecto de Transformación Digital', hours: 8, description: 'Diseño y ejecución de un plan de transformación para una organización real.' },
    ],
    methodology: 'Evaluación por módulo mediante ejercicios prácticos, case studies y proyecto final. Criterio de aprobación: 70%.',
    ingressProfile: 'Directivos, gerentes o profesionales con experiencia en liderazgo o gestión de equipos.',
    egressProfile: 'Líder digital capaz de diseñar y ejecutar estrategias de transformación, gestionar cambios y medir resultados.',
    certification: 'Certificado UTAMV de Máster Profesional en Transformación Digital. Incluye horas acreditadas y sello digital verificable.',
  },

  // ── DIPLOMADOS ──
  'diplomado-seo-avanzado': {
    type: 'Diplomado',
    title: 'SEO y AEO Avanzado',
    hours: '30',
    duration: '2 meses',
    modality: '100% en línea',
    level: 'Intermedio',
    description: 'Formación especializada en optimización para motores de búsqueda tradicionales (SEO) y motores de respuesta con inteligencia artificial (AEO). Cubre desde auditoría técnica hasta estrategias de contenido para featured snippets y IA generativa.',
    objectives: [
      'Realizar auditorías SEO técnicas completas',
      'Optimizar para Google, Bing, AI Overviews y motores de respuesta',
      'Diseñar arquitectura de información y enlazado interno estratégico',
      'Implementar Schema Markup y datos estructurados avanzados',
      'Crear estrategias de contenido para featured snippets y AEO',
      'Medir y reportar rendimiento SEO con herramientas profesionales',
    ],
    modules: [
      { title: 'Auditoría SEO Técnica', hours: 5, description: 'Crawling, indexación, Core Web Vitals, velocidad y arquitectura web.' },
      { title: 'SEO On-Page Avanzado', hours: 5, description: 'Optimización de contenido, títulos, meta descriptions, heading structure y NLP.' },
      { title: 'SEO Off-Page y Link Building', hours: 4, description: 'Estrategias de autoridad, digital PR, outreach y análisis de backlinks.' },
      { title: 'Schema Markup y Datos Estructurados', hours: 4, description: 'JSON-LD, rich snippets, FAQ schema, producto, organización y eventos.' },
      { title: 'AEO: Optimización para Motores de IA', hours: 5, description: 'ChatGPT, Perplexity, Google AI Overviews y optimización de respuestas.' },
      { title: 'Herramientas y Reporting', hours: 4, description: 'Google Search Console, Ahrefs, SEMrush, Screaming Frog y dashboards.' },
      { title: 'Proyecto SEO Integral', hours: 3, description: 'Auditoría, estrategia y ejecución para un sitio web real.' },
    ],
    methodology: 'Evaluación mediante auditorías prácticas, ejercicios con herramientas reales y proyecto final. Criterio de aprobación: 70%.',
    ingressProfile: 'Profesionales de marketing digital, creadores de contenido o desarrolladores web con conocimientos básicos de SEO.',
    egressProfile: 'Especialista SEO/AEO capaz de posicionar sitios web en buscadores tradicionales y motores de respuesta con IA.',
    certification: 'Diplomado UTAMV en SEO y AEO Avanzado. Certificación con horas, competencias y sello digital verificable.',
  },
  'diplomado-ia-marketing': {
    type: 'Diplomado',
    title: 'Inteligencia Artificial para Marketing',
    hours: '25',
    duration: '2 meses',
    modality: '100% en línea',
    level: 'Intermedio',
    description: 'Aplicación práctica de herramientas de IA en automatización de campañas, análisis predictivo, generación de contenido y personalización a escala. Enfocado en resultados medibles para equipos de marketing.',
    objectives: [
      'Implementar IA generativa para creación de contenido (texto, imagen, video)',
      'Automatizar flujos de marketing con herramientas de IA',
      'Aplicar análisis predictivo para segmentación y targeting',
      'Personalizar experiencias del cliente a escala con IA',
      'Evaluar y seleccionar herramientas de IA para marketing',
      'Medir el impacto de la IA en métricas de negocio',
    ],
    modules: [
      { title: 'Fundamentos de IA para Marketers', hours: 4, description: 'Conceptos clave, tipos de IA, prompting efectivo y ecosistema de herramientas.' },
      { title: 'IA Generativa para Contenido', hours: 5, description: 'ChatGPT, Claude, Midjourney, DALL-E, copy asistido y workflows de creación.' },
      { title: 'Automatización de Campañas con IA', hours: 5, description: 'Zapier AI, Make, HubSpot AI, automatización de emails y nurturing.' },
      { title: 'Análisis Predictivo para Marketing', hours: 4, description: 'Modelos de propensión, churn prediction, forecasting y LTV.' },
      { title: 'Personalización y Segmentación Inteligente', hours: 4, description: 'Recomendaciones, contenido dinámico y experiencias adaptativas.' },
      { title: 'Proyecto de IA en Marketing', hours: 3, description: 'Implementación real de una solución de IA en un flujo de marketing.' },
    ],
    methodology: 'Evaluación mediante proyectos prácticos con herramientas reales de IA, presentaciones y caso final. Criterio de aprobación: 70%.',
    ingressProfile: 'Profesionales de marketing digital, community managers, content creators o analistas con interés en IA aplicada.',
    egressProfile: 'Profesional de marketing capaz de integrar IA en su trabajo diario para aumentar productividad y resultados.',
    certification: 'Diplomado UTAMV en Inteligencia Artificial para Marketing. Certificación con horas y sello digital verificable.',
  },
  'diplomado-programacion-fullstack': {
    type: 'Diplomado',
    title: 'Programación Full Stack',
    hours: '40',
    duration: '3 meses',
    modality: '100% en línea',
    level: 'Intermedio',
    description: 'Desarrollo web completo desde cero con JavaScript, TypeScript, React, Node.js y bases de datos. Construcción de aplicaciones reales con enfoque en buenas prácticas y despliegue profesional.',
    objectives: [
      'Dominar HTML, CSS y JavaScript moderno (ES6+)',
      'Construir interfaces reactivas con React y TypeScript',
      'Desarrollar APIs REST con Node.js y Express',
      'Gestionar bases de datos SQL y NoSQL',
      'Implementar autenticación y seguridad web',
      'Desplegar aplicaciones en servicios cloud',
    ],
    modules: [
      { title: 'Fundamentos Web: HTML, CSS, JavaScript', hours: 6, description: 'Estructura, estilos, responsividad y programación básica.' },
      { title: 'JavaScript Avanzado y TypeScript', hours: 6, description: 'Async/await, módulos, tipos, interfaces y patrones de diseño.' },
      { title: 'React: Frontend Moderno', hours: 7, description: 'Componentes, hooks, routing, estado global y optimización.' },
      { title: 'Node.js y APIs REST', hours: 6, description: 'Express, middleware, controladores, validación y documentación.' },
      { title: 'Bases de Datos y ORM', hours: 5, description: 'PostgreSQL, MongoDB, Prisma/Supabase, migraciones y consultas.' },
      { title: 'Autenticación y Seguridad', hours: 4, description: 'JWT, OAuth, CORS, XSS, CSRF y mejores prácticas de seguridad.' },
      { title: 'DevOps y Despliegue', hours: 3, description: 'Git, CI/CD, Docker, Vercel/Railway y monitoreo.' },
      { title: 'Proyecto Full Stack', hours: 3, description: 'Desarrollo de una aplicación web completa desde diseño hasta producción.' },
    ],
    methodology: 'Evaluación por entregas de código en GitHub, code reviews, pair programming y proyecto final. Criterio de aprobación: 70%.',
    ingressProfile: 'Personas con interés en programación web. No requiere experiencia previa en desarrollo, pero se recomienda pensamiento lógico básico.',
    egressProfile: 'Desarrollador full stack junior capaz de construir y desplegar aplicaciones web completas.',
    certification: 'Diplomado UTAMV en Programación Full Stack. Certificación con horas, portafolio y sello digital verificable.',
  },

  // ── CERTIFICADOS PROFESIONALES ──
  'certificado-marketing-digital': {
    type: 'Certificado Profesional',
    title: 'Marketing Digital',
    hours: '5',
    duration: '1 semana',
    modality: '100% en línea',
    level: 'Introductorio',
    description: 'Programa introductorio que cubre los conceptos esenciales del marketing digital: ecosistema actual, herramientas básicas de análisis, fundamentos de posicionamiento en línea y métricas clave.',
    objectives: [
      'Comprender el ecosistema del marketing digital actual',
      'Identificar las herramientas esenciales de análisis y gestión',
      'Conocer los fundamentos de SEO y publicidad digital',
      'Desarrollar un plan básico de presencia digital',
    ],
    modules: [
      { title: 'Ecosistema Digital y Tendencias', hours: 1.5, description: 'Panorama actual, canales digitales y oportunidades.' },
      { title: 'Herramientas y Plataformas Esenciales', hours: 1.5, description: 'Google Analytics, redes sociales, CMS y herramientas básicas.' },
      { title: 'Fundamentos de SEO y Publicidad', hours: 2, description: 'Principios de optimización y campañas publicitarias básicas.' },
    ],
    methodology: 'Evaluación tipo quiz al finalizar cada bloque temático. Criterio de aprobación: 60%.',
    ingressProfile: 'Cualquier persona interesada en iniciar su formación en marketing digital. No requiere experiencia previa.',
    egressProfile: 'Profesional con conocimientos fundamentales para gestionar una presencia digital básica.',
    certification: 'Certificado UTAMV de Formación Profesional en Marketing Digital.',
  },
  'certificado-analitica-digital': {
    type: 'Certificado Profesional',
    title: 'Analítica Digital',
    hours: '8',
    duration: '2 semanas',
    modality: '100% en línea',
    level: 'Introductorio',
    description: 'Medición de resultados digitales, configuración de herramientas de analítica y toma de decisiones basada en datos para campañas y presencia digital.',
    objectives: [
      'Configurar Google Analytics 4 para un sitio web',
      'Interpretar métricas clave de tráfico, conversión y comportamiento',
      'Crear reportes y dashboards básicos',
      'Tomar decisiones informadas basadas en datos',
    ],
    modules: [
      { title: 'Introducción a la Analítica Digital', hours: 2, description: 'Conceptos clave, métricas, dimensiones y modelos de datos.' },
      { title: 'Google Analytics 4: Configuración y Uso', hours: 3, description: 'Instalación, eventos, conversiones, audiencias y reportes.' },
      { title: 'Dashboards y Reporting', hours: 3, description: 'Looker Studio, visualización de datos y comunicación de resultados.' },
    ],
    methodology: 'Evaluación mediante quiz y ejercicio práctico de configuración. Criterio de aprobación: 60%.',
    ingressProfile: 'Profesionales de cualquier área que necesiten medir y reportar resultados digitales.',
    egressProfile: 'Profesional capaz de configurar herramientas de medición y tomar decisiones basadas en datos.',
    certification: 'Certificado UTAMV de Formación Profesional en Analítica Digital.',
  },
  'certificado-seguridad-web': {
    type: 'Certificado Profesional',
    title: 'Seguridad Web',
    hours: '6',
    duration: '2 semanas',
    modality: '100% en línea',
    level: 'Introductorio',
    description: 'Formación en protección de datos, ciberseguridad básica, cumplimiento normativo (GDPR, LGPD) y seguridad en plataformas web y educativas.',
    objectives: [
      'Comprender los fundamentos de seguridad web',
      'Identificar vulnerabilidades comunes (OWASP Top 10)',
      'Implementar medidas básicas de protección de datos',
      'Conocer las obligaciones legales en materia de privacidad',
    ],
    modules: [
      { title: 'Fundamentos de Ciberseguridad', hours: 2, description: 'Amenazas, vectores de ataque y principios de defensa.' },
      { title: 'Vulnerabilidades Web y OWASP', hours: 2, description: 'XSS, SQL Injection, CSRF y mejores prácticas de prevención.' },
      { title: 'Privacidad y Cumplimiento Normativo', hours: 2, description: 'GDPR, LGPD, avisos de privacidad y derechos del usuario.' },
    ],
    methodology: 'Quiz de evaluación por módulo y ejercicio práctico de auditoría básica. Criterio de aprobación: 60%.',
    ingressProfile: 'Desarrolladores, administradores web o profesionales que gestionan datos de usuarios.',
    egressProfile: 'Profesional con capacidad de identificar riesgos de seguridad y aplicar medidas preventivas básicas.',
    certification: 'Certificado UTAMV de Formación Profesional en Seguridad Web.',
  },
  'certificado-ia-basica': {
    type: 'Certificado Profesional',
    title: 'Inteligencia Artificial Básica',
    hours: '5',
    duration: '1 semana',
    modality: '100% en línea',
    level: 'Introductorio',
    description: 'Fundamentos de inteligencia artificial, machine learning y aplicaciones prácticas para profesionales no técnicos. Incluye uso de herramientas de IA generativa en el trabajo diario.',
    objectives: [
      'Comprender qué es la IA y sus tipos principales',
      'Usar herramientas de IA generativa de forma efectiva',
      'Identificar oportunidades de aplicación de IA en su trabajo',
      'Evaluar limitaciones y riesgos del uso de IA',
    ],
    modules: [
      { title: 'Qué es la Inteligencia Artificial', hours: 1.5, description: 'Historia, tipos de IA, machine learning y deep learning explicados.' },
      { title: 'IA Generativa en la Práctica', hours: 2, description: 'ChatGPT, Claude, Gemini: prompting, casos de uso y limitaciones.' },
      { title: 'IA en tu Industria', hours: 1.5, description: 'Aplicaciones por sector, ética y futuro de la IA en el trabajo.' },
    ],
    methodology: 'Quiz de evaluación y ejercicio práctico con herramientas de IA. Criterio de aprobación: 60%.',
    ingressProfile: 'Profesionales de cualquier área interesados en comprender y usar IA. No requiere conocimientos técnicos.',
    egressProfile: 'Profesional informado sobre IA, capaz de usar herramientas generativas y evaluar oportunidades.',
    certification: 'Certificado UTAMV de Formación Profesional en Inteligencia Artificial Básica.',
  },

  // ── DOCTORADO ──
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

  // Backward compat
  'fundamentos-marketing-digital': {
    type: 'Certificado Profesional',
    title: 'Fundamentos de Marketing Digital',
    hours: '5',
    duration: '1 semana',
    modality: '100% en línea',
    level: 'Introductorio',
    description: 'Programa introductorio que cubre los conceptos esenciales del marketing digital.',
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
    ingressProfile: 'Cualquier persona interesada en iniciar su formación en marketing digital.',
    egressProfile: 'Profesional con conocimientos fundamentales para gestionar una presencia digital básica.',
    certification: 'Certificado UTAMV de Formación Profesional en Fundamentos de Marketing Digital.',
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
          <p className="text-muted-foreground mb-6">El programa solicitado no existe en nuestro catálogo.</p>
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
                    <CheckCircle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{obj}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Plan de estudios */}
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-4 tracking-wider uppercase">Plan de Estudios</h2>
              <div className="space-y-2">
                {program.modules.map((mod: ProgramModule, i: number) => (
                  <button
                    key={i}
                    onClick={() => setExpandedModule(expandedModule === i ? null : i)}
                    className="w-full text-left p-4 rounded-lg border border-border bg-card/30 hover:bg-card/60 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
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
            <section className="p-8 rounded-xl border border-border bg-card/30">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-muted-foreground shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-3 tracking-wider uppercase">Certificación UTAMV</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{program.certification}</p>
                  <Link to="/verificar-certificado" className="inline-block mt-4 text-xs font-semibold text-muted-foreground tracking-wider hover:text-foreground hover:underline transition-colors">
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
