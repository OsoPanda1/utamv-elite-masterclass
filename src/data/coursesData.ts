// UTAMV Elite Masterclass — 7 Cursos Completos con contenido de última generación
// Based on the Documento Maestro UTAMV 2026 and OBE NextGen methodology

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'text' | 'quiz' | 'exercise' | 'live';
  duration: number; // minutes
  isFreePreview?: boolean;
  content?: string;
  resources?: { name: string; url: string; type: 'pdf' | 'template' | 'tool' | 'guide' }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  learningObjectives: string[];
  isFreePreview?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
  passingScore: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: 'Certificación' | 'Diplomado' | 'Máster' | 'Licenciatura' | 'Maestría';
  category: string;
  hours: number;
  priceMXN: number;
  priceUSD: number;
  stripePriceId: string;
  instructorName: string;
  instructorTitle: string;
  instructorBio: string;
  thumbnail: string;
  isFeatured: boolean;
  learningOutcomes: string[];
  prerequisites: string[];
  modules: Module[];
  quizzes: Quiz[];
  obeFramework: {
    competencies: string[];
    evidences: string[];
    rubrics: string[];
  };
}

export const COURSES: Course[] = [
  // ──────────────────────────────────────────────────────
  // CURSO 1 — Marketing Digital 360° (30 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c1',
    slug: 'marketing-digital-360',
    title: 'Marketing Digital 360°',
    subtitle: 'Fundamentos y Estrategia para el Ecosistema LATAM',
    description: 'Domina los fundamentos del marketing digital con metodología OBE. Aprende SEO, SEM, Social Media, Email Marketing y analítica desde cero con casos reales de LATAM.',
    level: 'Certificación',
    category: 'Marketing Digital',
    hours: 30,
    priceMXN: 4242,
    priceUSD: 212,
    stripePriceId: 'price_marketing_360',
    instructorName: 'RENATA JAZMIN',
    instructorTitle: 'CEO Fundadora de ORBITA DIGITAL',
    instructorBio: 'Expertise como Community Manager en comunidades latinas a gran escala. Desarrolladora de Estrategias y Métodos comprobados para visionarios y emprendedores que no se conforman con una respuesta negativa. Liderazgo en expansión de mercados transatlánticos.',
    thumbnail: '/src/assets/module-1.jpg',
    isFeatured: true,
    learningOutcomes: [
      'Diseñar estrategias de marketing digital integrales para mercados latinoamericanos',
      'Gestionar campañas en Google Ads, Meta Ads y LinkedIn con ROI medible',
      'Implementar SEO técnico y de contenidos con herramientas avanzadas',
      'Analizar métricas con GA4 y construir dashboards ejecutivos',
      'Crear embudos de conversión optimizados para e-commerce LATAM',
    ],
    prerequisites: ['Conocimientos básicos de internet y redes sociales', 'Acceso a una computadora con internet'],
    obeFramework: {
      competencies: ['Estrategia digital', 'Gestión de campañas', 'Analítica web', 'Contenido digital'],
      evidences: ['Plan de marketing digital para empresa real', 'Campaña activa en Google/Meta Ads', 'Dashboard GA4 con KPIs accionables'],
      rubrics: ['Rúbrica OBE Nivel 1-4 por competencia', 'Portafolio digital verificable', 'Evaluación entre pares certificada'],
    },
    modules: [
      {
        id: 'm1-1',
        title: 'Ecosistema Digital y Comportamiento del Consumidor',
        description: 'Comprende el entorno digital latinoamericano y la psicología del comprador online.',
        isFreePreview: true,
        learningObjectives: [
          'Mapear el ecosistema digital LATAM 2026',
          'Aplicar el Customer Journey en entornos digitales',
          'Identificar oportunidades de mercado digital en México, Colombia y Argentina',
        ],
        lessons: [
          { id: 'l1-1-1', title: 'Bienvenida: La Revolución Digital en LATAM 2026', type: 'video', duration: 18, isFreePreview: true, resources: [{ name: 'Mapa Mental Ecosistema Digital', url: '#', type: 'pdf' }] },
          { id: 'l1-1-2', title: 'Comportamiento del Consumidor Digital: Neurociencia aplicada', type: 'video', duration: 25, isFreePreview: true },
          { id: 'l1-1-3', title: 'Customer Journey Mapping: Metodología y herramientas', type: 'text', duration: 20 },
          { id: 'l1-1-4', title: 'Podcast: Tendencias de Marketing 2026 con expertos LATAM', type: 'audio', duration: 35, resources: [{ name: 'Transcripción completa', url: '#', type: 'guide' }] },
          { id: 'l1-1-5', title: 'Ejercicio: Mapea el Customer Journey de tu negocio', type: 'exercise', duration: 45 },
          { id: 'l1-1-6', title: 'Quiz Módulo 1', type: 'quiz', duration: 15 },
        ],
      },
      {
        id: 'm1-2',
        title: 'SEO y Posicionamiento Orgánico Avanzado',
        description: 'Domina el SEO técnico, de contenidos y local para mercados hispanohablantes.',
        learningObjectives: [
          'Realizar auditorías SEO técnicas completas',
          'Desarrollar estrategias de contenido con intención de búsqueda',
          'Optimizar para búsquedas locales y de voz en LATAM',
        ],
        lessons: [
          { id: 'l1-2-1', title: 'SEO Técnico: Auditoría completa con Screaming Frog y Ahrefs', type: 'video', duration: 40 },
          { id: 'l1-2-2', title: 'Keyword Research Avanzado: Intención de búsqueda y LATAM', type: 'video', duration: 35 },
          { id: 'l1-2-3', title: 'Core Web Vitals y Page Experience: Guía técnica 2026', type: 'text', duration: 25, resources: [{ name: 'Checklist CWV', url: '#', type: 'template' }] },
          { id: 'l1-2-4', title: 'SEO Local y Google Business: Estrategia México', type: 'video', duration: 30 },
          { id: 'l1-2-5', title: 'Taller: Auditoría SEO de tu sitio web en vivo', type: 'exercise', duration: 60 },
        ],
      },
      {
        id: 'm1-3',
        title: 'Publicidad Digital: Google y Meta Ads',
        description: 'Domina las plataformas de publicidad de pago más importantes del mundo.',
        learningObjectives: ['Crear campañas rentables en Google Ads', 'Optimizar Meta Ads con segmentación avanzada', 'Medir ROAS y optimizar en tiempo real'],
        lessons: [
          { id: 'l1-3-1', title: 'Google Ads: Estructura de campañas de alta conversión', type: 'video', duration: 45 },
          { id: 'l1-3-2', title: 'Meta Ads 2026: Targeting, Creative y Algoritmo', type: 'video', duration: 40 },
          { id: 'l1-3-3', title: 'Remarketing y Lookalike Audiences: Estrategias avanzadas', type: 'video', duration: 30 },
          { id: 'l1-3-4', title: 'Proyecto: Campaña real con presupuesto de $500 MXN', type: 'exercise', duration: 90 },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q1-1',
        title: 'Evaluación Final — Marketing Digital 360°',
        passingScore: 70,
        questions: [
          { id: 'qq1', question: '¿Cuál es el principal indicador de ROI en campañas de Google Ads?', options: ['CTR', 'ROAS', 'CPC', 'CPM'], correct: 1, explanation: 'El ROAS (Return on Ad Spend) mide directamente el retorno sobre la inversión publicitaria.' },
          { id: 'qq2', question: 'En el Customer Journey, ¿qué etapa ocurre después de la Consideración?', options: ['Awareness', 'Decisión', 'Retención', 'Advocacy'], correct: 1, explanation: 'La etapa de Decisión sigue a la Consideración en el funnel de conversión clásico.' },
          { id: 'qq3', question: '¿Qué herramienta de Google permite medir el comportamiento completo del usuario en sitios web?', options: ['Google Search Console', 'Google Analytics 4', 'Google Tag Manager', 'Google Optimize'], correct: 1, explanation: 'GA4 ofrece seguimiento del comportamiento del usuario con modelo de datos basado en eventos.' },
          { id: 'qq4', question: '¿Cuál es el porcentaje mínimo recomendado de Quality Score en Google Ads para optimizar costos?', options: ['5/10', '6/10', '7/10', '8/10'], correct: 2, explanation: 'Un Quality Score de 7/10 o superior indica relevancia alta y reduce el CPC.' },
          { id: 'qq5', question: '¿Qué significa el término "Core Web Vitals" en SEO técnico?', options: ['Palabras clave principales', 'Métricas de experiencia de página de Google', 'Velocidad de carga del servidor', 'Número de backlinks de calidad'], correct: 1, explanation: 'Core Web Vitals son métricas que Google utiliza para evaluar la experiencia de usuario: LCP, FID y CLS.' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // CURSO 2 — IA Aplicada al Marketing (50 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c2',
    slug: 'ia-aplicada-marketing',
    title: 'Inteligencia Artificial Aplicada al Marketing',
    subtitle: 'Automatización, Generative AI y Estrategia Data-Driven 2026',
    description: 'Domina las herramientas de IA más avanzadas del mercado: ChatGPT, Claude, Midjourney, HeyGen, ElevenLabs y más. Aprende a automatizar procesos de marketing y tomar decisiones basadas en datos con IA.',
    level: 'Diplomado',
    category: 'Inteligencia Artificial',
    hours: 50,
    priceMXN: 7642,
    priceUSD: 382,
    stripePriceId: 'price_ia_marketing',
    instructorName: 'Edwin Oswaldo Castillo Trejo (Anubis Villaseñor)',
    instructorTitle: 'CEO Fundador de TAMV ONLINE, TAMV ONLINE METAVERSO, THE SOF, UTAMV',
    instructorBio: 'Expertise Autodidacta de Alto Nivel. Un perfil forjado en la experimentación directa, la creación de ecosistemas digitales complejos y el liderazgo de proyectos tecnológicos a gran escala, superando las mallas curriculares tradicionales mediante la aplicación empírica y el desarrollo de arquitecturas web disruptivas.',
    thumbnail: '/src/assets/module-9.jpg',
    isFeatured: true,
    learningOutcomes: [
      'Implementar flujos de trabajo con IA generativa en marketing digital',
      'Crear estrategias de contenido asistidas por IA a escala',
      'Automatizar campañas con herramientas de IA para reducir costos 60%+',
      'Analizar datos masivos con IA para toma de decisiones estratégicas',
      'Construir agentes de IA personalizados para marketing y ventas',
    ],
    prerequisites: ['Marketing Digital 360° o conocimientos equivalentes', 'Acceso a ChatGPT Plus o API de OpenAI'],
    obeFramework: {
      competencies: ['Prompting estratégico', 'Automatización con IA', 'Analítica predictiva', 'Ética en IA aplicada'],
      evidences: ['Sistema de contenido con IA implementado', 'Dashboard predictivo con ML', 'Agente de IA para marketing funcional'],
      rubrics: ['Rúbrica Prompting Avanzado', 'Rúbrica Automatización de Procesos', 'Evaluación Ética IA (Principios UTAMV 2026)'],
    },
    modules: [
      {
        id: 'm2-1',
        title: 'Fundamentos de IA Generativa para Marketing',
        description: 'Comprende cómo funciona la IA generativa y cómo aplicarla al marketing.',
        isFreePreview: true,
        learningObjectives: ['Diferenciar LLMs y sus aplicaciones en marketing', 'Escribir prompts de nivel profesional', 'Implementar flujos de trabajo con IA'],
        lessons: [
          { id: 'l2-1-1', title: 'La Revolución de los LLMs: ChatGPT, Claude, Gemini y Llama', type: 'video', duration: 30, isFreePreview: true },
          { id: 'l2-1-2', title: 'Prompting Avanzado: De básico a estratégico', type: 'video', duration: 45, isFreePreview: true, resources: [{ name: '500 Prompts de Marketing', url: '#', type: 'template' }] },
          { id: 'l2-1-3', title: 'Audio: Principios Éticos de IA según UTAMV 2026', type: 'audio', duration: 20 },
          { id: 'l2-1-4', title: 'Taller: Tu primer flujo de trabajo con IA', type: 'exercise', duration: 60 },
        ],
      },
      {
        id: 'm2-2',
        title: 'Generación de Contenido con IA a Escala',
        description: 'Crea contenido profesional de alta calidad con herramientas de IA.',
        learningObjectives: ['Usar Midjourney v7 para creatividades de marca', 'Crear videos con HeyGen y Runway ML', 'Generar audio/voz con ElevenLabs'],
        lessons: [
          { id: 'l2-2-1', title: 'Midjourney v7: Creatividades para Social Media y Ads', type: 'video', duration: 50 },
          { id: 'l2-2-2', title: 'HeyGen: Avatares de IA para video marketing', type: 'video', duration: 40 },
          { id: 'l2-2-3', title: 'ElevenLabs: Voz sintética para podcasts y ads', type: 'video', duration: 35, resources: [{ name: 'Guía de voz para marca', url: '#', type: 'guide' }] },
          { id: 'l2-2-4', title: 'Suno AI: Música original para tus campañas', type: 'audio', duration: 25 },
          { id: 'l2-2-5', title: 'Proyecto: Campaña completa con 100% contenido IA', type: 'exercise', duration: 120 },
        ],
      },
      {
        id: 'm2-3',
        title: 'Automatización y Agentes de IA en Marketing',
        description: 'Construye sistemas de marketing automatizados con IA.',
        learningObjectives: ['Crear agentes de IA con Make.com y Zapier', 'Implementar chatbots inteligentes para ventas', 'Automatizar reportes con IA'],
        lessons: [
          { id: 'l2-3-1', title: 'Make.com Avanzado: Flujos de marketing automatizados', type: 'video', duration: 55 },
          { id: 'l2-3-2', title: 'Agentes de IA con LangChain para marketing', type: 'video', duration: 60 },
          { id: 'l2-3-3', title: 'Chatbots para ventas: WhatsApp Business + IA', type: 'video', duration: 45 },
          { id: 'l2-3-4', title: 'Proyecto Final: Agente de marketing autónomo', type: 'exercise', duration: 180 },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q2-1',
        title: 'Evaluación: IA Aplicada al Marketing',
        passingScore: 75,
        questions: [
          { id: 'qq2-1', question: '¿Cuál es el Principio de Veracidad Académica en el uso de IA según UTAMV 2026?', options: ['La IA puede inventar información si es útil', 'La IA no inventará ni falseará información sin respaldo académico verificable', 'La IA debe ser siempre honesta con el cliente', 'La IA sustituye al criterio del marketing manager'], correct: 1, explanation: 'El Principio de Veracidad Académica (Art. IV-1 Documento Maestro UTAMV 2026) establece que la IA institucional no inventará información sin respaldo verificable.' },
          { id: 'qq2-2', question: '¿Qué herramienta de IA es más recomendada para crear avatares de video para marketing?', options: ['Midjourney', 'ElevenLabs', 'HeyGen', 'Runway ML'], correct: 2, explanation: 'HeyGen es la herramienta líder para crear avatares de IA que pueden presentar videos de marketing en múltiples idiomas.' },
          { id: 'qq2-3', question: '¿Cuál es la diferencia entre un LLM y un agente de IA?', options: ['Un LLM puede tomar acciones en el mundo real', 'Un agente de IA puede tomar acciones y usar herramientas de forma autónoma', 'No hay diferencia significativa', 'Un agente es más barato que un LLM'], correct: 1, explanation: 'Un agente de IA puede usar herramientas, acceder a bases de datos y ejecutar acciones de forma autónoma, a diferencia de un LLM que solo genera texto.' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // CURSO 3 — SEO y AEO Avanzado (80 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c3',
    slug: 'seo-aeo-avanzado',
    title: 'SEO y AEO Avanzado',
    subtitle: 'Posicionamiento Orgánico y Answer Engine Optimization',
    description: 'Domina SEO técnico, AEO, búsquedas de voz y SGE con casos reales de mercados hispanohablantes. Incluye auditorías técnicas, estrategia de contenidos y link building ético.',
    level: 'Diplomado',
    category: 'Marketing Digital',
    hours: 80,
    priceMXN: 11900,
    priceUSD: 595,
    stripePriceId: 'price_seo_aeo',
    instructorName: 'RENATA JAZMIN',
    instructorTitle: 'Especialista SEO Senior',
    instructorBio: 'Experta en SEO técnico y estrategia de contenidos para mercados LATAM.',
    thumbnail: '',
    isFeatured: true,
    learningOutcomes: [
      'Realizar auditorías SEO técnicas completas con herramientas profesionales',
      'Implementar estrategias AEO para featured snippets y respuestas de IA',
      'Desarrollar link building ético y digital PR para mercados LATAM',
      'Optimizar para SGE (Search Generative Experience) de Google',
    ],
    prerequisites: ['Marketing Digital 360° o equivalente', 'Conocimientos básicos de HTML'],
    obeFramework: {
      competencies: ['SEO Técnico', 'AEO', 'Content Strategy', 'Link Building'],
      evidences: ['Auditoría SEO completa de sitio web real', 'Estrategia AEO documentada', 'Reporte de link building ejecutado'],
      rubrics: ['Rúbrica Auditoría SEO', 'Rúbrica Estrategia de Contenidos', 'Evaluación Link Building'],
    },
    modules: [
      {
        id: 'm3-1', title: 'SEO Técnico Avanzado 2026', description: 'Auditorías, Core Web Vitals, JavaScript SEO y arquitectura web.',
        isFreePreview: true,
        learningObjectives: ['Dominar Screaming Frog y Ahrefs', 'Optimizar Core Web Vitals', 'Implementar datos estructurados'],
        lessons: [
          { id: 'l3-1-1', title: 'Auditoría SEO Técnica: Metodología Completa', type: 'video', duration: 50, isFreePreview: true },
          { id: 'l3-1-2', title: 'Core Web Vitals: LCP, FID, CLS en profundidad', type: 'video', duration: 40 },
          { id: 'l3-1-3', title: 'JavaScript SEO: Renderizado y crawlability', type: 'text', duration: 35 },
          { id: 'l3-1-4', title: 'Datos Estructurados y Schema.org', type: 'video', duration: 45 },
          { id: 'l3-1-5', title: 'Ejercicio: Audita tu sitio web con Screaming Frog', type: 'exercise', duration: 60 },
          { id: 'l3-1-6', title: 'Quiz: SEO Técnico', type: 'quiz', duration: 15 },
        ],
      },
      {
        id: 'm3-2', title: 'AEO: Answer Engine Optimization', description: 'Posiciónate en respuestas de IA y featured snippets.',
        learningObjectives: ['Entender SGE de Google', 'Crear contenido para featured snippets', 'Optimizar para búsquedas de voz'],
        lessons: [
          { id: 'l3-2-1', title: 'SGE (Search Generative Experience): El nuevo SEO', type: 'video', duration: 45 },
          { id: 'l3-2-2', title: 'Featured Snippets: Estrategia de conquista', type: 'video', duration: 35 },
          { id: 'l3-2-3', title: 'Voice Search Optimization para LATAM', type: 'audio', duration: 30 },
          { id: 'l3-2-4', title: 'Proyecto: Estrategia AEO para nicho real', type: 'exercise', duration: 90 },
        ],
      },
      {
        id: 'm3-3', title: 'Link Building Ético y Digital PR', description: 'Construye autoridad de dominio con estrategias éticas.',
        learningObjectives: ['Crear campañas de digital PR', 'Ejecutar outreach efectivo', 'Medir autoridad de dominio'],
        lessons: [
          { id: 'l3-3-1', title: 'Link Building 2026: Estrategias éticas que funcionan', type: 'video', duration: 50 },
          { id: 'l3-3-2', title: 'Digital PR: Cómo conseguir menciones en medios', type: 'video', duration: 40 },
          { id: 'l3-3-3', title: 'Podcast: Secretos del Link Building con expertos', type: 'audio', duration: 35 },
          { id: 'l3-3-4', title: 'Proyecto Final: Campaña de Link Building Real', type: 'exercise', duration: 120 },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q3-1', title: 'Evaluación Final — SEO y AEO Avanzado', passingScore: 70,
        questions: [
          { id: 'qq3-1', question: '¿Qué métrica de Core Web Vitals mide la estabilidad visual?', options: ['LCP', 'FID', 'CLS', 'TTFB'], correct: 2, explanation: 'CLS (Cumulative Layout Shift) mide la estabilidad visual de la página.' },
          { id: 'qq3-2', question: '¿Qué es AEO?', options: ['Advertising Engine Optimization', 'Answer Engine Optimization', 'Automated Email Outreach', 'Advanced E-commerce Operations'], correct: 1, explanation: 'AEO optimiza contenido para motores de respuesta como SGE de Google.' },
          { id: 'qq3-3', question: '¿Cuál es el factor más importante para conseguir un featured snippet?', options: ['Backlinks de alta autoridad', 'Contenido estructurado que responda preguntas directamente', 'Velocidad de carga del sitio', 'Edad del dominio'], correct: 1, explanation: 'Google selecciona contenido que responde preguntas de forma directa y estructurada.' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // CURSO 4 — Máster en Community Management (100 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c4',
    slug: 'master-community-management',
    title: 'Máster en Community Management NextGen 2.0',
    subtitle: 'Gestión de Comunidades Digitales para el Ecosistema LATAM',
    description: 'Formación integral en gestión de comunidades digitales: storytelling, brand strategy, crisis management, social listening y engagement strategy con 10 módulos OBE.',
    level: 'Máster',
    category: 'Comunicación Digital',
    hours: 100,
    priceMXN: 16800,
    priceUSD: 840,
    stripePriceId: 'price_master_cm',
    instructorName: 'RENATA JAZMIN',
    instructorTitle: 'CEO Fundadora de ORBITA DIGITAL',
    instructorBio: 'Pionera en Community Management para mercados latinoamericanos a gran escala.',
    thumbnail: '',
    isFeatured: true,
    learningOutcomes: [
      'Diseñar estrategias integrales de gestión de comunidades',
      'Implementar social listening y sentiment analysis',
      'Gestionar crisis de reputación digital en tiempo real',
      'Crear sistemas de contenido automatizados con IA',
      'Liderar equipos de community management de alto rendimiento',
    ],
    prerequisites: ['Marketing Digital 360° o experiencia equivalente', 'Experiencia básica en redes sociales profesionales'],
    obeFramework: {
      competencies: ['Community Strategy', 'Brand Storytelling', 'Crisis Management', 'Social Listening', 'Team Leadership'],
      evidences: ['Plan estratégico de comunidad para marca real', 'Protocolo de crisis implementado', 'Dashboard de social listening activo'],
      rubrics: ['Rúbrica Strategy', 'Rúbrica Crisis Protocol', 'Rúbrica Leadership'],
    },
    modules: [
      {
        id: 'm4-1', title: 'Fundamentos del Community Management NextGen', description: 'El nuevo paradigma de gestión de comunidades.',
        isFreePreview: true,
        learningObjectives: ['Definir el rol del CM en 2026', 'Mapear ecosistemas de comunidad', 'Establecer KPIs medibles'],
        lessons: [
          { id: 'l4-1-1', title: 'El Community Manager NextGen: Rol y responsabilidades 2026', type: 'video', duration: 35, isFreePreview: true },
          { id: 'l4-1-2', title: 'Ecosistemas de Comunidad: Mapeo y arquitectura', type: 'video', duration: 40 },
          { id: 'l4-1-3', title: 'KPIs de Comunidad: Métricas que importan', type: 'text', duration: 30 },
          { id: 'l4-1-4', title: 'Podcast: Historias de CMs exitosos en LATAM', type: 'audio', duration: 25 },
          { id: 'l4-1-5', title: 'Ejercicio: Mapea tu comunidad actual', type: 'exercise', duration: 45 },
        ],
      },
      {
        id: 'm4-2', title: 'Brand Storytelling y Narrativa Digital', description: 'Crea historias que conecten con tu audiencia.',
        learningObjectives: ['Desarrollar narrativas de marca', 'Crear arcos narrativos', 'Producir contenido storytelling multimedia'],
        lessons: [
          { id: 'l4-2-1', title: 'Storytelling de Marca: Frameworks y arquetipos', type: 'video', duration: 50 },
          { id: 'l4-2-2', title: 'Narrativa transmedia para comunidades', type: 'video', duration: 40 },
          { id: 'l4-2-3', title: 'User-Generated Content: Guía completa', type: 'text', duration: 35 },
          { id: 'l4-2-4', title: 'Proyecto: Campaña storytelling para marca real', type: 'exercise', duration: 90 },
        ],
      },
      {
        id: 'm4-3', title: 'Crisis Management y Social Listening', description: 'Gestiona crisis digitales y monitorea conversaciones.',
        learningObjectives: ['Crear protocolos de crisis', 'Implementar social listening', 'Responder en tiempo real'],
        lessons: [
          { id: 'l4-3-1', title: 'Crisis de Reputación Digital: Protocolos de respuesta', type: 'video', duration: 45 },
          { id: 'l4-3-2', title: 'Social Listening con Brandwatch y Mention', type: 'video', duration: 40 },
          { id: 'l4-3-3', title: 'Sentiment Analysis con IA: Herramientas y metodología', type: 'video', duration: 35 },
          { id: 'l4-3-4', title: 'Simulacro: Crisis de marca en tiempo real', type: 'exercise', duration: 120 },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q4-1', title: 'Evaluación Final — Máster CM NextGen', passingScore: 75,
        questions: [
          { id: 'qq4-1', question: '¿Cuál es el primer paso en un protocolo de crisis digital?', options: ['Publicar un comunicado', 'Identificar y escalar internamente', 'Borrar el contenido problemático', 'Contactar a medios'], correct: 1, explanation: 'La identificación y escalamiento interno es siempre el primer paso antes de cualquier comunicación pública.' },
          { id: 'qq4-2', question: '¿Qué herramienta se usa para social listening profesional?', options: ['Google Analytics', 'Brandwatch', 'Mailchimp', 'Canva'], correct: 1, explanation: 'Brandwatch es una plataforma líder para monitoreo de conversaciones y sentiment analysis.' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // CURSO 5 — E-Commerce y Marketplaces (120 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c5',
    slug: 'diplomado-ecommerce',
    title: 'Diplomado en E-Commerce y Marketplaces',
    subtitle: 'Shopify, Amazon FBA, Mercado Libre y TikTok Shop',
    description: 'Aprende a vender en los principales marketplaces con estrategias probadas. Shopify, Amazon FBA, Mercado Libre, TikTok Shop y más.',
    level: 'Diplomado',
    category: 'E-Commerce',
    hours: 120,
    priceMXN: 19500,
    priceUSD: 975,
    stripePriceId: 'price_ecommerce',
    instructorName: 'Edwin Oswaldo Castillo Trejo',
    instructorTitle: 'CEO Fundador TAMV ONLINE',
    instructorBio: 'Arquitecto de ecosistemas de e-commerce transatlánticos.',
    thumbnail: '',
    isFeatured: false,
    learningOutcomes: [
      'Crear y gestionar tiendas en Shopify con conversiones optimizadas',
      'Operar como seller en Amazon FBA México y USA',
      'Dominar Mercado Libre con estrategia de posicionamiento',
      'Implementar TikTok Shop como canal de ventas',
    ],
    prerequisites: ['Conocimientos básicos de marketing digital', 'Capital mínimo para inventario de práctica'],
    obeFramework: {
      competencies: ['E-Commerce Strategy', 'Marketplace Operations', 'Logistics', 'Conversion Optimization'],
      evidences: ['Tienda Shopify funcional', 'Listado en Amazon FBA', 'Estrategia de marketplace documentada'],
      rubrics: ['Rúbrica E-Commerce', 'Rúbrica Marketplace', 'Evaluación de Conversiones'],
    },
    modules: [
      {
        id: 'm5-1', title: 'Shopify: De cero a tienda rentable', description: 'Construye tu tienda online profesional.',
        isFreePreview: true,
        learningObjectives: ['Configurar Shopify', 'Optimizar conversiones', 'Integrar pasarelas de pago LATAM'],
        lessons: [
          { id: 'l5-1-1', title: 'Shopify 2026: Setup completo paso a paso', type: 'video', duration: 60, isFreePreview: true },
          { id: 'l5-1-2', title: 'Diseño de tienda: UX y CRO', type: 'video', duration: 45 },
          { id: 'l5-1-3', title: 'Pasarelas de pago LATAM: Stripe, MercadoPago, Conekta', type: 'text', duration: 30 },
          { id: 'l5-1-4', title: 'Taller: Construye tu tienda en 2 horas', type: 'exercise', duration: 120 },
        ],
      },
      {
        id: 'm5-2', title: 'Amazon FBA: Seller profesional', description: 'Opera como vendedor profesional en Amazon.',
        learningObjectives: ['Abrir cuenta seller', 'Sourcing de productos', 'Logística FBA'],
        lessons: [
          { id: 'l5-2-1', title: 'Amazon FBA: Guía completa del seller profesional', type: 'video', duration: 55 },
          { id: 'l5-2-2', title: 'Product Research: Encuentra productos ganadores', type: 'video', duration: 45 },
          { id: 'l5-2-3', title: 'Logística FBA: Envíos, almacenamiento y devoluciones', type: 'video', duration: 40 },
          { id: 'l5-2-4', title: 'PPC en Amazon: Campañas de publicidad', type: 'video', duration: 50 },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q5-1', title: 'Evaluación — E-Commerce', passingScore: 70,
        questions: [
          { id: 'qq5-1', question: '¿Qué significa FBA en Amazon?', options: ['Free Business Account', 'Fulfillment by Amazon', 'Fast Buy Advantage', 'Federal Business Association'], correct: 1, explanation: 'FBA significa Fulfillment by Amazon — Amazon se encarga del almacenaje, empaque y envío.' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // CURSO 6 — Licenciatura en Marketing Digital (150 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c6',
    slug: 'licenciatura-marketing-digital',
    title: 'Licenciatura en Marketing Digital',
    subtitle: 'Formación integral para líderes del ecosistema digital LATAM',
    description: 'Programa de licenciatura con 150 horas de formación intensiva. Marketing digital, analítica, estrategia, branding, e-commerce e IA aplicada.',
    level: 'Licenciatura',
    category: 'Marketing Digital',
    hours: 150,
    priceMXN: 34200,
    priceUSD: 1710,
    stripePriceId: 'price_licenciatura',
    instructorName: 'Cuerpo Académico UTAMV',
    instructorTitle: 'Equipo Multidisciplinario',
    instructorBio: 'Equipo de expertos en marketing, tecnología e IA con experiencia en mercados LATAM.',
    thumbnail: '',
    isFeatured: false,
    learningOutcomes: [
      'Liderar equipos de marketing digital en empresas medianas y grandes',
      'Diseñar estrategias omnicanal integrales',
      'Implementar sistemas de analítica y toma de decisiones data-driven',
      'Gestionar presupuestos de marketing de 6 cifras con ROI demostrable',
    ],
    prerequisites: ['Bachillerato completo', 'Interés en marketing digital y tecnología'],
    obeFramework: {
      competencies: ['Strategic Marketing', 'Digital Analytics', 'Team Leadership', 'Brand Architecture', 'MarTech'],
      evidences: ['Plan de marketing integral', 'Campaña ejecutada con ROI+', 'Tesis de licenciatura'],
      rubrics: ['Rúbrica Licenciatura OBE', 'Evaluación de Proyecto Terminal', 'Defensa de Tesis'],
    },
    modules: [
      {
        id: 'm6-1', title: 'Fundamentos de Marketing Estratégico', description: 'Bases teóricas y prácticas del marketing moderno.',
        isFreePreview: true,
        learningObjectives: ['Comprender las 4Ps en entornos digitales', 'Analizar mercados con frameworks estratégicos', 'Segmentar audiencias con data'],
        lessons: [
          { id: 'l6-1-1', title: 'Marketing Estratégico: De Kotler al Marketing 5.0', type: 'video', duration: 50, isFreePreview: true },
          { id: 'l6-1-2', title: 'Segmentación y Targeting con Big Data', type: 'video', duration: 45 },
          { id: 'l6-1-3', title: 'Análisis competitivo: Porter, FODA y Blue Ocean', type: 'text', duration: 40 },
          { id: 'l6-1-4', title: 'Podcast: Tendencias del marketing 2026-2030', type: 'audio', duration: 30 },
          { id: 'l6-1-5', title: 'Caso de estudio: Análisis de marca LATAM', type: 'exercise', duration: 90 },
        ],
      },
      {
        id: 'm6-2', title: 'Analítica Digital Avanzada', description: 'Domina GA4, Power BI y SQL para marketing.',
        learningObjectives: ['Configurar GA4 profesionalmente', 'Crear dashboards en Power BI', 'Escribir consultas SQL para marketing'],
        lessons: [
          { id: 'l6-2-1', title: 'GA4: Configuración avanzada y eventos personalizados', type: 'video', duration: 55 },
          { id: 'l6-2-2', title: 'Power BI para Marketing: Dashboards ejecutivos', type: 'video', duration: 60 },
          { id: 'l6-2-3', title: 'SQL para Marketers: Consultas esenciales', type: 'video', duration: 50 },
          { id: 'l6-2-4', title: 'Proyecto: Dashboard de marketing con datos reales', type: 'exercise', duration: 120 },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q6-1', title: 'Evaluación — Licenciatura Marketing Digital', passingScore: 75,
        questions: [
          { id: 'qq6-1', question: '¿Cuál de las "4Ps" se refiere a la estrategia de distribución?', options: ['Producto', 'Precio', 'Plaza', 'Promoción'], correct: 2, explanation: 'Plaza (Place) se refiere a los canales de distribución y la forma en que el producto llega al consumidor.' },
          { id: 'qq6-2', question: '¿Qué modelo estratégico propone crear mercados nuevos en lugar de competir en los existentes?', options: ['Modelo Porter', 'Análisis FODA', 'Blue Ocean Strategy', 'Marketing Mix'], correct: 2, explanation: 'Blue Ocean Strategy propone crear espacios de mercado sin competencia donde la competencia es irrelevante.' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // CURSO 7 — Maestría en IA y Transformación de Negocios (150 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c7',
    slug: 'maestria-ia-negocios',
    title: 'Maestría en IA y Transformación de Negocios',
    subtitle: 'Liderazgo estratégico con IA para la transformación empresarial',
    description: 'Posgrado avanzado en inteligencia artificial aplicada a la estrategia empresarial. Machine Learning, NLP, Computer Vision, ética en IA y gobernanza tecnológica.',
    level: 'Maestría',
    category: 'Inteligencia Artificial',
    hours: 150,
    priceMXN: 42000,
    priceUSD: 2100,
    stripePriceId: 'price_maestria_ia',
    instructorName: 'Cuerpo Académico UTAMV',
    instructorTitle: 'Investigadores en IA y Negocios',
    instructorBio: 'Investigadores y profesionales líderes en IA aplicada a negocios.',
    thumbnail: '',
    isFeatured: false,
    learningOutcomes: [
      'Diseñar estrategias de transformación digital con IA',
      'Implementar soluciones de Machine Learning en procesos de negocio',
      'Liderar proyectos de IA con gobernanza ética y transparencia',
      'Evaluar y seleccionar tecnologías de IA para diferentes industrias',
    ],
    prerequisites: ['Licenciatura completa o experiencia profesional equivalente', 'Conocimientos básicos de programación (Python recomendado)'],
    obeFramework: {
      competencies: ['AI Strategy', 'ML Implementation', 'AI Governance', 'Digital Transformation', 'Research'],
      evidences: ['Estrategia de transformación con IA para empresa real', 'Modelo ML implementado', 'Tesis de maestría'],
      rubrics: ['Rúbrica Maestría OBE', 'Evaluación de Investigación', 'Defensa de Tesis'],
    },
    modules: [
      {
        id: 'm7-1', title: 'Fundamentos de IA para Líderes de Negocio', description: 'Comprende la IA desde la perspectiva estratégica empresarial.',
        isFreePreview: true,
        learningObjectives: ['Evaluar oportunidades de IA en negocios', 'Comprender ML, NLP y Computer Vision', 'Diseñar roadmaps de transformación'],
        lessons: [
          { id: 'l7-1-1', title: 'IA para CEOs: Qué necesitas saber en 2026', type: 'video', duration: 45, isFreePreview: true },
          { id: 'l7-1-2', title: 'Machine Learning Explicado: Sin código, con estrategia', type: 'video', duration: 50 },
          { id: 'l7-1-3', title: 'NLP y Procesamiento de Lenguaje Natural en negocios', type: 'video', duration: 40 },
          { id: 'l7-1-4', title: 'Computer Vision: Aplicaciones empresariales', type: 'text', duration: 35 },
          { id: 'l7-1-5', title: 'Audio: Principios de Gobernanza de IA UTAMV 2026', type: 'audio', duration: 25 },
        ],
      },
      {
        id: 'm7-2', title: 'Transformación Digital con IA', description: 'Implementa IA en procesos empresariales reales.',
        learningObjectives: ['Crear roadmaps de transformación', 'Medir ROI de proyectos de IA', 'Gestionar cambio organizacional con IA'],
        lessons: [
          { id: 'l7-2-1', title: 'Roadmap de Transformación Digital con IA', type: 'video', duration: 55 },
          { id: 'l7-2-2', title: 'ROI de IA: Cómo medir el retorno de inversión', type: 'video', duration: 40 },
          { id: 'l7-2-3', title: 'Change Management: Adopción de IA en organizaciones', type: 'video', duration: 45 },
          { id: 'l7-2-4', title: 'Caso de estudio: Transformación digital en LATAM', type: 'exercise', duration: 90 },
        ],
      },
      {
        id: 'm7-3', title: 'Ética, Gobernanza y Futuro de la IA', description: 'Lidera con responsabilidad en la era de la IA.',
        learningObjectives: ['Implementar gobernanza de IA', 'Evaluar riesgos éticos', 'Diseñar políticas de IA corporativas'],
        lessons: [
          { id: 'l7-3-1', title: 'Ética en IA: Frameworks internacionales y UTAMV 2026', type: 'video', duration: 50 },
          { id: 'l7-3-2', title: 'Gobernanza de IA Corporativa: Guía práctica', type: 'video', duration: 45 },
          { id: 'l7-3-3', title: 'Regulación de IA en LATAM: Panorama legal 2026', type: 'text', duration: 35 },
          { id: 'l7-3-4', title: 'Tesis: Estrategia de IA para empresa real', type: 'exercise', duration: 240 },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q7-1', title: 'Evaluación Final — Maestría IA y Negocios', passingScore: 80,
        questions: [
          { id: 'qq7-1', question: '¿Cuál es el primer paso para implementar IA en una organización?', options: ['Comprar herramientas de IA', 'Evaluar la madurez digital y definir casos de uso prioritarios', 'Contratar un equipo de data scientists', 'Recopilar la mayor cantidad de datos posible'], correct: 1, explanation: 'Antes de implementar IA, es esencial evaluar la madurez digital de la organización e identificar casos de uso con mayor impacto potencial.' },
          { id: 'qq7-2', question: '¿Qué principio de los "Principios Inmutables UTAMV 2026" prohíbe que la IA sustituya docentes?', options: ['Veracidad Académica', 'No Simulación', 'No Sustitución Humana', 'Integridad Académica'], correct: 2, explanation: 'El Principio de No Sustitución Humana establece que la IA no sustituye docentes, evaluadores ni autoridades académicas.' },
        ],
      },
    ],
  },
  // ============================================================
  // DIPLOMADO 8 — Diseño de Ecosistemas Digitales (160 h)
  // ============================================================
  {
    id: 'course-8',
    slug: 'diplomado-ecosistemas-digitales',
    title: 'Diplomado en Diseño de Ecosistemas Digitales',
    subtitle: 'Plataformas, comunidades, APIs y gobernanza para emprendedores y arquitectos digitales',
    description: 'Diseña, prototipa y escala ecosistemas digitales completos: estrategia, arquitectura, productos multi-actor, comunidades y operación con métricas. 5 módulos · 40 lecciones · examen por módulo · proyecto integrador.',
    level: 'Diplomado',
    category: 'Estrategia Digital',
    hours: 160,
    priceMXN: 18900,
    priceUSD: 1099,
    stripePriceId: '',
    isFeatured: true,
    instructorName: 'Dr. Eduardo Salgado Ramírez',
    instructorTitle: 'Arquitecto de Plataformas Digitales',
    instructorBio: 'Ex-CTO de marketplace LATAM con 15 años diseñando ecosistemas multi-actor.',
    thumbnail: '',
    learningOutcomes: [
      'Diseñar mapas de sistema y estrategia de ecosistemas multi-actor',
      'Definir arquitectura técnica escalable con APIs y microservicios',
      'Construir prototipos funcionales para múltiples tipos de usuario',
      'Diseñar comunidades con incentivos, gobernanza y moderación',
      'Operar y escalar con KPIs, dashboards y modelos de monetización ética',
    ],
    prerequisites: ['Conocimientos básicos de tecnología digital', 'Experiencia en proyectos digitales (deseable)'],
    obeFramework: {
      competencies: ['Estrategia ecosistémica', 'Arquitectura escalable', 'Gobernanza comunitaria', 'Operación data-driven'],
      evidences: ['Mapa de sistema', 'API contract', 'Prototipo funcional', 'Dashboard KPI', 'Pitch deck final'],
      rubrics: ['Visión estratégica 25%', 'Calidad técnica 25%', 'Comunidad 15%', 'Validación 15%', 'Defensa 20%'],
    },
    modules: [
      {
        id: 'm8-1', title: 'Módulo 1 — Fundamentos y Estrategia', description: 'Define propósito, actores y estrategia del ecosistema con pensamiento sistémico, OKRs y matriz de stakeholders.',
        learningObjectives: ['Definir propósito y actores de un ecosistema', 'Aplicar pensamiento sistémico', 'Establecer estrategia y OKRs'],
        lessons: [
          { id: 'l8-1-1', title: 'Introducción a los ecosistemas digitales', type: 'video', duration: 12 },
          { id: 'l8-1-2', title: 'Pensamiento sistémico aplicado', type: 'video', duration: 14 },
          { id: 'l8-1-3', title: 'Modelos de valor y proposición multilateral', type: 'video', duration: 10 },
          { id: 'l8-1-4', title: 'Estrategia de plataforma vs producto', type: 'video', duration: 12 },
          { id: 'l8-1-5', title: 'Stakeholders, roles y matriz RACI', type: 'exercise', duration: 60 },
          { id: 'l8-1-6', title: 'Análisis competitivo ecosistémico', type: 'exercise', duration: 75 },
          { id: 'l8-1-7', title: 'Roadmap estratégico y OKRs trimestrales', type: 'exercise', duration: 90 },
          { id: 'l8-1-8', title: 'Audio: ¿Qué problema resuelve tu ecosistema?', type: 'audio', duration: 8 },
        ],
      },
      {
        id: 'm8-2', title: 'Módulo 2 — Arquitectura de Ecosistemas', description: 'Diseña arquitectura modular, contratos de API, gobernanza de datos, seguridad STRIDE y observabilidad SRE.',
        learningObjectives: ['Diseñar arquitectura técnica modular', 'Definir contratos de API', 'Aplicar gobernanza de datos y seguridad'],
        lessons: [
          { id: 'l8-2-1', title: 'Principios de arquitectura: modularidad y resiliencia', type: 'video', duration: 15 },
          { id: 'l8-2-2', title: 'Patrones de integración y APIs', type: 'video', duration: 14 },
          { id: 'l8-2-3', title: 'Microservicios y orquestación', type: 'video', duration: 16 },
          { id: 'l8-2-4', title: 'Plataformas y gobernanza de datos', type: 'video', duration: 12 },
          { id: 'l8-2-5', title: 'Seguridad: STRIDE, autenticación y cifrado', type: 'exercise', duration: 90 },
          { id: 'l8-2-6', title: 'Infraestructura cloud y costos operativos', type: 'exercise', duration: 75 },
          { id: 'l8-2-7', title: 'Interoperabilidad: protocolos y estándares', type: 'text', duration: 30 },
          { id: 'l8-2-8', title: 'Pruebas, observabilidad y SRE (SLI/SLO)', type: 'exercise', duration: 90 },
        ],
      },
      {
        id: 'm8-3', title: 'Módulo 3 — Plataformas y Productos', description: 'Construye productos multi-actor, MVP ecosistémico, APIs y monetización validada con experimentación A/B.',
        learningObjectives: ['Diseñar productos multi-actor', 'Construir MVP ecosistémico', 'Validar con experimentos'],
        lessons: [
          { id: 'l8-3-1', title: 'Diseño de productos para múltiples actores', type: 'video', duration: 13 },
          { id: 'l8-3-2', title: 'MVP ecosistémico y métricas de validación', type: 'video', duration: 12 },
          { id: 'l8-3-3', title: 'APIs y contratos: enfoque API-first', type: 'video', duration: 14 },
          { id: 'l8-3-4', title: 'UX para plataformas y comunidades', type: 'video', duration: 13 },
          { id: 'l8-3-5', title: 'Modelos de monetización comparados', type: 'exercise', duration: 75 },
          { id: 'l8-3-6', title: 'Integración de terceros: SDK y marketplace', type: 'exercise', duration: 90 },
          { id: 'l8-3-7', title: 'Testing y experimentación A/B', type: 'exercise', duration: 75 },
          { id: 'l8-3-8', title: 'Ciclo de vida del producto y releases', type: 'text', duration: 30 },
        ],
      },
      {
        id: 'm8-4', title: 'Módulo 4 — Comunidades y Gobernanza', description: 'Diseña incentivos, moderación escalable, crecimiento orgánico, métricas de salud y gestión de crisis comunitaria.',
        learningObjectives: ['Diseñar dinámicas e incentivos comunitarios', 'Construir políticas de moderación', 'Medir salud comunitaria'],
        lessons: [
          { id: 'l8-4-1', title: 'Dinámicas de comunidades digitales', type: 'video', duration: 11 },
          { id: 'l8-4-2', title: 'Incentivos y economía de la participación', type: 'video', duration: 12 },
          { id: 'l8-4-3', title: 'Moderación y políticas escalables', type: 'video', duration: 13 },
          { id: 'l8-4-4', title: 'Estrategias de crecimiento orgánico', type: 'video', duration: 12 },
          { id: 'l8-4-5', title: 'Alianzas estratégicas y partnerships', type: 'exercise', duration: 60 },
          { id: 'l8-4-6', title: 'Métricas de salud: DAU/MAU, churn, NPS', type: 'exercise', duration: 75 },
          { id: 'l8-4-7', title: 'Gestión de crisis reputacional', type: 'exercise', duration: 90 },
          { id: 'l8-4-8', title: 'Aspectos legales: TOS, PI y licencias', type: 'text', duration: 30 },
        ],
      },
      {
        id: 'm8-5', title: 'Módulo 5 — Operación, Métricas y Escalamiento', description: 'Opera con KPIs, dashboards, decisiones data-driven, automatización CI/CD, ESG y due diligence para inversión.',
        learningObjectives: ['Definir KPIs y dashboards', 'Tomar decisiones data-driven', 'Escalar técnica y organizacionalmente'],
        lessons: [
          { id: 'l8-5-1', title: 'KPIs y métricas de ecosistemas', type: 'video', duration: 13 },
          { id: 'l8-5-2', title: 'Toma de decisiones data-driven', type: 'video', duration: 12 },
          { id: 'l8-5-3', title: 'Monetización avanzada y elasticidad', type: 'video', duration: 14 },
          { id: 'l8-5-4', title: 'Escalamiento técnico y organizacional', type: 'video', duration: 13 },
          { id: 'l8-5-5', title: 'Automatización: pipeline CI/CD', type: 'exercise', duration: 90 },
          { id: 'l8-5-6', title: 'Sostenibilidad e impacto ESG', type: 'exercise', duration: 60 },
          { id: 'l8-5-7', title: 'Preparación para inversión: due diligence', type: 'exercise', duration: 90 },
          { id: 'l8-5-8', title: 'Proyecto integrador: pitch deck y demo', type: 'exercise', duration: 240 },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q8-1', title: 'Examen Final — Diplomado Ecosistemas Digitales', passingScore: 70,
        questions: [
          { id: 'qq8-1', question: '¿Cuál es la diferencia clave entre una plataforma y un producto?', options: ['La plataforma siempre es gratuita', 'La plataforma facilita interacciones entre múltiples actores; el producto satisface un único usuario', 'La plataforma no necesita APIs', 'Ninguna de las anteriores'], correct: 1, explanation: 'Una plataforma orquesta valor entre múltiples actores; un producto resuelve una necesidad puntual.' },
          { id: 'qq8-2', question: '¿Cuál es la ventaja principal de un diseño API-first?', options: ['Reduce documentación', 'Facilita la integración y desacopla equipos', 'Elimina pruebas', 'Aumenta costos'], correct: 1, explanation: 'API-first permite que equipos trabajen en paralelo contra contratos estables.' },
          { id: 'qq8-3', question: 'En un funnel con 10,000 usuarios y conversiones 5%→20%→50%, ¿cuántos llegan al final?', options: ['50', '100', '500', '250'], correct: 0, explanation: '10000 × 0.05 × 0.20 × 0.50 = 50 usuarios.' },
        ],
      },
    ],
  },
];

