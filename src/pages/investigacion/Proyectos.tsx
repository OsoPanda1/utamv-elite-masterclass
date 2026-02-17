import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Lightbulb, BookOpen, Users, Target } from 'lucide-react';

const Proyectos = () => {
  const projects = [
    {
      title: 'IA Educativa para Personalización',
      description: 'Desarrollo de modelos de aprendizaje adaptativo usando inteligencia artificial para personalizar el contenido educativo según las necesidades de cada estudiante.',
      status: 'En desarrollo',
      stage: 'Investigación',
      team: '5 investigadores',
      collaborators: 'Universidad de Cambridge, MIT',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
    },
    {
      title: 'Análisis de Datos Educativos',
      description: 'Plataforma de analítica predictiva para identificar patrones de desempeño estudiantil y reducir la deserción escolar en entornos virtuales.',
      status: 'Concluso',
      stage: 'Implementación',
      team: '3 investigadores',
      collaborators: 'Google Education, Microsoft Research',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop',
    },
    {
      title: 'Realidad Virtual en Aprendizaje',
      description: 'Aplicación de realidad virtual y aumentada para crear experiencias de aprendizaje inmersivas en campos técnicos y profesionales.',
      status: 'Pruebas',
      stage: 'Desarrollo',
      team: '4 investigadores',
      collaborators: 'Unity Technologies',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
    },
    {
      title: 'Blockchain en Certificación',
      description: 'Sistema de certificación digital basado en blockchain para garantizar la autenticidad y validez de las credenciales académicas.',
      status: 'Pilot',
      stage: 'Pruebas',
      team: '3 investigadores',
      collaborators: 'IBM Research',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
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
              PROYECTOS DE INVESTIGACIÓN
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Investigaciones innovadoras que transforman la educación digital y el aprendizaje en línea.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {projects.map((project, index) => (
                <div key={index} className="rounded-xl border border-platinum/20 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        project.status === 'Concluso' 
                          ? 'bg-primary/20 text-primary' 
                          : project.status === 'En desarrollo'
                          ? 'bg-platinum/20 text-platinum'
                          : 'bg-amber-500/20 text-amber-500'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{project.stage}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {project.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{project.team}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        <span>{project.collaborators}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                Áreas de Investigación
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-platinum" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Tecnologías Educativas</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Desarrollo de herramientas y plataformas digitales para mejorar la experiencia de aprendizaje.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-platinum" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Aprendizaje Adaptativo</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Sistemas de aprendizaje personalizado que responden a las necesidades individuales de los estudiantes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-platinum" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Evaluación Digital</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Metodologías de evaluación innovadoras para entornos virtuales y educación continua.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-platinum" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Inclusividad Digital</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tecnologías accesibles y equitativas para garantizar la educación para todos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                Impacto de la Investigación
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold text-gradient-gold mb-2">50+</div>
                  <p className="text-sm text-muted-foreground">Proyectos completados</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient-gold mb-2">25+</div>
                  <p className="text-sm text-muted-foreground">Publicaciones científicas</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient-gold mb-2">15+</div>
                  <p className="text-sm text-muted-foreground">Colaboradores internacionales</p>
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

export default Proyectos;