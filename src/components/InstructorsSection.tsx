import instructor1 from '@/assets/instructor-1.jpg';
import instructor2 from '@/assets/instructor-2.jpg';
import aiAssistant from '@/assets/ai-assistant.jpg';
import campusLatinamerica from '@/assets/campus-latinamerica.jpg';

const InstructorsSection = () => {
  const instructors = [
    {
      name: 'Dra. Mariana Rodríguez',
      role: 'Directora del Programa',
      specialty: 'SEO & Metadatos Avanzados',
      image: instructor1,
    },
    {
      name: 'Mtro. Carlos Hernández',
      role: 'Instructor Principal',
      specialty: 'Marketing Predictivo & IA',
      image: instructor2,
    },
    {
      name: 'Isabella Villaseñor',
      role: 'AI Course Guide',
      specialty: 'Tutora Académica Virtual',
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
                  instructor.isAI ? 'bg-teal' : 'bg-gold'
                }`} />
                
                {/* Image */}
                <div className={`relative w-full h-full rounded-full overflow-hidden border-4 ${
                  instructor.isAI ? 'border-teal/50' : 'border-gold/50'
                } group-hover:border-gold transition-colors duration-300`}>
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
              <p className={`text-sm font-medium mb-2 ${instructor.isAI ? 'text-teal' : 'text-gold'}`}>
                {instructor.role}
              </p>
              <p className="text-sm text-muted-foreground">
                {instructor.specialty}
              </p>
            </div>
          ))}
        </div>

        {/* Pride Badge */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-card/50 border border-gold/30">
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Nacido desde</p>
              <p className="font-display text-xl font-bold text-gradient-gold">Latinoamérica</p>
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
