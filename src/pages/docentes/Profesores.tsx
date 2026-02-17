import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const Profesores = () => {
  const professors = [
    {
      name: 'Dr. Carlos Ruiz',
      specialty: 'Marketing Digital',
      description: 'Experto en estrategias digitales, SEO, SEM y analítica web. Maestro en Google Analytics y AdWords.',
      courses: ['Máster en Marketing Digital', 'Diplomado en SEO Avanzado'],
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    },
    {
      name: 'Dra. Ana María González',
      specialty: 'Inteligencia Artificial',
      description: 'Investigadora en machine learning y procesamiento de lenguaje natural. PhD en Ciencias de la Computación.',
      courses: ['Maestría en IA Empresarial', 'Diplomado en IA para Marketing'],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    },
    {
      name: 'Ing. Pedro Sánchez',
      specialty: 'Desarrollo Web',
      description: 'Full Stack Developer con 15 años de experiencia. Expert in React, Node.js y arquitectura de sistemas.',
      courses: ['Diplomado en Programación Full Stack', 'Certificado en Desarrollo Web'],
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop',
    },
    {
      name: 'Dr. Juan López',
      specialty: 'Data Science',
      description: 'Especialista en análisis de datos, visualización y machine learning. Consultor para empresas Fortune 500.',
      courses: ['Diplomado en Data Science', 'Certificado en Analítica Digital'],
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    },
    {
      name: 'Dra. Laura Martínez',
      specialty: 'Diseño UX/UI',
      description: 'Diseñadora centrada en el usuario con experiencia en productos digitales. Winner of Red Dot Design Award.',
      courses: ['Diplomado en Diseño UX/UI', 'Certificado en Diseño de Interfaces'],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    },
    {
      name: 'Ing. Roberto Torres',
      specialty: 'Ciberseguridad',
      description: 'Experto en seguridad informática y protección de datos. Certificado CEH y CISSP.',
      courses: ['Certificado en Seguridad Web', 'Diplomado en Ciberseguridad'],
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop',
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
              PROFESORES
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expertos académicos y profesionales con amplia experiencia en sus áreas de especialización.
            </p>
          </div>
        </section>

        {/* Professors Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {professors.map((prof, index) => (
                <div key={index} className="rounded-xl border border-platinum/20 bg-card/50 p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full border-2 border-platinum overflow-hidden">
                      <img 
                        src={prof.image} 
                        alt={prof.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">{prof.name}</h3>
                      <p className="text-platinum font-semibold text-sm">{prof.specialty}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    {prof.description}
                  </p>
                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground mb-2">Cursos que imparte:</p>
                    <div className="space-y-1">
                      {prof.courses.map((course, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-foreground">
                          <BookOpen className="w-3 h-3 text-platinum" />
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Award className="w-4 h-4 text-platinum" />
                    <span>Profesor destacado 2026</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Excellence */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-platinum/20 flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-platinum" />
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Excelencia Académica
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Nuestro cuerpo docente está compuesto por profesionales con amplia experiencia en educación y 
                en el sector empresarial, garantizando una formación práctica y actualizada.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-gradient-gold mb-2">95%</div>
                  <p className="text-sm text-muted-foreground">Profesores con PhD</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient-gold mb-2">10+</div>
                  <p className="text-sm text-muted-foreground">Años experiencia promedio</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient-gold mb-2">100%</div>
                  <p className="text-sm text-muted-foreground">Profesionales activos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                Metodología Docente
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-platinum" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Formación Competencial</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Enfoque práctico en competencias laborales. Trabajos reales, casos de estudio y proyectos profesionales.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-platinum" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Evaluación Continua</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Sistemas de evaluación que valoran el proceso de aprendizaje, no solo los resultados finales.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-platinum" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Actualización Permanente</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Programas de actualización docente para mantener las competencias alineadas con las tendencias actuales.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-platinum" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Mentoría Personalizada</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Seguimiento individualizado para cada estudiante, con retroalimentación constante.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profesores;