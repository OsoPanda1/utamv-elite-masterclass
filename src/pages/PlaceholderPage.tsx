import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Construction, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * PlaceholderPage - For routes that are under construction
 * Shows "Información en actualización" message
 */
const PlaceholderPage = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const pageName = pathSegments.length > 0 
    ? pathSegments[pathSegments.length - 1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'Página';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center">
              <Construction className="w-12 h-12 text-muted-foreground" />
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {pageName}
            </h1>
            
            <div className="p-6 rounded-xl border border-border bg-card mb-8">
              <p className="text-lg text-muted-foreground mb-4">
                📝 <strong>Información en actualización</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Esta sección está siendo actualizada con nuevo contenido. 
                Pronto encontrará aquí información detallada sobre {pageName.toLowerCase()}.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al inicio
                </Link>
              </Button>
              <Button asChild>
                <Link to="/admisiones">
                  Ver programas disponibles
                </Link>
              </Button>
            </div>

            <div className="mt-12 p-4 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">
                ¿Necesitas información urgente? Contáctanos en{' '}
                <a href="mailto:tamvonlinenetwork@outlook.es" className="text-teal hover:underline">
                  tamvonlinenetwork@outlook.es
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceholderPage;
