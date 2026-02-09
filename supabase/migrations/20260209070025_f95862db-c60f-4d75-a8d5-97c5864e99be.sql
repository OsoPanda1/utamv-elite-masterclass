-- Sección 12: Políticas de seguridad obligatorias

-- 12.1 Política de autenticación obligatoria en profiles
CREATE POLICY "Require authentication for profiles"
ON public.profiles FOR SELECT
USING (auth.uid() IS NOT NULL);

-- 12.2 Política de autenticación obligatoria en payments  
CREATE POLICY "Require authentication for payments"
ON public.payments FOR SELECT
USING (auth.uid() IS NOT NULL);

-- 12.3 Chat con salas y membresía
-- Crear tabla de salas de chat
CREATE TABLE public.chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  is_public boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Crear tabla de miembros de salas
CREATE TABLE public.room_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES public.chat_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  joined_at timestamp with time zone DEFAULT now(),
  UNIQUE(room_id, user_id)
);

-- Agregar room_id a chat_messages
ALTER TABLE public.chat_messages 
ADD COLUMN room_id uuid REFERENCES public.chat_rooms(id) ON DELETE CASCADE;

-- Habilitar RLS en nuevas tablas
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_members ENABLE ROW LEVEL SECURITY;

-- Políticas para chat_rooms
CREATE POLICY "Users can view public rooms or rooms they belong to"
ON public.chat_rooms FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND (
    is_public = true 
    OR id IN (SELECT room_id FROM public.room_members WHERE user_id = auth.uid())
    OR created_by = auth.uid()
  )
);

CREATE POLICY "Paid users can create rooms"
ON public.chat_rooms FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_paid = true)
);

-- Políticas para room_members
CREATE POLICY "Users can view room members of their rooms"
ON public.room_members FOR SELECT
USING (
  auth.uid() IS NOT NULL
  AND room_id IN (
    SELECT id FROM public.chat_rooms 
    WHERE is_public = true 
    OR id IN (SELECT room_id FROM public.room_members rm WHERE rm.user_id = auth.uid())
    OR created_by = auth.uid()
  )
);

CREATE POLICY "Room creators can add members"
ON public.room_members FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL
  AND room_id IN (SELECT id FROM public.chat_rooms WHERE created_by = auth.uid())
);

-- Nueva política de chat_messages con aislamiento por sala
DROP POLICY IF EXISTS "Paid users can view chat messages" ON public.chat_messages;

CREATE POLICY "Users see messages in their rooms or public rooms"
ON public.chat_messages FOR SELECT
USING (
  auth.uid() IS NOT NULL
  AND (
    room_id IS NULL -- Legacy messages sin sala (canal general para pagados)
    AND EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_paid = true)
  )
  OR (
    room_id IN (
      SELECT id FROM public.chat_rooms 
      WHERE is_public = true 
      OR id IN (SELECT rm.room_id FROM public.room_members rm WHERE rm.user_id = auth.uid())
      OR created_by = auth.uid()
    )
  )
);

-- Actualizar política de INSERT para incluir room_id
DROP POLICY IF EXISTS "Paid users can insert chat messages" ON public.chat_messages;

CREATE POLICY "Paid users can insert chat messages in their rooms"
ON public.chat_messages FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND is_paid = true)
  AND (
    room_id IS NULL -- Canal general
    OR room_id IN (
      SELECT id FROM public.chat_rooms 
      WHERE is_public = true 
      OR id IN (SELECT rm.room_id FROM public.room_members rm WHERE rm.user_id = auth.uid())
      OR created_by = auth.uid()
    )
  )
);

-- Crear sala general por defecto
INSERT INTO public.chat_rooms (name, description, is_public)
VALUES ('General', 'Canal general de la comunidad Master 360 Elite', true);