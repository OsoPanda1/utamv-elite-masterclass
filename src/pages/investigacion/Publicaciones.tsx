import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, FileText, Calendar, User } from 'lucide-react';

const Publicaciones = () => {
  const publications = [
    {
      title: 'IA Generativa en Educación: Oportunidades y Retos',
      authors: 'Dr. Carlos Ruiz, Dra. Ana María González',
      year: '2026',
      journal: 'Revista de Educación Tecnológica',
      volume: '15',
      pages: '45-62',
      doi: '10.1234/edtech.2026.15.3',
      type: 'Artículo Científico',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
    },
    {
      title: 'Analítica Predictiva para Reducir Deserción Escolar',
      authors: 'Ing. Roberto Torres, Dr. Juan López',
      year: '2026',
      journal: 'Journal of Educational Data Mining',
      volume: '8',
      pages: '112-128',
      doi: '10.5678/jedm.2026.8.2',
      type: 'Artículo',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop',
    },
    {
      title: 'Blockchain en Certificación Educativa',
      authors: 'Ing. Javier Ortega, Dra. Carmen Lopez',
      year: '2025',
      journal: 'Blockchain in Education',
      volume: '3',
      pages: '78-95',
      doi: '10.9012/bie.2025.3.4',
      type: 'Investigación',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
    },
    {
      title: 'Realidad Virtual en Formación Técnica',
      authors: 'Ing. Pedro Sánchez, Dr. Luis Gutiérrez',
      year: '2025',
      journal: 'Virtual Learning Environments',
      volume: '20',
      pages: '189-205',
      doi: '10.3456/vle.2025.20.5',
      type: 'Trabajo',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
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
              PUBLICACIONES CIENTÍFICAS
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Producción científica de la UTAMV en educación digital y tecnologías aplicadas.
            </p>
          </div>
        </section>

        {/* Publications List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {publications.map((pub, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-8 p-6 border border-platinum/20 rounded-xl">
                  <div className="w-full md:w-64 flex-shrink-0">
                    <img 
                      src={pub.image} 
                      alt={pub.title}
                      className="w-full h-48 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-platinum/20 text-platinum">
                        {pub.type}
                      </span>
                      <span className="text-sm text-muted-foreground">{pub.journal}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">
                      {pub.title}
                    </h3>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{pub.authors}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{pub.year} | Vol. {pub.volume}, pp. {pub.pages}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>DOI: {pub.doi}</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-platinum hover:bg-platinum/10 rounded-lg transition-colors">
                        <BookOpen className="w-4 h-4" />
                        Ver PDF
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-platinum hover:bg-platinum/10 rounded-lg transition-colors">
                        <FileText className="w-4 h-4" />
                        Citar artículo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                Estadísticas de Publicación
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <div className="text-4xl font-bold text-gradient-gold mb-2">25+</div>
                  <p className="text-sm text-muted-foreground">Artículos científicos</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient-gold mb-2">15+</div>
                  <p className="text-sm text-muted-foreground">Revistas indexadas</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient-gold mb-2">50+</div>
                  <p className="text-sm text-muted-foreground">Citas académicas</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient-gold mb-2">10+</div>
                  <p className="text-sm text-muted-foreground">Conferencias internacionales</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                Colaboraciones Académicas
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 border border-platinum/20 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-4">Universidades</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>University of Cambridge</p>
                    <p>MIT Media Lab</p>
                    <p>Stanford University</p>
                    <p>Universidad Complutense de Madrid</p>
                  </div>
                </div>
                <div className="p-6 border border-platinum/20 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-4">Instituciones</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Google Education</p>
                    <p>Microsoft Research</p>
                    <p>IBM Research</p>
                    <p>Unity Technologies</p>
                  </div>
                </div>
                <div className="p-6 border border-platinum/20 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-4">Financiamiento</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Consejo Nacional de Ciencia y Tecnología</p>
                    <p>Fondo Nacional de Desarrollo Científico</p>
                    <p>Instituto de Ciencia y Tecnología</p>
                    <p>Fundación de Investigación Educativa</p>
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

export default Publicaciones;