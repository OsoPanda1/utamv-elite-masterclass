import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  LogOut, 
  Lock, 
  CheckCircle2, 
  PlayCircle,
  FileText,
  Download,
  Sparkles,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';
import utamvSeal from '@/assets/utamv-seal.png';

interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
  image_url: string;
}

interface ModuleProgress {
  module_id: string;
  completed_at: string;
}

interface Certificate {
  id: string;
  certificate_number: string;
  generated_at: string;
}

const Dashboard = () => {
  const { user, loading, isPaid, signOut, refreshPaymentStatus } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, isPaid]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      // Fetch modules
      const { data: modulesData } = await supabase
        .from('modules')
        .select('*')
        .order('order_index');
      
      if (modulesData) setModules(modulesData);

      // Fetch progress
      const { data: progressData } = await supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', user?.id);
      
      if (progressData) setProgress(progressData);

      // Fetch certificate
      const { data: certData } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();
      
      if (certData) setCertificate(certData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleEnroll = () => {
    navigate('/#inscripcion');
  };

  const markModuleComplete = async (moduleId: string) => {
    if (!user || !isPaid) return;

    try {
      const { error } = await supabase
        .from('module_progress')
        .insert({
          user_id: user.id,
          module_id: moduleId,
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Módulo ya completado',
            description: 'Este módulo ya está marcado como completado.',
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: '¡Módulo completado!',
          description: 'Tu progreso ha sido guardado.',
        });
        fetchData();
      }
    } catch (err) {
      console.error('Error marking module complete:', err);
      toast({
        title: 'Error',
        description: 'No se pudo guardar el progreso.',
        variant: 'destructive',
      });
    }
  };

  const generateCertificate = async () => {
    if (!user || !isPaid || progress.length < modules.length) return;

    try {
      const certNumber = `UTAMV-${Date.now()}-${user.id.slice(0, 8).toUpperCase()}`;
      
      const { data: courseData } = await supabase
        .from('courses')
        .select('id')
        .single();

      if (!courseData) return;

      const { error } = await supabase
        .from('certificates')
        .insert({
          user_id: user.id,
          course_id: courseData.id,
          certificate_number: certNumber,
        });

      if (error) throw error;

      toast({
        title: '¡Certificado generado!',
        description: 'Tu certificación UTAMV está lista para descargar.',
      });
      fetchData();
    } catch (err) {
      console.error('Error generating certificate:', err);
      toast({
        title: 'Error',
        description: 'No se pudo generar el certificado.',
        variant: 'destructive',
      });
    }
  };

  const isModuleCompleted = (moduleId: string) => {
    return progress.some(p => p.module_id === moduleId);
  };

  const progressPercent = modules.length > 0 
    ? Math.round((progress.length / modules.length) * 100) 
    : 0;

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando tu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center">
              <img src={utamvSeal} alt="UTAMV" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-gradient-gold">Dashboard Académico</h1>
              <p className="text-sm text-muted-foreground">Master Elite en Marketing Digital 2026</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            Bienvenido, {user?.user_metadata?.full_name || 'Estudiante'}
          </h2>
          <p className="text-muted-foreground">
            {isPaid 
              ? 'Continúa tu formación como Master en Marketing Digital.'
              : 'Inscríbete para acceder a todo el contenido del programa.'}
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Enrollment Status */}
          <div className={`card-elite p-6 ${isPaid ? 'border-primary/50' : 'border-destructive/50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                isPaid ? 'bg-primary/10' : 'bg-destructive/10'
              }`}>
                {isPaid ? (
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                ) : (
                  <Lock className="w-7 h-7 text-destructive" />
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <p className={`font-semibold text-lg ${isPaid ? 'text-primary' : 'text-destructive'}`}>
                  {isPaid ? 'Inscrito' : 'No Inscrito'}
                </p>
              </div>
            </div>
            {!isPaid && (
              <Button variant="elite" className="w-full mt-4" onClick={handleEnroll}>
                <Sparkles className="w-4 h-4 mr-2" />
                Inscribirme - $199 USD
              </Button>
            )}
          </div>

          {/* Progress */}
          <div className="card-elite p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progreso</p>
                <p className="font-semibold text-lg text-foreground">{progressPercent}% Completado</p>
              </div>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              {progress.length} de {modules.length} módulos
            </p>
          </div>

          {/* Certificate */}
          <div className="card-elite p-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                certificate ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <Award className={`w-7 h-7 ${certificate ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Certificación</p>
                <p className={`font-semibold text-lg ${certificate ? 'text-primary' : 'text-muted-foreground'}`}>
                  {certificate ? 'Disponible' : 'Pendiente'}
                </p>
              </div>
            </div>
            {certificate && (
              <Button variant="outline" className="w-full mt-4" onClick={() => {
                toast({
                  title: 'Certificado',
                  description: `Número: ${certificate.certificate_number}`,
                });
              }}>
                <Download className="w-4 h-4 mr-2" />
                Ver Certificado
              </Button>
            )}
            {!certificate && progressPercent === 100 && isPaid && (
              <Button variant="elite" className="w-full mt-4" onClick={generateCertificate}>
                <Award className="w-4 h-4 mr-2" />
                Generar Certificado
              </Button>
            )}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Módulos del Programa
            </h3>
            <span className="text-sm text-muted-foreground">
              {progress.length}/{modules.length} completados
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const completed = isModuleCompleted(module.id);
              const locked = !isPaid;
              
              return (
                <div 
                  key={module.id}
                  className={`module-card ${completed ? 'border-primary/50' : ''} ${locked ? 'opacity-60' : ''}`}
                >
                  {/* Module Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={`/module-${index + 1}.jpg`} 
                      alt={module.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    
                    {/* Status badge */}
                    <div className="absolute top-3 right-3">
                      {locked ? (
                        <div className="px-3 py-1 rounded-full bg-card/90 border border-border flex items-center gap-1">
                          <Lock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Bloqueado</span>
                        </div>
                      ) : completed ? (
                        <div className="px-3 py-1 rounded-full bg-primary/90 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                          <span className="text-xs text-primary-foreground font-medium">Completado</span>
                        </div>
                      ) : (
                        <div className="px-3 py-1 rounded-full bg-card/90 border border-border flex items-center gap-1">
                          <PlayCircle className="w-3 h-3 text-secondary" />
                          <span className="text-xs text-foreground">Disponible</span>
                        </div>
                      )}
                    </div>

                    {/* Module number */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs text-muted-foreground">Módulo</span>
                      <p className="text-2xl font-display font-bold text-gradient-gold">{String(index + 1).padStart(2, '0')}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h4 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-2">
                      {module.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {module.description}
                    </p>

                    {/* Actions */}
                    {!locked && !completed && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => markModuleComplete(module.id)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Marcar como Completado
                      </Button>
                    )}
                    {locked && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full"
                        disabled
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Inscríbete para acceder
                      </Button>
                    )}
                    {completed && (
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Star className="w-4 h-4" />
                        <span>Módulo dominado</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card-elite p-4 text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">+50</p>
            <p className="text-sm text-muted-foreground">Horas de contenido</p>
          </div>
          <div className="card-elite p-4 text-center">
            <FileText className="w-8 h-8 text-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">10</p>
            <p className="text-sm text-muted-foreground">Módulos completos</p>
          </div>
          <div className="card-elite p-4 text-center">
            <Award className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">1</p>
            <p className="text-sm text-muted-foreground">Certificación UTAMV</p>
          </div>
          <div className="card-elite p-4 text-center">
            <GraduationCap className="w-8 h-8 text-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">∞</p>
            <p className="text-sm text-muted-foreground">Acceso vitalicio</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
