import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, Loader2, AlertCircle, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

/**
 * PublicVisitorChat - AI Chat for non-authenticated visitors
 * Allows visitors to ask questions with rate limiting
 * Based on UTAMV AI Academic Core 2026 principles
 */
const PublicVisitorChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `¡Hola! Soy Isabella, tu guía académica de UTAMV.

Puedo ayudarte con:
• Información sobre nuestros programas académicos
• Proceso de admisión e inscripción
• Precios y opciones de financiamiento
• Contenido y temario de cursos
• Certificaciones y beneficios

¿En qué puedo ayudarte hoy?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => {
    // Create or get anonymous session ID for rate limiting
    let sid = localStorage.getItem('utamv_visitor_session');
    if (!sid) {
      sid = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('utamv_visitor_session', sid);
    }
    return sid;
  });
  const [quotaUsed, setQuotaUsed] = useState(0);
  const [quotaLimit, setQuotaLimit] = useState(5); // Lower limit for visitors
  const [limitReached, setLimitReached] = useState(false);

  const scrollBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Check rate limit on mount
  useEffect(() => {
    checkRateLimit();
  }, []);

  const checkRateLimit = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("public-ai-support", {
        body: { action: "check_limit", session_id: sessionId },
      });
      
      if (!error && data) {
        setQuotaUsed(data.quota_used || 0);
        setQuotaLimit(data.quota_limit || 5);
        setLimitReached(data.limit_reached || false);
      }
    } catch (err) {
      console.error("Rate limit check error:", err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping || limitReached) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke("public-ai-support", {
        body: {
          action: "chat",
          message: userMessage.content,
          session_id: sessionId,
          history: messages.filter((m) => m.id !== "1").map((m) => ({
            role: m.role,
            content: m.content,
          })),
        },
      });

      if (error) throw error;

      if (data?.error === "RATE_LIMIT_REACHED") {
        setLimitReached(true);
        setQuotaUsed(data.quota_used);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.message,
            timestamp: new Date(),
          },
        ]);
      } else {
        setQuotaUsed(data.quota_used ?? quotaUsed + 1);
        setQuotaLimit(data.quota_limit ?? 5);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.reply,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      console.error("Public AI Support error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Lo siento, hubo un error al procesar tu pregunta. Por favor intenta de nuevo o contáctanos en: tamvonlinenetwork@outlook.es",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "¿Cuál es el precio del programa?",
    "¿Cómo me inscribo?",
    "¿Qué incluye la certificación?",
    "¿Hay financiamiento?",
  ];

  const remaining = quotaLimit - quotaUsed;

  return (
    <div className="flex flex-col h-[450px]">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">Isabella IA</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Chat para visitantes
            </p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground text-right">
          <span className={remaining <= 1 ? "text-destructive font-medium" : ""}>
            {remaining}/{quotaLimit} mensajes
          </span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "assistant" ? "bg-primary/20" : "bg-muted"}`}>
                  {msg.role === "assistant" ? <Bot className="w-3.5 h-3.5 text-primary" /> : <User className="w-3.5 h-3.5 text-muted-foreground" />}
                </div>
                <div className={`rounded-2xl px-3 py-2 ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted rounded-bl-none"}`}>
                  <p className={`text-sm whitespace-pre-line ${msg.role === "user" ? "text-primary-foreground" : "text-foreground"}`}>
                    {msg.content}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-none px-3 py-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}

          <div ref={scrollBottomRef} />
        </div>
      </ScrollArea>

      {/* Limit warning with CTA */}
      {limitReached && (
        <div className="px-3 py-3 bg-teal/10 border-t border-teal/20">
          <div className="flex items-center gap-2 text-xs text-teal mb-2">
            <Lock className="w-4 h-4" />
            <span className="font-medium">Límite de visitante alcanzado</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Regístrate gratis para continuar chateando y acceder a más beneficios.
          </p>
          <Button 
            variant="teal" 
            size="sm" 
            className="w-full"
            onClick={() => navigate('/auth')}
          >
            Crear cuenta gratis
          </Button>
        </div>
      )}

      {/* Quick questions */}
      {!limitReached && (
        <div className="px-3 py-2 border-t border-border">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-border">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={limitReached ? "Regístrate para continuar..." : "Escribe tu pregunta..."}
            className="flex-1 text-sm"
            disabled={isTyping || limitReached}
          />
          <Button type="submit" disabled={!input.trim() || isTyping || limitReached} size="icon" className="h-9 w-9">
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PublicVisitorChat;
