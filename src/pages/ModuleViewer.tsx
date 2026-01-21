import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import LessonViewer from '@/components/dashboard/LessonViewer';
import QuizSystem from '@/components/dashboard/QuizSystem';
import { useToast } from '@/hooks/use-toast';
import { getModuleContent } from '@/data/courseContent';
import { 
  ChevronLeft, 
  BookOpen, 
  FileText, 
  CheckCircle2,
  Lock,
  Play,
  Award
} from 'lucide-react';

const ModuleViewer = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { user, isPaid, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [moduleCompleted, setModuleCompleted] = useState(false);

  const moduleIndex = parseInt(moduleId || '1');
  const moduleContent = getModuleContent(moduleIndex);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }
    if (!loading && !isPaid) {
      toast({
        title: 'Acceso restringido',
        description: 'Debes inscribirte para acceder al contenido.',
        variant: 'destructive',
      });
      navigate('/dashboard');
    }
  }, [user, isPaid, loading, navigate, toast]);

  if (loading || !isPaid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!moduleContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Módulo no encontrado
          </h2>
          <Button onClick={() => navigate('/dashboard')}>
            Volver al Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const lessons = moduleContent.lessons;
  const currentLesson = lessons[currentLessonIndex];
  const progress = ((completedLessons.length) / lessons.length) * 100;

  const handleLessonComplete = () => {
    if (!completedLessons.includes(currentLessonIndex)) {
      setCompletedLessons(prev => [...prev, currentLessonIndex]);
      toast({
        title: '¡Lección completada!',
        description: `Has completado: ${currentLesson.title}`,
      });
    }
  };

  const handleQuizComplete = async (score: number, passed: boolean) => {
    if (passed) {
      setModuleCompleted(true);
      
      // Mark module as complete in database
      try {
        const { data: modules } = await supabase
          .from('modules')
          .select('id')
          .eq('order_index', moduleIndex)
          .single();

        if (modules && user) {
          await supabase
            .from('module_progress')
            .insert({
              user_id: user.id,
              module_id: modules.id,
            });
        }
      } catch (err) {
        console.error('Error saving progress:', err);
      }

      toast({
        title: '¡Módulo completado!',
        description: `Has aprobado con ${score}%. ¡Excelente trabajo!`,
      });
    } else {
      toast({
        title: 'Sigue intentando',
        description: `Obtuviste ${score}%. Necesitas 70% para aprobar.`,
        variant: 'destructive',
      });
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    } else {
      // All lessons completed, show quiz
      setShowQuiz(true);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    }
  };

  // Convert lesson quiz to component format
  const quizQuestions = currentLesson.quiz?.map((q, i) => ({
    id: `q-${i}`,
    text: q.question,
    answers: q.options.map((opt, j) => ({
      id: `a-${i}-${j}`,
      text: opt,
      is_correct: j === q.correctAnswer
    }))
  })) || [];

  // Full module quiz (combine all lesson quizzes)
  const moduleQuizQuestions = lessons.flatMap((lesson, lessonIndex) =>
    (lesson.quiz || []).map((q, i) => ({
      id: `mq-${lessonIndex}-${i}`,
      text: q.question,
      answers: q.options.map((opt, j) => ({
        id: `ma-${lessonIndex}-${i}-${j}`,
        text: opt,
        is_correct: j === q.correctAnswer
      }))
    }))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Dashboard
            </Button>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Módulo {moduleIndex} de 10
              </span>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Lesson List */}
          <div className="lg:col-span-1">
            <div className="card-elite p-4 sticky top-24">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                {moduleContent.title}
              </h3>
              
              <div className="space-y-2">
                {lessons.map((lesson, index) => {
                  const isCompleted = completedLessons.includes(index);
                  const isCurrent = index === currentLessonIndex && !showQuiz;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => { setShowQuiz(false); setCurrentLessonIndex(index); }}
                      className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                        isCurrent 
                          ? 'bg-primary/20 border border-primary/50' 
                          : isCompleted
                          ? 'bg-muted/50 border border-border'
                          : 'bg-muted/30 border border-transparent hover:border-border'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate ${isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {lesson.duration} min
                        </p>
                      </div>
                    </button>
                  );
                })}
                
                {/* Quiz section */}
                <button
                  onClick={() => setShowQuiz(true)}
                  disabled={completedLessons.length < lessons.length}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                    showQuiz
                      ? 'bg-secondary/20 border border-secondary/50'
                      : completedLessons.length >= lessons.length
                      ? 'bg-muted/30 border border-transparent hover:border-border'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    moduleCompleted ? 'bg-primary text-primary-foreground' : 'bg-secondary/30'
                  }`}>
                    {moduleCompleted ? (
                      <Award className="w-4 h-4" />
                    ) : completedLessons.length >= lessons.length ? (
                      <FileText className="w-4 h-4 text-secondary" />
                    ) : (
                      <Lock className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${showQuiz ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      Examen del Módulo
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {completedLessons.length < lessons.length 
                        ? 'Completa las lecciones primero'
                        : moduleCompleted 
                        ? 'Aprobado ✓' 
                        : '10 preguntas'}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {showQuiz ? (
              <QuizSystem
                quizId={`module-${moduleIndex}-quiz`}
                quizTitle={`Examen: ${moduleContent.title}`}
                questions={moduleQuizQuestions}
                passingScore={70}
                onComplete={handleQuizComplete}
                isFinalExam={false}
              />
            ) : (
              <LessonViewer
                lesson={{
                  id: `lesson-${moduleIndex}-${currentLessonIndex}`,
                  title: currentLesson.title,
                  content: currentLesson.content,
                  audio_content: currentLesson.audioContent,
                  order_index: currentLessonIndex + 1,
                  duration_minutes: currentLesson.duration
                }}
                moduleTitle={moduleContent.title}
                onComplete={handleLessonComplete}
                onNext={handleNextLesson}
                onPrevious={handlePreviousLesson}
                isCompleted={completedLessons.includes(currentLessonIndex)}
                hasNext={currentLessonIndex < lessons.length - 1 || completedLessons.length >= lessons.length - 1}
                hasPrevious={currentLessonIndex > 0}
              />
            )}

            {/* Mini Quiz after each lesson */}
            {!showQuiz && completedLessons.includes(currentLessonIndex) && quizQuestions.length > 0 && (
              <div className="mt-8">
                <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary" />
                  Cuestionario de Refuerzo
                </h3>
                <div className="card-elite p-6">
                  {quizQuestions.map((q, index) => (
                    <div key={q.id} className="mb-6 last:mb-0">
                      <p className="font-medium text-foreground mb-3">{index + 1}. {q.text}</p>
                      <div className="space-y-2">
                        {q.answers.map((a) => (
                          <div
                            key={a.id}
                            className={`p-3 rounded-lg border ${
                              a.is_correct 
                                ? 'border-primary/50 bg-primary/10' 
                                : 'border-border bg-muted/30'
                            }`}
                          >
                            <span className={a.is_correct ? 'text-primary' : 'text-muted-foreground'}>
                              {a.text}
                              {a.is_correct && ' ✓'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleViewer;
