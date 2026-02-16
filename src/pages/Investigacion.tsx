import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Microscope, BookOpen, Globe, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Investigacion = () => {
  const lines = [
    {
      icon: Microscope,
      title: 'SEO y Posicionamiento con IA',
      description: 'Investigación sobre la evolución de los motores de búsqueda hacia sistemas de respuesta con inteligencia artificial (AEO) y su impacto en las estrategias de posicionamiento.',
    },
    {
      icon: BookOpen,
      title: 'Metadatos y Arquitectura de Información',
      description: 'Estudio de marcos de metadatos estratégicos para la estructuración de contenido digital y su relación con la visibilidad en ecosistemas automatizados.',
    },
    {
      icon: Globe,
      title: 'Marketing Digital en Latinoamérica',
      description: 'Análisis del estado actual y las oportunidades del marketing digital en mercados latinoamericanos, con enfoque en adaptación cultural y geo-targeting.',
    },
    {
      icon: FileText,
      title: 'Automatización y Analítica Predictiva',
      description: 'Desarrollo de modelos de automatización de campañas y analítica predictiva aplicados a contextos empresariales reales.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              INVESTIGACIÓN
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Líneas de investigación aplicada de UTAMV, orientadas a generar conocimiento 
              útil y verificable en el campo del marketing digital y la tecnología.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              {lines.map((line, i) => (
                <div key={i} className="p-6 rounded-xl border border-border bg-card/30 flex items-start gap-5">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-1">
                    <line.icon className="w-5 h-5 text-silver" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{line.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{line.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground mb-6">
              La investigación en UTAMV se vincula directamente con los programas académicos 
              y contribuye a la actualización permanente de los contenidos formativos.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/programas/doctorado-inteligencia-estrategica">
                Ver programa de investigación →
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Investigacion;
