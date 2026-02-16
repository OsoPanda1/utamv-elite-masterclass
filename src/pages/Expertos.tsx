import { ArrowLeft, Award, Globe, ExternalLink, Shield, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import edwinCastillo from '@/assets/edwin-castillo.jpg';
import renataJazmin from '@/assets/renata-jazmin.jpg';
import aiAssistant from '@/assets/ai-assistant.jpg';
import instructor1 from '@/assets/instructor-1.jpg';
import instructor2 from '@/assets/instructor-2.jpg';

const Expertos = () => {
  const instructors = [
    {
      name: 'Edwin Oswaldo Castillo Trejo',
      role: 'Rector del Campus',
      company: 'Universidad UTAMV',
      specialty: 'Metadatos, SEO, AEO, IA, Ecosistemas Digitales',
      bio: 'Rector y fundador de la Universidad Tecnológica Avanzada del Marketing Virtual. Profesional con más de 15 años de experiencia en marketing digital, tecnología y educación superior. Especializado en posicionamiento digital, metadatos estratégicos e inteligencia artificial aplicada. Arquitecto del ecosistema educativo TAMV MD-X4 y pionero en Answer Engine Optimization (AEO).',
      image: edwinCastillo,
      orcid: '0009-0008-5050-1539',
      achievements: [
        'Rector y Fundador de la Universidad UTAMV',
        'Especialista en Metadatos y SEO Avanzado',
        'Pionero en AEO (Answer Engine Optimization)',
        'Arquitecto del ecosistema TAMV MD-X4',
        'Consultor estratégico para empresas Fortune 500',
      ],
    },
    {
      name: 'Renata Jazmin',
      role: 'Vicerrectora Académica',
      company: 'Universidad UTAMV',
      specialty: 'Marketing Internacional y Estrategia',
      bio: 'Vicerrectora Académica con más de 10 años de experiencia en educación superior y marketing global. Especializada en expansión de marcas, posicionamiento internacional y desarrollo de programas educativos innovadores. Consultora para empresas de Latinoamérica y Europa en estrategias de crecimiento digital.',
      image: renataJazmin,
      achievements: [
        'Vicerrectora Académica de la Universidad UTAMV',
        'Especialista en Marketing Internacional',
        'Consultora de marcas globales',
        'Experta en expansión de mercados LATAM',
        'Desarrolladora de programas educativos innovadores',
      ],
    },
    {
      name: 'Dr. Carlos Méndez',
      role: 'Director de Tecnología',
      company: 'Universidad UTAMV',
      specialty: 'Seguridad Social en la Web y Ciberseguridad',
      bio: 'Especialista en seguridad informática y protección de datos con más de 12 años de experiencia en empresas tecnológicas líderes. Desarrollador de sistemas de autenticación avanzada y modelos de seguridad para plataformas educativas. Experto en cumplimiento normativo GDPR y LGPD.',
      image: instructor1,
      achievements: [
        'Director de Tecnología UTAMV',
        'Especialista en Ciberseguridad Avanzada',
        'Desarrollador de sistemas de autenticación',
        'Experto en normativas de seguridad GDPR/LGPD',
        'Consultor de seguridad para organizaciones educativas',
      ],
    },
    {
      name: 'Ing. Ana Rodriguez',
      role: 'Directora de Programación',
      company: 'Universidad UTAMV',
      specialty: 'Desarrollo Full Stack y Tecnologías Emergentes',
      bio: 'Ingeniera de software con experiencia en desarrollo de aplicaciones web y móviles. Especializada en JavaScript, Python y Node.js, con más de 10 años de experiencia en empresas de tecnología. Desarrolladora de frameworks educativos y plataformas de aprendizaje.',
      image: instructor2,
      achievements: [
        'Directora de Programación UTAMV',
        'Especialista en JavaScript, Python y Node.js',
        'Desarrolladora de plataformas educativas',
        'Instructora de bootcamps de programación',
        'Contribuidora a proyectos open source',
      ],
    },
    {
      name: 'Isabella Villaseñor',
      role: 'Asistente Académica Virtual',
      company: 'UTAMV – Inteligencia Artificial',
      specialty: 'Tutoría Académica y Soporte',
      bio: 'Sistema de inteligencia artificial diseñado para acompañar el proceso de aprendizaje en la Universidad UTAMV. Proporciona orientación académica personalizada, retroalimentación en evaluaciones y soporte continuo 24/7. Desarrollado específicamente para el contexto educativo latinoamericano.',
      image: aiAssistant,
      isAI: true,
      achievements: [
        'Orientación académica personalizada',
        'Soporte disponible 24/7',
        'Retroalimentación en evaluaciones',
        'Guía de navegación del programa',
        'Optimizada para contexto latinoamericano',
      ],
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
              CUERPO DOCENTE
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Profesionales con experiencia aplicada en marketing digital, tecnología 
              e inteligencia artificial, comprometidos con la formación de alto nivel.
            </p>
          </div>
        </section>

        {/* Instructors */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {instructors.map((inst, index) => (
                <div key={index} className="p-8 rounded-xl border border-border bg-card/30">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="relative mx-auto md:mx-0 shrink-0">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-border">
                        <img src={inst.image} alt={inst.name} className="w-full h-full object-cover" />
                      </div>
                      {inst.isAI && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-muted border border-border text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                          IA
                        </div>
                      )}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h2 className="font-display text-xl font-bold text-foreground mb-1">{inst.name}</h2>
                      <p className="text-sm font-medium text-silver mb-1">{inst.role}</p>
                      <p className="text-xs text-muted-foreground mb-4">{inst.company}</p>
                      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{inst.bio}</p>

                      <div className="grid sm:grid-cols-2 gap-2 mb-4">
                        {inst.achievements.map((a, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs">
                            <Award className="w-3.5 h-3.5 text-silver shrink-0" />
                            <span className="text-foreground">{a}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3 mb-4">
                        {inst.specialty.includes('Seguridad') && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground">
                            <Shield className="w-3.5 h-3.5" />
                            Seguridad Social en la Web
                          </div>
                        )}
                        {inst.specialty.includes('Programación') && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground">
                            <Code className="w-3.5 h-3.5" />
                            JavaScript, Python, Node.js
                          </div>
                        )}
                      </div>

                      {inst.orcid && (
                        <a
                          href={`https://orcid.org/${inst.orcid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          ORCID: {inst.orcid}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Expertos;
