-- Create lessons table for individual lesson content
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  audio_content TEXT,
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on lessons
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Paid users can view lessons
CREATE POLICY "Paid users can view lessons" ON public.lessons
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM modules m
    WHERE m.id = lessons.module_id
    AND has_course_access(auth.uid(), m.course_id)
  )
);

-- Create lesson_progress for tracking individual lesson completion
CREATE TABLE public.lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS on lesson_progress
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- Users can view own lesson progress
CREATE POLICY "Users can view own lesson progress" ON public.lesson_progress
FOR SELECT USING (auth.uid() = user_id);

-- Users can insert own lesson progress
CREATE POLICY "Users can insert own lesson progress" ON public.lesson_progress
FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  has_course_access(auth.uid(), (
    SELECT m.course_id FROM lessons l
    JOIN modules m ON m.id = l.module_id
    WHERE l.id = lesson_progress.lesson_id
  ))
);

-- Create chat_messages table for general chat
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  user_name TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_flagged BOOLEAN DEFAULT false
);

-- Enable RLS on chat_messages
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Paid users can view chat messages
CREATE POLICY "Paid users can view chat messages" ON public.chat_messages
FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_paid = true)
);

-- Paid users can insert chat messages
CREATE POLICY "Paid users can insert chat messages" ON public.chat_messages
FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_paid = true)
);

-- Create support_tickets for human support
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Users can view own tickets
CREATE POLICY "Users can view own tickets" ON public.support_tickets
FOR SELECT USING (auth.uid() = user_id);

-- Users can create tickets
CREATE POLICY "Users can create tickets" ON public.support_tickets
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add realtime for chat messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- Insert sample course data
INSERT INTO public.courses (id, title, description, price_cents, stripe_price_id)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Master en Marketing Digital Elite 360',
  'Programa profesional de certificación en Marketing Digital con enfoque en SEO, GEO, AEO y estrategias avanzadas.',
  19900,
  'price_master_marketing_360'
) ON CONFLICT DO NOTHING;

-- Insert the 10 modules
INSERT INTO public.modules (course_id, title, description, order_index, content) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Fundamentos del Marketing Digital 2026', 'Historia, evolución y tendencias. Rol de los metadatos en la nueva era digital.', 1, 'Contenido del módulo 1'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'SEO Avanzado con IA', 'Indexación inteligente, optimización semántica y predictiva con inteligencia artificial.', 2, 'Contenido del módulo 2'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Geo-Targeting y Localización Estratégica', 'Cómo aparecer en búsquedas locales e integración con mapas y clientes cercanos.', 3, 'Contenido del módulo 3'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Metadatos y Arquitectura de Información', 'Diseño de etiquetas únicas y estrategias de visibilidad en ecosistemas digitales.', 4, 'Contenido del módulo 4'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Clientes en Respuestas de IA', 'Integración de bases de datos de clientes y técnicas para aparecer en búsquedas personalizadas.', 5, 'Contenido del módulo 5'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Marketing Predictivo y Automatización', 'IA como motor de campañas y automatización ceremonial y transparente.', 6, 'Contenido del módulo 6'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Narrativas Digitales y Branding 2026', 'Construcción de identidad sólida y storytelling con metadatos.', 7, 'Contenido del módulo 7'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Estrategias Multicanal y Metaverso', 'SEO en XR, entornos inmersivos y marketing en ecosistemas híbridos.', 8, 'Contenido del módulo 8'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Monetización y Transparencia', 'Modelos de negocio éticos. UTAMV como garante de confianza.', 9, 'Contenido del módulo 9'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Proyecto Final: Master en Acción', 'Caso práctico con clientes reales. Integración de todo lo aprendido.', 10, 'Contenido del módulo 10')
ON CONFLICT DO NOTHING;