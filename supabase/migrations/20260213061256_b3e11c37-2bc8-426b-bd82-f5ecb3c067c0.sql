
-- =============================================
-- 1. Add new columns to profiles
-- =============================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_url text,
  ADD COLUMN IF NOT EXISTS ai_daily_quota_used integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ai_quota_reset_at date NOT NULL DEFAULT CURRENT_DATE;

-- =============================================
-- 2. Create lesson_comments table
-- =============================================
CREATE TABLE IF NOT EXISTS public.lesson_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  content text NOT NULL,
  is_pinned boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.lesson_comments ENABLE ROW LEVEL SECURITY;

-- Read: paid users can see comments on lessons they have access to
CREATE POLICY "Paid users can read lesson comments"
  ON public.lesson_comments FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM lessons l
      JOIN modules m ON m.id = l.module_id
      WHERE l.id = lesson_comments.lesson_id
      AND has_course_access(auth.uid(), m.course_id)
    )
  );

-- Insert: paid users can add comments
CREATE POLICY "Paid users can insert comments"
  ON public.lesson_comments FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM lessons l
      JOIN modules m ON m.id = l.module_id
      WHERE l.id = lesson_comments.lesson_id
      AND has_course_access(auth.uid(), m.course_id)
    )
  );

-- Update: only own comments (not is_pinned), or admin
CREATE POLICY "Users can update own comments"
  ON public.lesson_comments FOR UPDATE
  USING (
    auth.uid() = user_id
    OR has_role(auth.uid(), 'admin'::app_role)
  );

-- Delete: own comments or admin
CREATE POLICY "Users can delete own comments or admin"
  ON public.lesson_comments FOR DELETE
  USING (
    auth.uid() = user_id
    OR has_role(auth.uid(), 'admin'::app_role)
  );

-- Trigger for updated_at
CREATE TRIGGER update_lesson_comments_updated_at
  BEFORE UPDATE ON public.lesson_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- 3. Create storage bucket for avatars
-- =============================================
INSERT INTO storage.buckets (id, name, public)
  VALUES ('avatars', 'avatars', true)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
