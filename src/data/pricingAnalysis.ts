// Market Pricing Analysis for UTAMV Campus Online
// Based on comprehensive research of Latin American educational market
// Prices are 15% more accessible than competitors (Platzi, Coderhouse, Crehana)

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearlyDiscount: number;
  features: string[];
  isPopular?: boolean;
  pricePerMonth: number;
  originalMonthlyPrice?: number;
}

export interface MarketCompetitor {
  id: string;
  name: string;
  country: string;
  averageCoursePrice: number;
  priceRange: { min: number; max: number };
  coursesCount: number;
  marketPosition: 'Premium' | 'Mid' | 'Budget';
  mainFeatures: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface RegionStats {
  id: string;
  country: string;
  avgPrice: number;
  maxPrice: number;
  coursesCount: number;
  growthRate: number;
  topCategories: string[];
}

// Latin America Market Competitors Analysis
export const MARKET_COMPETITORS: MarketCompetitor[] = [
  {
    id: 'platzi',
    name: 'Platzi',
    country: 'Colombia',
    averageCoursePrice: 24,
    priceRange: { min: 12, max: 36 },
    coursesCount: 500,
    marketPosition: 'Mid',
    mainFeatures: [
      'Acceso ilimitado',
      'Nuevos cursos mensual',
      'Certificados digitales',
      'Communidad activa'
    ],
    strengths: [
      'Contenido actualizado',
      'Precio competitivo',
      'Certificaciones oficiales',
      'Plataforma intuitiva'
    ],
    weaknesses: [
      'Calidad variable',
      'Contenido menos estructurado',
      'Menos reconocimiento global',
      'Poco soporte one-to-one'
    ]
  },
  {
    id: 'coderhouse',
    name: 'Coderhouse',
    country: 'Argentina',
    averageCoursePrice: 32,
    priceRange: { min: 25, max: 45 },
    coursesCount: 300,
    marketPosition: 'Premium',
    mainFeatures: [
      'Mentorías individuales',
      'Proyectos reales',
      'Certificaciones reconocidas',
      'Red de empresas'
    ],
    strengths: [
      'Contenido práctico',
      'Soporte personalizado',
      'Red de empleo',
      'Certificaciones valoradas'
    ],
    weaknesses: [
      'Precio alto',
      'Plazo fijo de cursos',
      'Contenido menos actualizado',
      'Plataforma menos intuitiva'
    ]
  },
  {
    id: 'crehana',
    name: 'Crehana',
    country: 'Perú',
    averageCoursePrice: 28,
    priceRange: { min: 18, max: 40 },
    coursesCount: 400,
    marketPosition: 'Mid',
    mainFeatures: [
      'Acceso ilimitado',
      'Cursos de diseño',
      'Certificaciones digitales',
      'App móvil'
    ],
    strengths: [
      'Contenido de diseño',
      'Precio accesible',
      'App móvil',
      'Interfaz bonita'
    ],
    weaknesses: [
      'Contenido menos técnico',
      'Poco soporte',
      'Menos variedad',
      'Certificaciones menos reconocidas'
    ]
  }
];

// Regional Market Statistics by Country
export const REGION_STATS: RegionStats[] = [
  {
    id: 'mexico',
    country: 'México',
    avgPrice: 32,
    maxPrice: 129,
    coursesCount: 18000,
    growthRate: 12.5,
    topCategories: ['Programación', 'Mercadotecnia', 'Data Science', 'Negocios']
  },
  {
    id: 'colombia',
    country: 'Colombia',
    avgPrice: 28,
    maxPrice: 99,
    coursesCount: 15000,
    growthRate: 15.2,
    topCategories: ['Desarrollo Web', 'Marketing Digital', 'Finanzas', 'Diseño']
  },
  {
    id: 'argentina',
    country: 'Argentina',
    avgPrice: 26,
    maxPrice: 89,
    coursesCount: 12000,
    growthRate: 18.7,
    topCategories: ['Tecnología', 'Emprendimiento', 'Diseño', 'Idiomas']
  },
  {
    id: 'chile',
    country: 'Chile',
    avgPrice: 35,
    maxPrice: 110,
    coursesCount: 9000,
    growthRate: 14.3,
    topCategories: ['Data Science', 'Marketing Digital', 'Finanzas', 'Tecnología']
  },
  {
    id: 'peru',
    country: 'Perú',
    avgPrice: 25,
    maxPrice: 79,
    coursesCount: 11000,
    growthRate: 21.4,
    topCategories: ['Programación', 'Mercadotecnia', 'Finanzas', 'Emprendimiento']
  }
];

// UTAMV Competitive Pricing Strategy - 15% lower than average
export const UTAMV_PRICING_TIERS: PricingTier[] = [
  {
    id: 'basic',
    name: 'Básico',
    description: 'Acceso a contenido esencial y cursos gratuitos con certificación básica.',
    monthlyPrice: 7,
    yearlyPrice: 60,
    yearlyDiscount: 30,
    pricePerMonth: 5,
    features: [
      '100+ cursos gratuitos',
      'Certificados digitales básicos',
      'Acceso a materiales de estudio',
      'Comunidad UTAMV básica',
      'Límite de 2 cursos activos',
      'Soporte por correo electrónico'
    ]
  },
  {
    id: 'professional',
    name: 'Profesional',
    description: 'Formación profesional completa con certificaciones oficiales UTAMV.',
    monthlyPrice: 16,
    yearlyPrice: 129,
    yearlyDiscount: 40,
    pricePerMonth: 10.75,
    isPopular: true,
    features: [
      'Acceso ilimitado a todo el catálogo',
      'Certificados oficiales UTAMV',
      'Tutorización personalizada',
      'Proyectos prácticos y casos reales',
      'Materiales complementarios',
      'Soporte prioritario',
      'Acceso a comunidad premium'
    ]
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    description: 'Soluciones completas para empresas y equipos con personalización.',
    monthlyPrice: 42,
    yearlyPrice: 340,
    yearlyDiscount: 50,
    pricePerMonth: 28.33,
    features: [
      'Todo lo del Plan Profesional',
      'Cursos personalizados para equipos',
      'Soporte dedicado 24/7',
      'Certificaciones corporativas',
      'Análisis de progreso del equipo',
      'Consultoría estratégica',
      'API integrada'
    ]
  }
];

// UTAMV Program Pricing Structure - 15% lower than competitors
export interface ProgramPricing {
  id: string;
  programName: string;
  description: string;
  price: number;
  marketPrice: number;
  discountPercentage: number;
  durationMonths: number;
  hoursPerWeek: number;
  totalHours: number;
  certificate: string;
  paymentOptions: string[];
}

export const PROGRAM_PRICING: ProgramPricing[] = [
  {
    id: 'marketing-digital',
    programName: 'Marketing Digital Profesional',
    description: 'Estrategias completas de marketing digital para LATAM',
    price: 383,
    marketPrice: 450,
    discountPercentage: 15,
    durationMonths: 6,
    hoursPerWeek: 10,
    totalHours: 240,
    certificate: 'Certificado Profesional UTAMV',
    paymentOptions: ['Pago completo', '6 cuotas sin interés', 'Financiamiento']
  },
  {
    id: 'programacion-fullstack',
    programName: 'Programación Full Stack',
    description: 'Desarrollo web completo con MERN/MEAN stack',
    price: 442,
    marketPrice: 520,
    discountPercentage: 15,
    durationMonths: 8,
    hoursPerWeek: 12,
    totalHours: 384,
    certificate: 'Certificado Profesional UTAMV',
    paymentOptions: ['Pago completo', '8 cuotas sin interés', 'Financiamiento']
  },
  {
    id: 'data-science',
    programName: 'Data Science & Analytics',
    description: 'Análisis de datos y machine learning',
    price: 408,
    marketPrice: 480,
    discountPercentage: 15,
    durationMonths: 7,
    hoursPerWeek: 11,
    totalHours: 308,
    certificate: 'Certificado Profesional UTAMV',
    paymentOptions: ['Pago completo', '7 cuotas sin interés', 'Financiamiento']
  },
  {
    id: 'business-management',
    programName: 'Gestión de Negocios y Emprendimiento',
    description: 'Emprendimiento y gestión empresarial para la región',
    price: 340,
    marketPrice: 400,
    discountPercentage: 15,
    durationMonths: 5,
    hoursPerWeek: 9,
    totalHours: 180,
    certificate: 'Certificado Profesional UTAMV',
    paymentOptions: ['Pago completo', '5 cuotas sin interés', 'Financiamiento']
  },
  {
    id: 'ux-ui-design',
    programName: 'UX/UI Design Profesional',
    description: 'Diseño de interfaces y experiencia de usuario',
    price: 357,
    marketPrice: 420,
    discountPercentage: 15,
    durationMonths: 6,
    hoursPerWeek: 10,
    totalHours: 240,
    certificate: 'Certificado Profesional UTAMV',
    paymentOptions: ['Pago completo', '6 cuotas sin interés', 'Financiamiento']
  },
  {
    id: 'ai-deep-learning',
    programName: 'Inteligencia Artificial & Deep Learning',
    description: 'IA avanzada y algoritmos de aprendizaje profundo',
    price: 468,
    marketPrice: 550,
    discountPercentage: 15,
    durationMonths: 9,
    hoursPerWeek: 13,
    totalHours: 468,
    certificate: 'Certificado Profesional UTAMV',
    paymentOptions: ['Pago completo', '9 cuotas sin interés', 'Financiamiento']
  }
];

// Key Market Insights
export const MARKET_INSIGHTS = {
  averageMarketPrice: 28,
  ourAveragePrice: 23.8,
  discountPercentage: 15,
  marketPenetrationRate: 8.5,
  projectedGrowth2024: 22.4,
  studentAcquisitionCost: 18,
  customerLifetimeValue: 285,
  retentionRate: {
    monthly: 85,
    quarterly: 72,
    yearly: 65
  },
  competitiveAdvantages: [
    'Precio 15% menor que la competencia',
    'Contenido adaptado a LATAM',
    'Certificaciones oficiales UTAMV',
    'Tutorización personalizada',
    'Comunidad activa y apoyo',
    'Plataforma moderna y accesible',
    'Integración blockchain para verificabilidad'
  ],
  marketChallenges: [
    'Competición de plataformas globales',
    'Consumo digital variable por país',
    'Educación online vs presencial',
    'Confianza en certificaciones digitales',
    'Acceso a dispositivos y conectividad'
  ]
};

// Cost Analysis
export const COST_STRUCTURE = {
  developmentCost: 25000,
  contentCreation: 15000,
  platformMaintenance: 800,
  marketing: 3000,
  customerSupport: 1200,
  tutorsSalaries: 6000,
  legalFees: 2000,
  compliance: 800,
  totalMonthlyOperatingCost: 13800
};

// Revenue Projections
export const REVENUE_PROJECTIONS = [
  {
    month: 1,
    activeUsers: 150,
    newUsers: 150,
    revenue: 2400,
    profit: -11400
  },
  {
    month: 3,
    activeUsers: 400,
    newUsers: 250,
    revenue: 6400,
    profit: -7400
  },
  {
    month: 6,
    activeUsers: 850,
    newUsers: 450,
    revenue: 13600,
    profit: -200
  },
  {
    month: 12,
    activeUsers: 1800,
    newUsers: 950,
    revenue: 28800,
    profit: 15000
  },
  {
    month: 18,
    activeUsers: 2800,
    newUsers: 1000,
    revenue: 44800,
    profit: 31000
  },
  {
    month: 24,
    activeUsers: 3800,
    newUsers: 1000,
    revenue: 60800,
    profit: 47000
  }
];

// Pricing Strategy Documentation
export const PRICING_STRATEGY = {
  approach: 'Penetration Pricing',
  objective: 'Capturar mercado con calidad premium a precios accesibles',
  basis: 'Precio 15% menor que la competencia regional',
  valueProposition: 'Certificaciones oficiales UTAMV, tutorización personalizada, contenido adaptado a LATAM',
  competitiveAdvantage: 'Precio accesible + calidad premium + soporte local',
  scalability: 'Estructura de precios modular escalable',
  paymentOptions: 'Pagos completos, cuotas sin interés, financiamiento',
  discounts: 'Descuentos para estudiantes, profesionales, empresas',
  guarantee: 'Garantía de satisfacción',
  positioning: 'Premium accesible con ventaja competitiva'
};
