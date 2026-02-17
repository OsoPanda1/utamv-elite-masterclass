import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Briefcase, GraduationCap, Users, User } from 'lucide-react';

const Directivos = () => {
  const directors = [
    {
      name: 'Dr. Alejandro Vargas',
      position: 'Director de Posgrado',
      specialty: 'Maestrías y Doctorados',
      description: 'Especialista en políticas públicas y desarrollo humano. PhD en Ciencias Sociales.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    },
    {
      name: 'Dra. Carmen Lopez',
      position: 'Directora de Licenciaturas',
      specialty: 'Formación Bachillerato',
      description: 'Experta en currículo educativo y pedagogía universitaria. Doctora en Educación.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    },
    {
      name: 'Ing. Roberto Méndez',
      position: 'Director de Tecnología',
      specialty: 'Plataformas y Sistemas',
      description: 'Ingeniero de Sistemas con experiencia en educacion virtual y cloud computing.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop',
    },
    {
      name: 'Dr. Luis Gutiérrez',
      position: 'Director de Investigación',
      specialty: 'Investigación Aplicada',
      description: 'Investigador en innovación educativa y tecnología digital. PhD en Informática Educativa.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    },
    {
      name: 'Dra. Ana Torres',
      position: 'Directora de Admisiones',
      specialty: 'Proceso de Inscripción',
      description: 'Experta en selección de talento y políticas de admisión. Maestría en Recursos Humanos.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    },
    {
      name: 'Ing. Javier Ortega',
      position: 'Director de Infraestructura',
      specialty: 'Tecnología Educativa',
      description: 'Ingeniero de Telecomunicaciones con experiencia en redes y sistemas de video conferencia.',
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
              DIRECTIVOS
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              El equipo de gerencia que lidera las áreas operativas y académicas de la UTAMV.
            </p>
          </div>
        </section>

        {/* Directors Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {directors.map((director, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-platinum overflow-hidden">
                    <img 
                      src={director.image} 
                      alt={director.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{director.name}</h3>
                  <p className="text-platinum font-semibold mb-2">{director.position}</p>
                  <p className="text-xs text-muted-foreground mb-4">{director.specialty}</p>
                  <p className="text-sm text-muted-foreground">
                    {director.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Organizational Structure */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                Estructura Organizativa
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-xl border border-platinum/20">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-platinum/20 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-platinum" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Academia</h3>
                  <p className="text-sm text-muted-foreground">
                    Licenciaturas, Maestrías, Doctorados y Certificaciones
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl border border-platinum/20">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-platinum/20 flex items-center justify-center">
                    <UserTie className="w-6 h-6 text-platinum" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Gestión</h3>
                  <p className="text-sm text-muted-foreground">
                    Administración, Finanzas, Recursos Humanos y Operaciones
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl border border-platinum/20">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-platinum/20 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-platinum" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Innovación</h3>
                  <p className="text-sm text-muted-foreground">
                    Tecnología, Investigación y Desarrollo Académico
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Valores Corporativos
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-platinum mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Excelencia</h3>
                    <p className="text-sm text-muted-foreground">
                      Compromiso con la calidad académica y la innovación constante
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UserTie className="w-5 h-5 text-platinum mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Ética</h3>
                    <p className="text-sm text-muted-foreground">
                      Conducta responsable y transparencia en todas las actividades
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-platinum mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Innovación</h3>
                    <p className="text-sm text-muted-foreground">
                      Adopción de tecnologías avanzadas para la educación
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-platinum mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Inclusividad</h3>
                    <p className="text-sm text-muted-foreground">
                      Acceso equitativo a la educación para todos
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

export default Directivos;