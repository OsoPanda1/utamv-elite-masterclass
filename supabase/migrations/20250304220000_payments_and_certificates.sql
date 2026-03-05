-- ============================================
-- UTAMV Campus - Sistema de Pagos y Certificaciones
-- Migration: 20250304220000
-- ============================================

-- ============================================
-- 1. TABLAS DE PROGRAMAS COMERCIALIZABLES
-- ============================================

-- Extensión para programas si no existe
ALTER TABLE IF EXISTS public.programs 
ADD COLUMN IF NOT EXISTS price_cents integer CHECK (price_cents >= 0),
ADD COLUMN IF NOT EXISTS currency text DEFAULT 'mxn',
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- Tabla de programas si no existe
CREATE TABLE IF NOT EXISTS public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'mxn',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- 2. TABLAS DE ÓRDENES Y PAGOS
-- ============================================

-- Órdenes de compra (intento de compra, carrito)
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  program_id uuid not null references public.programs(id),
  status text not null check (status in ('pending','paid','cancelled','expired','refunded')),
  total_amount_cents integer not null check (total_amount_cents >= 0),
  currency text not null default 'mxn',
  external_checkout_id text,  -- id de sesión de Stripe u otro
  metadata jsonb default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Pagos (registro por transacción)
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id),
  provider text not null default 'stripe',
  provider_payment_id text not null, -- payment_intent o similar
  amount_cents integer not null,
  currency text not null default 'mxn',
  status text not null check (status in ('succeeded','failed','refunded','pending','disputed')),
  raw_payload jsonb, -- webhook completo
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

-- Índices para órdenes y pagos
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_program ON public.orders(program_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_external ON public.orders(external_checkout_id);
CREATE INDEX IF NOT EXISTS idx_payments_order ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_provider ON public.payments(provider_payment_id);

-- ============================================
-- 3. TABLAS DE MATRÍCULAS
-- ============================================

-- Estados de inscripción
CREATE TYPE IF NOT EXISTS enrollment_status AS ENUM (
  'preinscrito',    -- Interés registrado, sin pago
  'inscrito',       -- Pagado, acceso inicial
  'en_curso',       -- Activo y progresando
  'completado',     -- Finalizó todos los requisitos
  'egresado',       -- Aprobó, pendiente de título
  'titulado',       -- Con título/certificado emitido
  'suspendido',     -- Pausado temporalmente
  'baja',           -- Dado de baja
  'revocado'        -- Acceso cancelado
);

-- Matrículas (relación usuario-programa)
CREATE TABLE IF NOT EXISTS public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  program_id uuid not null references public.programs(id),
  order_id uuid references public.orders(id),
  status text not null default 'preinscrito' check (status in ('preinscrito','inscrito','en_curso','completado','egresado','titulado','suspendido','baja','revocado')),
  progress_percent numeric(5,2) default 0 check (progress_percent >= 0 and progress_percent <= 100),
  final_grade numeric(5,2) check (final_grade >= 0 and final_grade <= 100),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  revoked_at timestamptz,
  metadata jsonb default '{}',
  constraint unique_user_program unique (user_id, program_id)
);

-- Índices para matrículas
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_program ON public.enrollments(program_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON public.enrollments(status);

-- ============================================
-- 4. TABLAS DE PROGRESO ACADÉMICO
-- ============================================

-- Progreso por lección (si no existe)
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  enrollment_id uuid references public.enrollments(id),
  module_id text not null,
  lesson_id text not null,
  completed boolean not null default false,
  completion_date timestamptz,
  grade numeric(5,2) check (grade >= 0 and grade <= 100),
  attempts integer default 0,
  metadata jsonb default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint unique_user_lesson unique (user_id, lesson_id)
);

-- Evaluaciones/exámenes
CREATE TABLE IF NOT EXISTS public.assessments (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id),
  module_id text,
  title text not null,
  description text,
  type text not null check (type in ('tarea','examen','proyecto','participacion')),
  weight_percent numeric(5,2) not null check (weight_percent > 0 and weight_percent <= 100),
  min_grade numeric(5,2) default 60 check (min_grade >= 0 and min_grade <= 100),
  is_required boolean default true,
  due_date timestamptz,
  created_at timestamptz not null default now()
);

