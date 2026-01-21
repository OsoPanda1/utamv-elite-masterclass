import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  Clock,
  Sparkles,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  video_url?: string;
  audio_content?: string;
  order_index: number;
  duration_minutes: number;
}

interface LessonViewerProps {
  lesson: Lesson;
  moduleTitle: string;
  onComplete: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  isCompleted: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

const LessonViewer = ({
  lesson,
  moduleTitle,
  onComplete,
  onNext,
  onPrevious,
  isCompleted,
  hasNext,
  hasPrevious
}: LessonViewerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Browser TTS implementation
  const speakContent = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      const text = lesson.audio_content || lesson.content || '';
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
      };
      
      utterance.onboundary = (event) => {
        const percent = (event.charIndex / text.length) * 100;
        setProgress(percent);
      };

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (speechRef.current) {
      // Browser TTS doesn't support mute, so we cancel and show visual feedback
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [lesson.id]);

  // Parse lesson content for rich display
  const renderContent = () => {
    const content = lesson.content || '';
    
    // Split content into sections
    const sections = content.split('\n\n').filter(Boolean);
    
    return sections.map((section, index) => {
      // Check if it's a heading
      if (section.startsWith('##')) {
        return (
          <h3 key={index} className="text-xl font-display font-semibold text-foreground mt-6 mb-3">
            {section.replace(/^##\s*/, '')}
          </h3>
        );
      }
      
      // Check if it's a list
      if (section.includes('\n- ') || section.startsWith('- ')) {
        const items = section.split('\n- ').filter(Boolean);
        return (
          <ul key={index} className="space-y-2 my-4">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span>{item.replace(/^-\s*/, '')}</span>
              </li>
            ))}
          </ul>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {section}
        </p>
      );
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-card p-6 border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <BookOpen className="w-4 h-4" />
          <span>{moduleTitle}</span>
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          {lesson.title}
        </h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {lesson.duration_minutes} min
          </span>
          <span className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            Lección {lesson.order_index}
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-primary">
              <CheckCircle2 className="w-4 h-4" />
              Completada
            </span>
          )}
        </div>
      </div>

      {/* Video Section (if available) */}
      {lesson.video_url && (
        <div className="aspect-video bg-muted relative">
          <iframe
            src={lesson.video_url}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Audio Controls */}
      <div className="p-4 bg-muted/30 border-b border-border">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={speakContent}
            className="gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                Pausar Audio
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Escuchar Lección
              </>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>

          <div className="flex-1">
            <Progress value={progress} className="h-1" />
          </div>
          
          <span className="text-xs text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="prose prose-invert max-w-none">
          {renderContent()}
        </div>

        {/* Image Placeholder */}
        <div className="my-8 p-8 rounded-xl bg-muted/20 border border-border flex flex-col items-center justify-center gap-4">
          <ImageIcon className="w-12 h-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">
            Imagen ilustrativa del concepto
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 bg-muted/30 border-t border-border flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <div className="flex items-center gap-4">
          {!isCompleted && (
            <Button
              variant="elite"
              onClick={onComplete}
              className="gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Marcar Completada
            </Button>
          )}
        </div>

        <Button
          variant="outline"
          onClick={onNext}
          disabled={!hasNext}
          className="gap-2"
        >
          Siguiente
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default LessonViewer;
