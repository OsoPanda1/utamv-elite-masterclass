import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  Image as ImageIcon,
} from "lucide-react";

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
  hasPrevious,
}: LessonViewerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // visual only
  const [progress, setProgress] = useState(0);
  const [voiceReady, setVoiceReady] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Inicializar voces TTS
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const handleVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      setVoiceReady(voices.length > 0);
    };
    window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
    handleVoicesChanged();
    return () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        handleVoicesChanged,
      );
    };
  }, []);

  // Detener TTS al cambiar de lección o desmontar
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setProgress(0);
  }, [lesson.id]);

  // TTS Isabella-es
  const speakContent = () => {
    if (!("speechSynthesis" in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const text = lesson.audio_content || lesson.content || "";
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = 0.92;
    utterance.pitch = 1.08;

    const voices = window.speechSynthesis.getVoices();
    const femaleSpanishVoice =
      voices.find(
        (voice) =>
          voice.lang.startsWith("es") &&
          [
            "female",
            "paulina",
            "monica",
            "helena",
            "laura",
            "conchita",
            "lucia",
            "elvira",
            "sabina",
          ].some((token) => voice.name.toLowerCase().includes(token)),
      ) || voices.find((voice) => voice.lang.startsWith("es"));

    if (femaleSpanishVoice) {
      utterance.voice = femaleSpanishVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    utterance.onboundary = (event) => {
      if (!text.length) return;
      const percent = (event.charIndex / text.length) * 100;
      setProgress(Math.min(100, percent));
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    // No hay mute nativo: solo feedback visual y opción de cancelar si quisieras
    setIsMuted((prev) => !prev);
  };

  // Parsing de contenido a “cuerpo académico”
  const renderContent = () => {
    const content = lesson.content || "";
    const sections = content.split("\n\n").filter(Boolean);

    return sections.map((section, index) => {
      if (section.startsWith("##")) {
        return (
          <h3
            key={index}
            className="text-xl font-display font-semibold text-foreground mt-6 mb-3"
          >
            {section.replace(/^##\s*/, "")}
          </h3>
        );
      }

      if (section.includes("\n- ") || section.startsWith("- ")) {
        const items = section.split("\n- ").filter(Boolean);
        return (
          <ul key={index} className="space-y-2 my-4">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span>{item.replace(/^-\\s*/, "")}</span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p
          key={index}
          className="text-muted-foreground leading-relaxed mb-4 text-[15px]"
        >
          {section}
        </p>
      );
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl shadow-black/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-card via-muted/40 to-card p-6 border-b border-border">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            <span className="uppercase tracking-[0.22em]">
              {moduleTitle}
            </span>
          </div>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-xs md:text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              Lección completada
            </span>
          )}
        </div>
        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
          {lesson.title}
        </h2>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {lesson.duration_minutes} min estimados
          </span>
          <span className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            Lección {lesson.order_index}
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-xs text-muted-foreground/80">
            <Sparkles className="w-3 h-3" />
            Texto + narración IA en español
          </span>
        </div>
      </div>

      {/* Video (opcional) */}
      {lesson.video_url && (
        <div className="aspect-video bg-muted relative">
          <iframe
            src={lesson.video_url}
            className="w-full h-full"
            loading="lazy"
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Controles de audio / TTS */}
      <div className="p-4 bg-muted/30 border-b border-border">
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={speakContent}
            className="gap-2"
            disabled={!voiceReady}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                Pausar narración
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Escuchar lección
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            disabled={!voiceReady}
            className={isMuted ? "text-muted-foreground/70" : ""}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>

          <div className="flex-1 min-w-[120px]">
            <Progress value={progress} className="h-1" />
          </div>

          <span className="text-xs text-muted-foreground tabular-nums w-12 text-right">
            {Math.round(progress)}%
          </span>
        </div>
        {!voiceReady && (
          <p className="mt-2 text-[11px] text-muted-foreground">
            La narración puede tardar unos segundos en activarse según tu
            navegador.
          </p>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6 md:p-8">
        {/* Resumen académico corto (podrías generar uno en el backend) */}
        <div className="mb-6 rounded-xl border border-border bg-muted/20 px-4 py-3 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">
              Objetivo de la lección
            </p>
            <p className="text-sm text-muted-foreground">
              Al finalizar esta lección serás capaz de comprender y aplicar los
              conceptos clave para avanzar al siguiente nivel del módulo.
            </p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          {renderContent()}
        </div>

        {/* Placeholder visual / esquemas */}
        <div className="my-8 p-6 md:p-8 rounded-xl bg-muted/20 border border-dashed border-border flex flex-col items-center justify-center gap-3">
          <ImageIcon className="w-10 h-10 text-muted-foreground" />
          <p className="text-xs md:text-sm text-muted-foreground text-center max-w-md">
            Aquí podrás visualizar esquemas, mapas mentales o gráficos
            complementarios de la lección.
          </p>
        </div>
      </div>

      {/* Navegación inferior */}
      <div className="p-4 md:p-6 bg-muted/30 border-t border-border flex items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <div className="flex items-center gap-3">
          {!isCompleted && (
            <Button
              variant="elite"
              onClick={onComplete}
              className="gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Marcar como completada
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
