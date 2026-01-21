import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Bot, 
  User,
  Sparkles,
  Loader2
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Predefined responses for common questions
const AI_RESPONSES: Record<string, string> = {
  'certificado': `Para obtener tu certificado UTAMV, debes:
1. Completar los 10 módulos del programa
2. Aprobar todos los exámenes de módulo (mínimo 70%)
3. Aprobar el examen final (mínimo 80%)

Una vez cumplidos estos requisitos, podrás generar tu certificado digital desde el dashboard.`,

  'examen': `Los exámenes en el Master Marketing Digital 360:
• Exámenes de módulo: 10 preguntas, 30 minutos, mínimo 70%
• Examen final: 50 preguntas, 60 minutos, mínimo 80%

Tienes intentos ilimitados. El sistema anti-plagio está activo.`,

  'pago': `El Master Marketing Digital Elite 360 tiene un costo único de $199 USD.
Incluye:
• Acceso vitalicio a los 10 módulos
• Certificación académica UTAMV
• Acceso al chat de la comunidad
• Soporte técnico

Para inscribirte, ve a la sección de precios en la página principal.`,

  'soporte': `Para contactar soporte humano:
📧 Email: tamvonlinenetwork@outlook.es

Responderemos tu consulta en 24-48 horas hábiles.`,

  'modulos': `El Master incluye 10 módulos:
1. Fundamentos del Marketing Digital 2026
2. SEO Avanzado con IA
3. Geo-Targeting y Localización Estratégica
4. Metadatos y Arquitectura de Información
5. Clientes en Respuestas de IA
6. Marketing Predictivo y Automatización
7. Narrativas Digitales y Branding 2026
8. Estrategias Multicanal y Metaverso
9. Monetización y Transparencia
10. Proyecto Final: Master en Acción`,

  'default': `¡Hola! Soy el asistente IA del Master Marketing Digital Elite 360.

Puedo ayudarte con:
• Información sobre el programa y módulos
• Dudas sobre certificación
• Preguntas sobre exámenes
• Información de pago
• Contacto con soporte humano

¿En qué puedo ayudarte hoy?`
};

const findResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('certificado') || lowerQuery.includes('diploma')) {
    return AI_RESPONSES['certificado'];
  }
  if (lowerQuery.includes('examen') || lowerQuery.includes('test') || lowerQuery.includes('prueba')) {
    return AI_RESPONSES['examen'];
  }
  if (lowerQuery.includes('pago') || lowerQuery.includes('precio') || lowerQuery.includes('costo') || lowerQuery.includes('inscrib')) {
    return AI_RESPONSES['pago'];
  }
  if (lowerQuery.includes('soporte') || lowerQuery.includes('ayuda') || lowerQuery.includes('contacto') || lowerQuery.includes('email')) {
    return AI_RESPONSES['soporte'];
  }
  if (lowerQuery.includes('modulo') || lowerQuery.includes('contenido') || lowerQuery.includes('curso')) {
    return AI_RESPONSES['modulos'];
  }
  
  return `Gracias por tu pregunta sobre "${query}".

Para obtener una respuesta más detallada, te sugiero:
• Revisar el contenido del módulo relacionado
• Contactar a soporte: tamvonlinenetwork@outlook.es

¿Hay algo más específico en lo que pueda ayudarte?`;
};

const AISupportChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: AI_RESPONSES['default'],
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = findResponse(userMessage.content);
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const quickQuestions = [
    '¿Cómo obtengo mi certificado?',
    '¿Cómo funcionan los exámenes?',
    '¿Cuál es el precio?',
    '¿Cómo contacto soporte?'
  ];

  return (
    <div className="card-elite flex flex-col h-[500px]">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Asistente IA</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Siempre disponible
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'assistant' ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  {msg.role === 'assistant' ? (
                    <Bot className="w-4 h-4 text-primary" />
                  ) : (
                    <User className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted rounded-bl-none'
                  }`}
                >
                  <p className={`text-sm whitespace-pre-line ${
                    msg.role === 'user' ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                    {msg.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-3">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick questions */}
      <div className="px-4 py-2 border-t border-border">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="px-3 py-1.5 bg-muted rounded-full text-xs text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AISupportChat;