-- Calificaciones del estudiante
CREATE TABLE IF NOT EXISTS public.grades (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  enrollment_id uuid not null references public.enrollments(id),
  assessment_id uuid not null references public.assessments(id),
  grade numeric(5,2) not null check (grade >= 0 and grade <= 100),
  feedback text,
  submitted_at timestamptz,
  graded_at timestamptz,
  graded_by uuid references auth.users(id),
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

-- ============================================
-- 5. TABLAS DE CERTIFICADOS
-- ============================================

-- Plantillas de certificado
CREATE TABLE IF NOT EXISTS public.certificate_templates (
  id uuid primary key default gen_random_uuid(),
  code text unique not null, -- ej: "MAESTRIA_STD_2026"
  name text not null,
  description text,
  program_type text not null check (program_type in ('maestria','master','diplomado','certificacion','curso')),
  html_template text not null, -- plantilla HTML con placeholders
  css_styles text, -- estilos CSS adicionales
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Solicitudes de certificado
CREATE TABLE IF NOT EXISTS public.certificate_requests (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.enrollments(id),
  requested_by uuid not null references auth.users(id),
  status text not null default 'pending' check (status in ('pending','approved','rejected','processing')),
  reason text,
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id),
  notes text,
  created_at timestamptz not null default now()
);

-- Certificados emitidos
CREATE TABLE IF NOT EXISTS public.certificates (
  id uuid primary key default gen_random_uuid(),
  public_id text unique not null, -- ID público para verificación
  user_id uuid not null references auth.users(id),
  enrollment_id uuid not null references public.enrollments(id),
  program_id uuid not null references public.programs(id),
  template_id uuid not null references public.certificate_templates(id),
  status text not null default 'valid' check (status in ('valid','revoked')),
  issue_date date not null,
  revoke_date date,
  revoke_reason text,
  grade numeric(5,2) check (grade >= 0 and grade <= 100),
  final_average numeric(5,2) check (final_average >= 0 and final_average <= 100),
  extra_data jsonb default '{}', -- campos adicionales (proyecto, menciones)
  pdf_url text,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id)
);

-- Índices para certificados
CREATE INDEX IF NOT EXISTS idx_certificates_user ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_public ON public.certificates(public_id);
CREATE INDEX IF NOT EXISTS idx_certificates_enrollment ON public.certificates(enrollment_id);

-- ============================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users insert own orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own orders"
ON public.orders FOR UPDATE
USING (auth.uid() = user_id);

-- Payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own payments"
ON public.payments FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM public.orders WHERE id = payments.order_id
  )
);

-- Enrollments
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own enrollments"
ON public.enrollments FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins manage all enrollments"
ON public.enrollments FOR ALL
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role IN ('admin', 'admin_academico')
  )
);

-- Lesson Progress
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own lesson progress"
ON public.lesson_progress FOR ALL
USING (auth.uid() = user_id);

-- Certificates
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own certificates"
ON public.certificates FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins issue certificates"
ON public.certificates FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role IN ('admin', 'admin_academico')
  )
);

-- Certificate Requests
ALTER TABLE public.certificate_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own certificate requests"
ON public.certificate_requests FOR SELECT
USING (auth.uid() = requested_by);

CREATE POLICY "Users create own certificate requests"
ON public.certificate_requests FOR INSERT
WITH CHECK (auth.uid() = requested_by);

-- ============================================
-- 7. FUNCIONES AUXILIARES
-- ============================================

