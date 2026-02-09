import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  ChevronLeft, 
  Settings as SettingsIcon,
  User,
  Bell,
  Palette,
  Film
} from 'lucide-react';

const Settings = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  const [showIntro, setShowIntro] = useState(() => {
    return localStorage.getItem('utamv-disable-intro') !== 'true';
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleIntroToggle = (enabled: boolean) => {
    setShowIntro(enabled);
    if (enabled) {
      localStorage.removeItem('utamv-disable-intro');
      sessionStorage.removeItem('utamv-intro-seen');
    } else {
      localStorage.setItem('utamv-disable-intro', 'true');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-silver" />
              <h1 className="font-display text-xl font-bold text-foreground">Configuración</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Profile Section */}
        <section className="card-elite p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-silver" />
            <h2 className="font-display text-lg font-semibold text-foreground">Perfil</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground text-sm">Correo electrónico</Label>
              <p className="text-foreground">{user?.email}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">Nombre</Label>
              <p className="text-foreground">{user?.user_metadata?.full_name || 'No especificado'}</p>
            </div>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="card-elite p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Film className="w-5 h-5 text-silver" />
            <h2 className="font-display text-lg font-semibold text-foreground">Presentación</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="intro-toggle" className="text-foreground font-medium">
                Intro cinematográfica
              </Label>
              <p className="text-sm text-muted-foreground">
                Mostrar la animación "MASTER 360 ELITE 2026" al iniciar
              </p>
            </div>
            <Switch
              id="intro-toggle"
              checked={showIntro}
              onCheckedChange={handleIntroToggle}
            />
          </div>
        </section>

        {/* Notifications Section */}
        <section className="card-elite p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-silver" />
            <h2 className="font-display text-lg font-semibold text-foreground">Notificaciones</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Correos de progreso</Label>
                <p className="text-sm text-muted-foreground">Recibir resúmenes semanales de tu avance</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Nuevos módulos</Label>
                <p className="text-sm text-muted-foreground">Notificar cuando haya contenido nuevo</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          UTAMV Elite Masterclass v1.0 • Plataforma creada con Tecnología TAMV ONLINE
        </p>
      </main>
    </div>
  );
};

export default Settings;
