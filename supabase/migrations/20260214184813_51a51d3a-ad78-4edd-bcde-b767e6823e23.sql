-- 1. Enable RLS on rate_limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own rate limits"
  ON public.rate_limits FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 2. Fix security definer view with proper casts
DROP VIEW IF EXISTS public.admin_user_progress;

CREATE VIEW public.admin_user_progress
WITH (security_invoker = on) AS
SELECT
  up.user_id,
  p.full_name,
  p.email,
  c.id AS course_id,
  c.title AS course_title,
  m.id AS module_id,
  m.title AS module_title,
  l.id AS lesson_id,
  l.title AS lesson_title,
  up.progress,
  up.completed,
  up.updated_at
FROM public.user_progress up
JOIN public.profiles p ON p.user_id = up.user_id
JOIN public.modules m ON m.id = up.module_id::uuid
JOIN public.lessons l ON l.id = up.lesson_id::uuid
JOIN public.courses c ON c.id = m.course_id;

-- 3. Fix function search_path on sanitize_chat_message
CREATE OR REPLACE FUNCTION public.sanitize_chat_message()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
begin
  if new.message is null or length(new.message) = 0 then
    raise exception 'Empty message not allowed';
  end if;
  if length(new.message) > 1000 then
    new.message := substring(new.message from 1 for 1000);
  end if;
  return new;
end;
$$;

-- 4. Fix assign_default_role trigger
DROP TRIGGER IF EXISTS trg_assign_default_role ON public.profiles;
CREATE TRIGGER trg_assign_default_role
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_default_role();

-- 5. Admin can read all profiles
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
CREATE POLICY "Admins can read all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR public.has_role(auth.uid(), 'admin')
  );