-- Función para verificar certificado públicamente
CREATE OR REPLACE FUNCTION public.verify_certificate_public(p_public_id text)
RETURNS TABLE (
  public_id text,
  student_name text,
  program_name text,
  issue_date date,
  status text,
  final_average numeric
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT
    c.public_id,
    p.full_name as student_name,
    pr.name as program_name,
    c.issue_date,
    c.status,
    c.final_average
  FROM public.certificates c
  JOIN public.profiles p ON p.id = c.user_id
  JOIN public.programs pr ON pr.id = c.program_id
  WHERE c.public_id = p_public_id;
$$;

-- Permitir acceso anónimo a la verificación
GRANT EXECUTE ON FUNCTION public.verify_certificate_public(text) TO anon;
GRANT EXECUTE ON FUNCTION public.verify_certificate_public(text) TO authenticated;

-- Función para calcular progreso del estudiante
CREATE OR REPLACE FUNCTION public.calculate_enrollment_progress(p_enrollment_id uuid)
RETURNS numeric
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_total_lessons integer;
  v_completed_lessons integer;
  v_progress numeric;
BEGIN
  -- Obtener user_id del enrollment
  SELECT COUNT(*), COUNT(CASE WHEN lp.completed = true THEN 1 END)
  INTO v_total_lessons, v_completed_lessons
  FROM public.lesson_progress lp
  WHERE lp.enrollment_id = p_enrollment_id;
  
  IF v_total_lessons = 0 THEN
    RETURN 0;
  END IF;
  
  v_progress := (v_completed_lessons::numeric / v_total_lessons::numeric) * 100;
  
  -- Actualizar el enrollment
  UPDATE public.enrollments
  SET progress_percent = v_progress,
      status = CASE 
        WHEN v_progress >= 100 THEN 'completado'
        WHEN v_progress > 0 THEN 'en_curso'
        ELSE status
      END,
      completed_at = CASE WHEN v_progress >= 100 THEN NOW() ELSE completed_at END
  WHERE id = p_enrollment_id;
  
  RETURN v_progress;
END;
$$;

-- ============================================
-- 8. TRIGGERS
-- ============================================

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at
BEFORE UPDATE ON public.enrollments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger para actualizar progreso al completar lección
CREATE OR REPLACE FUNCTION public.update_progress_on_completion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.completed = true AND OLD.completed = false THEN
    NEW.completion_date = NOW();
    -- Calcular progreso del enrollment
    PERFORM public.calculate_enrollment_progress(NEW.enrollment_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_progress
BEFORE UPDATE ON public.lesson_progress
FOR EACH ROW EXECUTE FUNCTION public.update_progress_on_completion();

-- ============================================
-- 9. DATOS INICIALES
-- ============================================

-- Plantilla de certificado por defecto
INSERT INTO public.certificate_templates (code, name, description, program_type, html_template)
VALUES (
  'DEFAULT_2026',
  'Plantilla Estándar UTAMV',
  'Plantilla genérica para certificados UTAMV',
  'certificacion',
  '<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Certificado {{studentName}}</title>
  <style>
    body { font-family: Georgia, serif; margin: 0; padding: 40px; background: #f5f5f5; }
    .certificate { background: white; border: 20px solid #1e3a8a; padding: 60px; text-align: center; }
    .header { color: #1e3a8a; margin-bottom: 40px; }
    .header h1 { font-size: 32px; margin: 0; text-transform: uppercase; letter-spacing: 4px; }
    .header h2 { font-size: 24px; margin: 10px 0 0; font-weight: normal; }
    .content { margin: 50px 0; }
    .student-name { font-size: 48px; color: #1e3a8a; margin: 30px 0; font-weight: bold; }
    .program-name { font-size: 28px; color: #333; margin: 20px 0; }
    .details { margin-top: 40px; font-size: 18px; color: #666; }
    .footer { margin-top: 60px; display: flex; justify-content: space-around; }
    .signature { text-align: center; }
    .signature-line { border-top: 2px solid #333; width: 200px; margin: 10px auto; }
    .date { margin-top: 40px; font-size: 16px; color: #666; }
    .verification { margin-top: 30px; padding: 15px; background: #f0f0f0; border-radius: 5px; }
    .verification-code { font-family: monospace; font-size: 18px; color: #1e3a8a; font-weight: bold; }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="header">
      <h1>Universidad Tecnológica Autónoma de México Virtual</h1>
      <h2>UTAMV</h2>
    </div>
    <div class="content">
      <p style="font-size: 20px; color: #666;">Otorga el presente certificado a:</p>
      <div class="student-name">{{studentName}}</div>
      <p style="font-size: 18px; color: #666;">Por haber completado satisfactoriamente el programa:</p>
      <div class="program-name">{{programName}}</div>
      <div class="details">
        <p>Con una calificación promedio de: <strong>{{grade}}</strong></p>
        <p>Fecha de emisión: <strong>{{issueDate}}</strong></p>
      </div>
    </div>
    <div class="footer">
      <div class="signature">
        <div class="signature-line"></div>
        <p>Director Académico</p>
      </div>
      <div class="signature">
        <div class="signature-line"></div>
        <p>Rector</p>
      </div>
    </div>
    <div class="date">
      Ciudad de México, {{issueDate}}
    </div>
    <div class="verification">
      <p>Este certificado puede ser verificado en:</p>
      <p class="verification-code">{{verifyUrl}}</p>
      <p>Código de verificación: <strong>{{publicId}}</strong></p>
    </div>
  </div>
</body>
</html>'
)
ON CONFLICT (code) DO NOTHING;

-- Programa de ejemplo: Master en Marketing Digital
INSERT INTO public.programs (slug, name, description, price_cents, currency, is_active)
VALUES (
  'master-marketing-digital-2026',
  'Master Profesional en Marketing Digital e Inteligencia Artificial',
  'Programa intensivo de 300+ horas que combina estrategias de marketing digital con herramientas de IA.',
  299900, -- $2,999.00 MXN
  'mxn',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_cents = EXCLUDED.price_cents,
  is_active = EXCLUDED.is_active;
