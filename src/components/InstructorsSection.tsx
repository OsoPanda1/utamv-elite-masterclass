import { Link } from 'react-router-dom';
import { Award, ExternalLink, Globe } from 'lucide-react';
import edwinCastillo from '@/assets/edwin-castillo.jpg';
import renataJazmin from '@/assets/renata-jazmin.jpg';
import aiAssistant from '@/assets/ai-assistant.jpg';
import campusLatinamerica from '@/assets/campus-latinamerica.jpg';

const InstructorsSection = () => {
  const instructors = [
    {
      name: 'Edwin Oswaldo Castillo Trejo',
      role: 'Director del Programa',
      specialty: 'CEO Fundador - TAMV Enterprise',
      expertise: 'Metadatos, SEO, AEO, IA',
      image: edwinCastillo,
      orcid: '0009-0000-5715-9993',
    },
    {
      name: 'Renata Jazmin',
      role: 'Co-Directora Académica',
      specialty: 'CEO Fundadora - Orbita Digital',
      expertise: 'Marketing Internacional',
      image: renataJazmin,
    },
    {
      name: 'Isabella Villaseñor',
      role: 'AI Course Guide',
      specialty: 'Tutora Académica Virtual',
      expertise: 'Narración y Soporte 24/7',
      image: aiAssistant,
      isAI: true,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={campusLatinamerica} 
          alt="" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-teal/20 text-teal text-sm font-medium mb-4">
            Equipo Académico
          </span>
          <h2 className="section-title">Expertos de Clase Mundial</h2>
          <p className="section-subtitle">
            Líderes del marketing digital latinoamericano, respaldados por inteligencia artificial 
            para una experiencia de aprendizaje sin precedentes.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {instructors.map((instructor, index) => (
            <div 
              key={index}
              className="group text-center"
            >
              <div className="relative mb-6 mx-auto w-48 h-48">
                {/* Glow effect */}
                <div className={`absolute -inset-2 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500 ${
                  instructor.isAI ? 'bg-teal' : 'bg-silver'
                }`} />
                
                {/* Image */}
                <div className={`relative w-full h-full rounded-full overflow-hidden border-4 ${
                  instructor.isAI ? 'border-teal/50' : 'border-silver/50'
                } group-hover:border-silver transition-colors duration-300`}>
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Badge */}
                {instructor.isAI && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-teal text-foreground text-xs font-bold">
                    AI GUIDE
                  </div>
                )}
              </div>

              <h3 className="font-display text-xl font-semibold mb-1 text-foreground">
                {instructor.name}
              </h3>
              <p className={`text-sm font-medium mb-1 ${instructor.isAI ? 'text-teal' : 'text-silver'}`}>
                {instructor.role}
              </p>
              <p className="text-sm text-muted-foreground mb-1">
                {instructor.specialty}
              </p>
              <p className="text-xs text-muted-foreground">
                {instructor.expertise}
              </p>

              {/* ORCID Link */}
              {instructor.orcid && (
                <a 
                  href={`https://orcid.org/${instructor.orcid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-xs text-silver hover:text-foreground transition-colors"
                >
                  <Globe className="w-3 h-3" />
                  ORCID: {instructor.orcid}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* View More Link */}
        <div className="mt-12 text-center">
          <Link 
            to="/expertos" 
            className="inline-flex items-center gap-2 text-silver hover:text-foreground transition-colors font-medium"
          >
            Ver perfiles completos
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Pride Badge */}
        <div className="mt-16 text-center">
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
      </div>
    </section>
  );
};

export default InstructorsSection;
