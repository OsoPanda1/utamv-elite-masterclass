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
  GraduationCap, BookOpen, Award, LogOut, Lock, CheckCircle2, PlayCircle,
  Sparkles, Clock, Star, MessageCircle, HeadphonesIcon, Users, Settings, Bell
} from 'lucide-react';
import utamvSeal from '@/assets/utamv-seal.png';

interface Module {
  id: string;
  title: string;
  description: string | null;
  order_index: number;
  image_url: string | null;
}

interface ModuleProgress {
  module_id: string;
  completed_at: string | null;
}

interface Certificate {
  id: string;
  certificate_number: string;
  generated_at: string | null;
}

interface QuizScore {
  score: number;
}

const Dashboard = () => {
  const { user, loading, isPaid, isAdmin, signOut, refreshPaymentStatus, role } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasAccess = isPaid || isAdmin;
  const { toast } = useToast();
  
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);
  const [totalTimeMinutes, setTotalTimeMinutes] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<'modules' | 'chat' | 'support'>('modules');

  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    if (paymentStatus === 'success') {
      toast({ title: '¡Pago exitoso!', description: 'Bienvenido al Campus Virtual. Tu acceso está activo.' });
      refreshPaymentStatus();
      navigate('/campus-virtual', { replace: true });
    } else if (paymentStatus === 'cancelled') {
      toast({ title: 'Pago cancelado', description: 'Tu inscripción no se completó.', variant: 'destructive' });
      navigate('/campus-virtual', { replace: true });
    }
  }, [searchParams, toast, refreshPaymentStatus, navigate]);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) fetchData();
  }, [user, isPaid]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const { data: modulesData } = await supabase.from('modules').select('*').order('order_index');
      if (modulesData) setModules(modulesData as Module[]);

      const { data: progressData } = await supabase.from('module_progress').select('*').eq('user_id', user?.id ?? '');
      if (progressData) setProgress(progressData as ModuleProgress[]);

      const { data: certData } = await supabase.from('certificates').select('*').eq('user_id', user?.id ?? '').maybeSingle();
      if (certData) setCertificate(certData as Certificate);

      const { data: scoresData } = await supabase.from('quiz_attempts').select('score').eq('user_id', user?.id ?? '');
      if (scoresData) setQuizScores(scoresData);

      if (progressData) setTotalTimeMinutes(progressData.length * 300);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = async () => { await signOut(); navigate('/'); };

  const handleEnroll = async () => {
    if (!user) { navigate('/auth'); return; }
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', { body: { origin: window.location.origin } });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch {
      toast({ title: 'Error', description: 'No se pudo iniciar el proceso de pago.', variant: 'destructive' });
    }
  };

  const handleModuleClick = (moduleId: string, orderIndex: number) => {
    const isFreeModule = orderIndex < 2;
    if (!hasAccess && !isFreeModule) {
      toast({ title: 'Acceso Premium', description: 'Inscríbete para acceder a este módulo.' });
      return;
    }
    navigate(`/module/${orderIndex}`);
  };

  const isModuleCompleted = (moduleId: string) => progress.some(p => p.module_id === moduleId);

  const progressPercent = modules.length > 0 ? Math.round((progress.length / modules.length) * 100) : 0;
  const averageScore = quizScores.length > 0 ? Math.round(quizScores.reduce((acc, s) => acc + s.score, 0) / quizScores.length) : 0;

  const generateCertificate = async () => {
    if (!user || !isPaid || progress.length < modules.length) return;
    try {
      const certNumber = `UTAMV-${Date.now()}-${user.id.slice(0, 8).toUpperCase()}`;
      const { data: courseData } = await supabase.from('courses').select('id').single();
      if (!courseData) return;
      const { error } = await supabase.from('certificates').insert({ user_id: user.id, course_id: courseData.id, certificate_number: certNumber });
      if (error) throw error;
      toast({ title: '¡Certificado generado!', description: 'Tu certificación UTAMV está lista.' });
      fetchData();
    } catch {
      toast({ title: 'Error', description: 'No se pudo generar el certificado.', variant: 'destructive' });
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando Campus Virtual...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Campus Virtual UTAMV */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-background border-2 border-border flex items-center justify-center">
              <img src={utamvSeal} alt="UTAMV" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-foreground tracking-wide">Campus Virtual UTAMV</h1>
              <p className="text-[11px] text-muted-foreground tracking-wider uppercase">Primera Generación 2026–2027</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isAdmin && (
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/20 text-secondary text-[10px] font-semibold tracking-wider uppercase">
                Admin
              </span>
            )}
            <span className="text-xs text-muted-foreground hidden md:block">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={() => navigate('/settings')} className="text-muted-foreground">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
            Bienvenido, {user?.user_metadata?.full_name || 'Estudiante'}
          </h2>
          <p className="text-muted-foreground text-sm">
            {hasAccess ? 'Continúa tu formación académica en el Campus Virtual.' : 'Explora contenido gratuito o inscríbete para acceder a todo el programa.'}
          </p>
        </div>

        {/* Promo Banner for non-paid */}
        {!hasAccess && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-display text-lg font-bold text-foreground mb-3">Explora UTAMV</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Accede a módulos gratuitos, recursos educativos y la comunidad de aprendizaje.
              </p>
              <div className="space-y-2">
                {['Contenido introductorio gratuito', 'Comunidad de estudiantes', 'Prueba de evaluación'].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-card border border-secondary/30">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-secondary" />
                <h3 className="font-display text-lg font-bold text-foreground">Lanzamiento Primera Generación</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                50% de descuento para los primeros 100 estudiantes de cualquier programa.
              </p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-display font-bold text-foreground">Desde $2,450 MXN</span>
                <span className="text-sm text-muted-foreground line-through">$4,900 MXN</span>
              </div>
              <Button variant="outline" size="lg" onClick={handleEnroll} className="w-full border-secondary text-secondary hover:bg-secondary/10">
                <Sparkles className="w-4 h-4 mr-2" />
                Inscribirme con 50% OFF
              </Button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 border-b border-border">
          {[
            { key: 'modules' as const, icon: BookOpen, label: 'Módulos' },
            ...(hasAccess ? [
              { key: 'chat' as const, icon: Users, label: 'Comunidad' },
              { key: 'support' as const, icon: HeadphonesIcon, label: 'Soporte' },
            ] : []),
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.key ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}>
              <tab.icon className="w-4 h-4 inline mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'modules' && (
          <>
            {/* Progress */}
            {hasAccess && (
              <div className="mb-8">
                <ProgressChart progressPercent={progressPercent} modulesCompleted={progress.length}
                  totalModules={modules.length} totalTimeMinutes={totalTimeMinutes} averageScore={averageScore} />
              </div>
            )}

            {/* Certificate */}
            {certificate && (
              <div className="mb-8">
                <CertificateGenerator
                  studentName={user?.user_metadata?.full_name || 'Estudiante UTAMV'}
                  certificateNumber={certificate.certificate_number}
                  courseTitle="Programa Académico UTAMV — Primera Generación 2026–2027"
                  completionDate={certificate.generated_at ? new Date(certificate.generated_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Fecha no disponible'}
                  verificationUrl={`${window.location.origin}/verificar-certificado?cert=${certificate.certificate_number}`}
                />
              </div>
            )}

            {/* Generate Cert */}
            {!certificate && progressPercent === 100 && hasAccess && (
              <div className="mb-8 p-6 rounded-xl bg-card border border-secondary/30 text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-secondary" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">¡Felicitaciones!</h3>
                <p className="text-muted-foreground mb-4">Has completado todos los módulos. Genera tu certificación oficial UTAMV.</p>
                <Button variant="outline" size="lg" onClick={generateCertificate} className="border-secondary text-secondary hover:bg-secondary/10">
                  <Award className="w-5 h-5 mr-2" />
                  Generar Certificado UTAMV
                </Button>
              </div>
            )}

            {/* Modules Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Módulos del Programa
                </h3>
                <span className="text-xs text-muted-foreground">{progress.length}/{modules.length} completados</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {modules.map((module, index) => {
                  const completed = isModuleCompleted(module.id);
                  const isFreeModule = index < 2;
                  const locked = !hasAccess && !isFreeModule;
                  
                  return (
                    <div key={module.id}
                      className={`rounded-xl border overflow-hidden cursor-pointer transition-all hover:scale-[1.01] hover:border-primary/30 ${
                        completed ? 'border-secondary/40' : locked ? 'border-border opacity-60' : 'border-border'
                      } bg-card`}
                      onClick={() => handleModuleClick(module.id, module.order_index)}>
                      <div className="relative h-36 overflow-hidden">
                        <img src={`/module-${index + 1}.jpg`} alt={module.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                        
                        <div className="absolute top-3 right-3">
                          {locked ? (
                            <div className="px-2.5 py-1 rounded-full bg-card/90 border border-border flex items-center gap-1">
                              <Lock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-[10px] text-muted-foreground">Premium</span>
                            </div>
                          ) : isFreeModule && !hasAccess ? (
                            <div className="px-2.5 py-1 rounded-full bg-secondary/90 flex items-center gap-1">
                              <PlayCircle className="w-3 h-3 text-secondary-foreground" />
                              <span className="text-[10px] text-secondary-foreground font-medium">Gratis</span>
                            </div>
                          ) : completed ? (
                            <div className="px-2.5 py-1 rounded-full bg-secondary/80 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-secondary-foreground" />
                              <span className="text-[10px] text-secondary-foreground font-medium">Completado</span>
                            </div>
                          ) : (
                            <div className="px-2.5 py-1 rounded-full bg-card/90 border border-border flex items-center gap-1">
                              <PlayCircle className="w-3 h-3 text-primary" />
                              <span className="text-[10px] text-foreground">Disponible</span>
                            </div>
                          )}
                        </div>

                        <div className="absolute bottom-3 left-3">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Módulo</span>
                          <p className="text-xl font-display font-bold text-foreground">{String(index + 1).padStart(2, '0')}</p>
                        </div>
                      </div>

                      <div className="p-4">
                        <h4 className="font-display text-sm font-semibold text-foreground mb-1.5 line-clamp-2">{module.title}</h4>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{module.description}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />5 hrs</span>
                          {completed && <span className="flex items-center gap-1 text-secondary"><Star className="w-3.5 h-3.5" />Dominado</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Clock, value: '+50', label: 'Horas de contenido' },
                { icon: BookOpen, value: '10', label: 'Módulos completos' },
                { icon: Award, value: '1', label: 'Certificación UTAMV' },
                { icon: GraduationCap, value: '∞', label: 'Acceso vitalicio' },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-border text-center">
                  <s.icon className="w-7 h-7 text-primary mx-auto mb-2" />
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'chat' && hasAccess && <GeneralChat />}

        {activeTab === 'support' && hasAccess && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AISupportChat />
            <div className="space-y-6">
              <HumanSupportButton />
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-display text-base font-bold text-foreground mb-4">Recursos de Ayuda</h3>
                <ul className="space-y-2.5">
                  {['Manual del estudiante', 'FAQ con respuestas frecuentes', 'Soporte técnico 24/7', 'Comunidad de estudiantes'].map((r, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border py-5 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">Plataforma creada con Tecnología TAMV ONLINE</p>
          <p className="text-[10px] text-muted-foreground mt-1">Orgullosamente Realmontenses — Latinoamérica</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
