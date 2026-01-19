-- Profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  stripe_customer_id TEXT,
  is_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER DEFAULT 19900,
  stripe_price_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Modules table
CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  order_index INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Module progress tracking
CREATE TABLE public.module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Quizzes table
CREATE TABLE public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  is_final_exam BOOLEAN DEFAULT false,
  passing_score INTEGER DEFAULT 70,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Questions table
CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Answers table
CREATE TABLE public.answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Quiz attempts
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,
  passed BOOLEAN DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  stripe_payment_intent_id TEXT,
  stripe_session_id TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Certificates table
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  certificate_number TEXT NOT NULL UNIQUE,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Helper function to check course access
CREATE OR REPLACE FUNCTION public.has_course_access(p_user_id UUID, p_course_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = p_user_id AND is_paid = true
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Courses policies (publicly viewable)
CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);

-- Modules policies (publicly viewable)
CREATE POLICY "Anyone can view modules" ON public.modules FOR SELECT USING (true);

-- Module progress policies
CREATE POLICY "Users can view own progress" ON public.module_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.module_progress FOR INSERT WITH CHECK (auth.uid() = user_id AND public.has_course_access(auth.uid(), (SELECT course_id FROM public.modules WHERE id = module_id)));
CREATE POLICY "Users can update own progress" ON public.module_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own progress" ON public.module_progress FOR DELETE USING (auth.uid() = user_id);

-- Quizzes policies (accessible to paid users)
CREATE POLICY "Paid users can view quizzes" ON public.quizzes FOR SELECT USING (public.has_course_access(auth.uid(), course_id) OR public.has_course_access(auth.uid(), (SELECT course_id FROM public.modules WHERE id = module_id)));

-- Questions policies
CREATE POLICY "Paid users can view questions" ON public.questions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.quizzes q WHERE q.id = quiz_id AND (
    public.has_course_access(auth.uid(), q.course_id) OR 
    public.has_course_access(auth.uid(), (SELECT course_id FROM public.modules WHERE id = q.module_id))
  ))
);

-- Answers policies
CREATE POLICY "Paid users can view answers" ON public.answers FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.questions q JOIN public.quizzes qz ON q.quiz_id = qz.id WHERE q.id = question_id AND (
    public.has_course_access(auth.uid(), qz.course_id) OR 
    public.has_course_access(auth.uid(), (SELECT course_id FROM public.modules WHERE id = qz.module_id))
  ))
);

-- Quiz attempts policies
CREATE POLICY "Users can view own attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own payments" ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Certificates policies
CREATE POLICY "Users can view own certificates" ON public.certificates FOR SELECT USING (auth.uid() = user_id);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the Master course
INSERT INTO public.courses (id, title, description, price_cents, stripe_price_id) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Master Elite Profesional en Marketing Digital 2026', 'Programa de certificación internacional acreditado por UTAMV. Domina SEO, metadatos, geo-targeting y posicionamiento avanzado con IA.', 19900, NULL);

-- Insert the 10 modules
INSERT INTO public.modules (course_id, title, description, order_index, image_url) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Fundamentos del Marketing Digital 2026', 'Historia, evolución y tendencias. Rol de los metadatos en la nueva era digital.', 1, '/module-1.jpg'),
('550e8400-e29b-41d4-a716-446655440000', 'SEO Avanzado con IA', 'Indexación inteligente. Optimización semántica y predictiva.', 2, '/module-2.jpg'),
('550e8400-e29b-41d4-a716-446655440000', 'Geo-Targeting y Localización Estratégica', 'Cómo aparecer en búsquedas locales. Integración con mapas y clientes cercanos.', 3, '/module-3.jpg'),
('550e8400-e29b-41d4-a716-446655440000', 'Metadatos y Arquitectura de Información', 'Diseño de etiquetas únicas. Estrategias de visibilidad en ecosistemas digitales.', 4, '/module-4.jpg'),
('550e8400-e29b-41d4-a716-446655440000', 'Clientes en Respuestas de IA', 'Cómo integrar bases de datos de clientes. Técnicas para búsquedas personalizadas.', 5, '/module-5.jpg'),
('550e8400-e29b-41d4-a716-446655440000', 'Marketing Predictivo y Automatización', 'IA como motor de campañas. Automatización ceremonial y transparente.', 6, '/module-6.jpg'),
('550e8400-e29b-41d4-a716-446655440000', 'Narrativas Digitales y Branding 2026', 'Construcción de identidad sólida. Storytelling con metadatos.', 7, '/module-7.jpg'),
('550e8400-e29b-41d4-a716-446655440000', 'Estrategias Multicanal y Metaverso', 'SEO en XR y entornos inmersivos. Marketing en ecosistemas híbridos.', 8, '/module-8.jpg'),
('550e8400-e29b-41d4-a716-446655440000', 'Monetización y Transparencia', 'Modelos de negocio éticos. UTAMV como garante de confianza.', 9, '/module-9.jpg'),
('550e8400-e29b-41d4-a716-446655440000', 'Proyecto Final: Master en Acción', 'Caso práctico con clientes reales. Integración de todo lo aprendido.', 10, '/module-10.jpg');

-- Create quizzes for each module
INSERT INTO public.quizzes (module_id, course_id, title, is_final_exam, passing_score) 
SELECT m.id, m.course_id, 'Evaluación: ' || m.title, false, 70
FROM public.modules m WHERE m.course_id = '550e8400-e29b-41d4-a716-446655440000';

-- Create final exam
INSERT INTO public.quizzes (course_id, title, is_final_exam, passing_score) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Examen Final: Master Elite en Marketing Digital 2026', true, 70);