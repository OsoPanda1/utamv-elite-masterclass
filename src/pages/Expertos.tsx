import { ArrowLeft, Award, Globe, Linkedin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import edwinCastillo from '@/assets/edwin-castillo.jpg';
import renataJazmin from '@/assets/renata-jazmin.jpg';
import aiAssistant from '@/assets/ai-assistant.jpg';
import campusLatinamerica from '@/assets/campus-latinamerica.jpg';

const Expertos = () => {
  const instructors = [
    {
      name: 'Edwin Oswaldo Castillo Trejo',
      role: 'Director del Programa',
      company: 'CEO Fundador - TAMV Enterprise',
      specialty: 'Metadatos, SEO, AEO, IA, Community Manager',
      bio: 'Experto en más de 7 ramas tecnológicas con amplia experiencia en posicionamiento digital y estrategias de marketing avanzado. Fundador de TAMV Enterprise y creador del Master Elite en Marketing Digital 2026.',
      image: edwinCastillo,
      orcid: '0009-0000-5715-9993',
      achievements: [
        'CEO y Fundador de TAMV Enterprise',
        'Especialista en Metadatos y SEO Avanzado',
        'Pionero en AEO (Answer Engine Optimization)',
        'Experto certificado en IA aplicada al Marketing'
      ]
    },
    {
      name: 'Renata Jazmin',
      role: 'Co-Directora Académica',
      company: 'CEO Fundadora - Orbita Digital',
      specialty: 'Marketing Internacional',
      bio: 'Líder en estrategias de marketing internacional con experiencia en mercados latinoamericanos y europeos. Especialista en expansión de marcas y posicionamiento global.',
      image: renataJazmin,
      achievements: [
        'CEO y Fundadora de Orbita Digital',
        'Especialista en Marketing Internacional',
        'Consultora para marcas globales',
        'Experta en expansión de mercados LATAM'
      ]
    },
    {
      name: 'Isabella Villaseñor',
      role: 'AI Course Guide',
      company: 'UTAMV Virtual Assistant',
      specialty: 'Tutora Académica Virtual',
      bio: 'Asistente de inteligencia artificial diseñada para guiar tu experiencia de aprendizaje. Proporciona narración de contenidos, feedback personalizado y soporte académico 24/7.',
      image: aiAssistant,
      isAI: true,
      achievements: [
        'Narración profesional de todos los módulos',
        'Soporte académico disponible 24/7',
        'Feedback personalizado en evaluaciones',
        'Guía interactiva del programa'
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={campusLatinamerica} 
            alt="" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-teal/20 text-teal text-sm font-medium mb-4">
              Equipo Académico
            </span>
            <h1 className="section-title">Expertos de Clase Mundial</h1>
            <p className="section-subtitle">
              Líderes del marketing digital latinoamericano, respaldados por inteligencia artificial 
              para una experiencia de aprendizaje sin precedentes.
            </p>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {instructors.map((instructor, index) => (
              <div 
                key={index}
                className="card-elite p-8 md:p-10"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Photo */}
                  <div className="relative mx-auto md:mx-0">
                    <div className={`absolute -inset-2 rounded-full blur-lg opacity-30 ${
                      instructor.isAI ? 'bg-teal' : 'bg-silver'
                    }`} />
                    <div className={`relative w-40 h-40 rounded-full overflow-hidden border-4 ${
                      instructor.isAI ? 'border-teal/50' : 'border-silver/50'
                    }`}>
                      <img 
                        src={instructor.image} 
                        alt={instructor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {instructor.isAI && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-teal text-foreground text-xs font-bold">
                        AI GUIDE
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                      {instructor.name}
                    </h2>
                    <p className={`text-lg font-medium mb-1 ${instructor.isAI ? 'text-teal' : 'text-silver'}`}>
                      {instructor.role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {instructor.company}
                    </p>

                    <p className="text-muted-foreground mb-6">
                      {instructor.bio}
                    </p>

                    {/* Achievements */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      {instructor.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Award className="w-4 h-4 text-silver flex-shrink-0" />
                          <span className="text-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>

                    {/* ORCID */}
                    {instructor.orcid && (
                      <a 
                        href={`https://orcid.org/${instructor.orcid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        ORCID: {instructor.orcid}
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

      {/* Institutional Pride */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-card/50 border border-silver/30">
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Nacido desde</p>
              <p className="font-display text-xl font-bold text-gradient-silver">Latinoamérica</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Para el</p>
              <p className="font-display text-xl font-bold text-teal">Mundo</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4 text-foreground">
            Aprende de los mejores
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Únete al Master Elite y recibe formación directa de expertos líderes en marketing digital.
          </p>
          <Button variant="elite" size="xl" asChild>
            <Link to="/inscripcion">Inscribirme Ahora</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Expertos;
