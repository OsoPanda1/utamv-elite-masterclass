import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import ProgressChart from '@/components/dashboard/ProgressChart';
import CertificateGenerator from '@/components/dashboard/CertificateGenerator';
import GeneralChat from '@/components/dashboard/GeneralChat';
import AISupportChat from '@/components/dashboard/AISupportChat';
import HumanSupportButton from '@/components/dashboard/HumanSupportButton';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  LogOut, 
  Lock, 
  CheckCircle2, 
  PlayCircle,
  Sparkles,
  Clock,
  Star,
  MessageCircle,
  HeadphonesIcon,
  Users
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

interface QuizScore {
  score: number;
}

const Dashboard = () => {
  const { user, loading, isPaid, isAdmin, signOut, refreshPaymentStatus } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Allow access if paid OR admin
  const hasAccess = isPaid || isAdmin;
  const { toast } = useToast();
  
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);
  const [totalTimeMinutes, setTotalTimeMinutes] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<'modules' | 'chat' | 'support'>('modules');

  // Handle payment success/cancelled from Stripe redirect
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    if (paymentStatus === 'success') {
      toast({
        title: '¡Pago exitoso!',
        description: 'Bienvenido al Master Elite. Tu acceso está activo.',
      });
      refreshPaymentStatus();
      // Clear the URL parameter
      navigate('/dashboard', { replace: true });
    } else if (paymentStatus === 'cancelled') {
      toast({
        title: 'Pago cancelado',
        description: 'Tu inscripción no se completó. Puedes intentar de nuevo.',
        variant: 'destructive',
      });
      navigate('/dashboard', { replace: true });
    }
  }, [searchParams, toast, refreshPaymentStatus, navigate]);

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

      // Fetch quiz scores for average calculation
      const { data: scoresData } = await supabase
        .from('quiz_attempts')
        .select('score')
        .eq('user_id', user?.id);
      
      if (scoresData) {
        setQuizScores(scoresData);
      }

      // Calculate estimated time (5 hours per completed module)
      if (progressData) {
        setTotalTimeMinutes(progressData.length * 300); // 5 hours = 300 minutes
      }
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

  const handleEnroll = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { origin: window.location.origin }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      toast({
        title: 'Error',
        description: 'No se pudo iniciar el proceso de pago. Intenta de nuevo.',
        variant: 'destructive',
      });
    }
  };

  const handleModuleClick = (moduleId: string, orderIndex: number) => {
    if (!hasAccess) {
      toast({
        title: 'Acceso restringido',
        description: 'Inscríbete para acceder al contenido del programa.',
      });
      return;
    }
    navigate(`/module/${orderIndex}`);
  };

  const isModuleCompleted = (moduleId: string) => {
    return progress.some(p => p.module_id === moduleId);
  };

  const progressPercent = modules.length > 0 
    ? Math.round((progress.length / modules.length) * 100) 
    : 0;

  const averageScore = quizScores.length > 0
    ? Math.round(quizScores.reduce((acc, s) => acc + s.score, 0) / quizScores.length)
    : 0;

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
        description: 'Tu certificación UTAMV está lista.',
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

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-silver-primary mx-auto mb-4"></div>
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
            <div className="w-12 h-12 rounded-full bg-card border-2 border-silver-primary flex items-center justify-center shadow-silver">
              <img src={utamvSeal} alt="UTAMV" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-gradient-silver">Dashboard Académico</h1>
              <p className="text-sm text-muted-foreground">Master Elite en Marketing Digital 2026</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Salir
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

        {/* Quick Status - Only show if not paid AND not admin */}
        {!hasAccess && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-silver-primary/10 to-silver-accent/10 border border-silver-primary/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Lock className="w-10 h-10 text-silver-primary" />
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">Acceso Premium Bloqueado</h3>
                  <p className="text-muted-foreground">Inscríbete para desbloquear todos los módulos y certificación</p>
                </div>
              </div>
              <Button variant="elite" size="lg" onClick={handleEnroll}>
                <Sparkles className="w-5 h-5 mr-2" />
                Inscribirme - $199 USD
              </Button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'modules' 
                ? 'border-silver-primary text-silver-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Módulos
          </button>
          {hasAccess && (
            <>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                  activeTab === 'chat' 
                    ? 'border-silver-primary text-silver-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Comunidad
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                  activeTab === 'support' 
                    ? 'border-silver-primary text-silver-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <HeadphonesIcon className="w-4 h-4 inline mr-2" />
                Soporte
              </button>
            </>
          )}
        </div>

        {/* Content based on tab */}
        {activeTab === 'modules' && (
          <>
            {/* Progress Charts - Only for paid users */}
            {hasAccess && (
              <div className="mb-8">
                <ProgressChart 
                  progressPercent={progressPercent}
                  modulesCompleted={progress.length}
                  totalModules={modules.length}
                  totalTimeMinutes={totalTimeMinutes}
                  averageScore={averageScore}
                />
              </div>
            )}

            {/* Certificate Section */}
            {certificate && (
              <div className="mb-8">
                <CertificateGenerator
                  studentName={user?.user_metadata?.full_name || 'Estudiante UTAMV'}
                  certificateNumber={certificate.certificate_number}
                  courseTitle="Master Elite Profesional en Marketing Digital 2026"
                  completionDate={new Date(certificate.generated_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  verificationUrl={`${window.location.origin}/verify?cert=${certificate.certificate_number}`}
                />
              </div>
            )}

            {/* Generate Certificate Button */}
            {!certificate && progressPercent === 100 && hasAccess && (
              <div className="mb-8 p-6 rounded-2xl bg-gradient-silver border border-silver-primary/30 text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-background" />
                <h3 className="font-display text-2xl font-bold text-background mb-2">
                  ¡Felicitaciones!
                </h3>
                <p className="text-background/80 mb-4">
                  Has completado todos los módulos. Genera tu certificación oficial.
                </p>
                <Button variant="outline" size="lg" onClick={generateCertificate}>
                  <Award className="w-5 h-5 mr-2" />
                  Generar Certificado UTAMV
                </Button>
              </div>
            )}

            {/* Modules Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-silver-primary" />
                  Módulos del Programa
                </h3>
                <span className="text-sm text-muted-foreground">
                  {progress.length}/{modules.length} completados
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module, index) => {
                  const completed = isModuleCompleted(module.id);
                  const locked = !hasAccess;
                  
                  return (
                    <div 
                      key={module.id}
                      className={`module-card cursor-pointer transition-all hover:scale-[1.02] ${completed ? 'border-silver-primary/50' : ''} ${locked ? 'opacity-60' : ''}`}
                      onClick={() => handleModuleClick(module.id, module.order_index)}
                    >
                      {/* Module Image */}
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={`/module-${index + 1}.jpg`} 
                          alt={module.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
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
                            <div className="px-3 py-1 rounded-full bg-silver-primary/90 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-background" />
                              <span className="text-xs text-background font-medium">Completado</span>
                            </div>
                          ) : (
                            <div className="px-3 py-1 rounded-full bg-card/90 border border-silver-primary/50 flex items-center gap-1">
                              <PlayCircle className="w-3 h-3 text-silver-primary" />
                              <span className="text-xs text-foreground">Disponible</span>
                            </div>
                          )}
                        </div>

                        {/* Module number */}
                        <div className="absolute bottom-3 left-3">
                          <span className="text-xs text-muted-foreground">Módulo</span>
                          <p className="text-2xl font-display font-bold text-gradient-silver">{String(index + 1).padStart(2, '0')}</p>
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

                        {/* Duration estimate */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            5 horas
                          </span>
                          {completed && (
                            <span className="flex items-center gap-1 text-silver-primary">
                              <Star className="w-4 h-4" />
                              Dominado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="card-elite p-4 text-center">
                <Clock className="w-8 h-8 text-silver-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">+50</p>
                <p className="text-sm text-muted-foreground">Horas de contenido</p>
              </div>
              <div className="card-elite p-4 text-center">
                <BookOpen className="w-8 h-8 text-silver-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">10</p>
                <p className="text-sm text-muted-foreground">Módulos completos</p>
              </div>
              <div className="card-elite p-4 text-center">
                <Award className="w-8 h-8 text-silver-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-sm text-muted-foreground">Certificación UTAMV</p>
              </div>
              <div className="card-elite p-4 text-center">
                <GraduationCap className="w-8 h-8 text-silver-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">∞</p>
                <p className="text-sm text-muted-foreground">Acceso vitalicio</p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'chat' && hasAccess && (
          <GeneralChat />
        )}

        {activeTab === 'support' && hasAccess && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AISupportChat />
            <div className="space-y-6">
              <HumanSupportButton />
              <div className="card-elite p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  Recursos de Ayuda
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-silver-primary" />
                    Manual del estudiante disponible
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-silver-primary" />
                    FAQ con respuestas frecuentes
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-silver-primary" />
                    Soporte técnico 24/7
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-silver-primary" />
                    Comunidad de estudiantes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Plataforma creada con Tecnología TAMV ONLINE
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Orgullosamente Realmontenses - Latinoamérica
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
