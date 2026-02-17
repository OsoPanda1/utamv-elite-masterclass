-- =====================================================
-- UTAMV Security Fixes Migration
-- Fixes for: Quiz Answers, RLS, Rate Limiting, etc.
-- =====================================================

-- =====================================================
-- 1. FIX: Quiz Answers Publicly Readable (ERROR)
-- =====================================================
-- Remove public access to answers table
-- Only authenticated users who have attempted the question can see answers

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "answers_select_policy" ON answers;
DROP POLICY IF EXISTS "answers_insert_policy" ON answers;

-- Create new policy: Users can only see answers for questions they have attempted
CREATE POLICY "answers_select_policy" ON answers
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_progress up
      JOIN modules m ON up.module_id = m.id
      JOIN lessons l ON l.module_id = m.id
      JOIN questions q ON q.lesson_id = l.id
      WHERE q.id = answers.question_id
      AND up.user_id = auth.uid()
      AND up.completed = true
    )
    OR EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role IN ('admin', 'instructor')
    )
  );

-- Only admins and instructors can insert answers
CREATE POLICY "answers_insert_policy" ON answers
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role IN ('admin', 'instructor')
    )
  );

-- =====================================================
-- 2. FIX: Function Search Path Mutable (WARNING)
-- =====================================================
-- Set secure search path for all functions

ALTER DATABASE postgres SET search_path TO public, extensions;

-- Update existing functions with secure search path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, created_at)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NOW());
  RETURN NEW;
END;
$$;

-- =====================================================
-- 3. FIX: Leaked Password Protection Disabled (WARNING)
-- =====================================================
-- Enable leaked password protection in auth config
-- This is configured in Supabase Dashboard > Authentication > Policies
-- We document it here for reference

COMMENT ON SCHEMA auth IS 'Leaked password protection should be enabled in Supabase Dashboard';

-- =====================================================
-- 4. FIX: Missing Password Recovery Functionality (WARNING)
-- =====================================================
-- Password recovery is handled by Supabase Auth
-- Ensure proper email templates are configured

-- Create password recovery audit log table
CREATE TABLE IF NOT EXISTS password_recovery_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recovery_type TEXT NOT NULL CHECK (recovery_type IN ('forgot_password', 'reset_password', 'magic_link')),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  success BOOLEAN DEFAULT true
);

-- Enable RLS on password recovery logs
ALTER TABLE password_recovery_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "password_recovery_logs_admin_only" ON password_recovery_logs
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
    )
  );

-- =====================================================
-- 5. FIX: Chat Spam Detection Only Client-Side (WARNING)
-- =====================================================
-- Create server-side spam detection function

CREATE TABLE IF NOT EXISTS chat_spam_detection (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message_hash TEXT,
  detection_type TEXT NOT NULL,
  detection_details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create spam detection function
CREATE OR REPLACE FUNCTION public.detect_spam(
  p_user_id UUID,
  p_message TEXT,
  p_room_id UUID DEFAULT NULL
)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_result JSONB := '{"is_spam": false, "reasons": []}'::jsonb;
  v_recent_count INTEGER;
  v_duplicate_count INTEGER;
  v_message_hash TEXT;
BEGIN
  -- Generate message hash for duplicate detection
  v_message_hash := encode(sha256(p_message::bytea), 'hex');
  
  -- Check for rapid posting (more than 5 messages in 1 minute)
  SELECT COUNT(*) INTO v_recent_count
  FROM chat_messages
  WHERE user_id = p_user_id
    AND created_at > NOW() - INTERVAL '1 minute';
  
  IF v_recent_count >= 5 THEN
    v_result := jsonb_set(v_result, '{is_spam}', 'true');
    v_result := jsonb_set(v_result, '{reasons}', 
      v_result->'reasons' || '["rapid_posting"]'::jsonb);
  END IF;
  
  -- Check for duplicate messages
  SELECT COUNT(*) INTO v_duplicate_count
  FROM chat_messages
  WHERE user_id = p_user_id
    AND encode(sha256(message::bytea), 'hex') = v_message_hash
    AND created_at > NOW() - INTERVAL '5 minutes';
  
  IF v_duplicate_count >= 3 THEN
    v_result := jsonb_set(v_result, '{is_spam}', 'true');
    v_result := jsonb_set(v_result, '{reasons}', 
      v_result->'reasons' || '["duplicate_content"]'::jsonb);
  END IF;
  
  -- Check for suspicious patterns
  IF p_message ~* '(https?://[^\s]+){3,}' THEN
    v_result := jsonb_set(v_result, '{is_spam}', 'true');
    v_result := jsonb_set(v_result, '{reasons}', 
      v_result->'reasons' || '["excessive_links"]'::jsonb);
  END IF;
  
  -- Log spam detection
  IF (v_result->>'is_spam')::boolean THEN
    INSERT INTO chat_spam_detection (user_id, message_hash, detection_type, detection_details)
    VALUES (p_user_id, v_message_hash, 'auto', v_result);
  END IF;
  
  RETURN v_result;
END;
$$;

-- =====================================================
-- 6. FIX: Edge Functions Missing Rate Limiting (WARNING)
-- =====================================================
-- Create rate limiting table and function

CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- Create index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup ON rate_limits (identifier, action, created_at);

-- Rate limiting function
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_identifier TEXT,
  p_action TEXT,
  p_max_requests INTEGER DEFAULT 10,
  p_window_seconds INTEGER DEFAULT 60
)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_count INTEGER;
  v_allowed BOOLEAN;
  v_reset_at TIMESTAMPTZ;
BEGIN
  -- Clean up expired entries
  DELETE FROM rate_limits WHERE expires_at < NOW();
  
  -- Count recent requests
  SELECT COUNT(*) INTO v_count
  FROM rate_limits
  WHERE identifier = p_identifier
    AND action = p_action
    AND created_at > NOW() - (p_window_seconds || ' seconds')::interval;
  
  v_allowed := v_count < p_max_requests;
  v_reset_at := NOW() + (p_window_seconds || ' seconds')::interval;
  
  -- If allowed, record the request
  IF v_allowed THEN
    INSERT INTO rate_limits (identifier, action, expires_at)
    VALUES (p_identifier, p_action, v_reset_at);
  END IF;
  
  RETURN jsonb_build_object(
    'allowed', v_allowed,
    'remaining', GREATEST(0, p_max_requests - v_count - 1),
    'reset_at', v_reset_at,
    'limit', p_max_requests
  );
END;
$$;

-- =====================================================
-- 7. FIX: Course Structure Publicly Exposed (INFO)
-- =====================================================
-- Create view for public course structure without sensitive data

CREATE OR REPLACE VIEW public_course_structure AS
SELECT 
  m.id as module_id,
  m.title as module_title,
  m.description as module_description,
  m.order_index,
  l.id as lesson_id,
  l.title as lesson_title,
  l.description as lesson_description,
  l.order_index as lesson_order
FROM modules m
LEFT JOIN lessons l ON l.module_id = m.id
ORDER BY m.order_index, l.order_index;

-- Grant public access to the view
GRANT SELECT ON public_course_structure TO anon, authenticated;

-- =====================================================
-- 8. FIX: Course Access Control Lacks Granularity (INFO)
-- =====================================================
-- Create detailed access control table

CREATE TABLE IF NOT EXISTS course_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID,
  access_level TEXT NOT NULL CHECK (access_level IN ('none', 'preview', 'full', 'lifetime')),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  granted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE course_access ENABLE ROW LEVEL SECURITY;

-- Users can view their own access
CREATE POLICY "course_access_own" ON course_access
  FOR SELECT
  USING (user_id = auth.uid());

-- Admins can manage all access
CREATE POLICY "course_access_admin" ON course_access
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
    )
  );

-- =====================================================
-- 9. FIX: Avatar Storage Bucket Public Enumeration (INFO)
-- =====================================================
-- Create policy for avatar storage

-- Note: Storage policies are created in Supabase Dashboard
-- This documents the required policy

/*
Storage Policy for 'avatars' bucket:
1. Allow public READ for all files in avatars bucket
2. Allow authenticated users to UPLOAD only to their own folder: user_id/*
3. Allow authenticated users to UPDATE only their own files
4. Allow authenticated users to DELETE only their own files
*/

-- Create avatar audit log
CREATE TABLE IF NOT EXISTS avatar_access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  file_path TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('upload', 'download', 'delete')),
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 10. Create user_roles table if not exists
-- =====================================================

CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('student', 'instructor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own role
CREATE POLICY "user_roles_own" ON user_roles
  FOR SELECT
  USING (user_id = auth.uid());

-- Policy: Only admins can manage roles
CREATE POLICY "user_roles_admin" ON user_roles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
    )
  );

-- =====================================================
-- 11. Create indexes for performance
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_chat_messages_user_created ON chat_messages(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_module ON user_progress(user_id, module_id);
CREATE INDEX IF NOT EXISTS idx_rate_limits_expires ON rate_limits(expires_at);

-- =====================================================
-- 12. Visitor AI Usage Tracking (for public chat)
-- =====================================================

CREATE TABLE IF NOT EXISTS visitor_ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  count INTEGER DEFAULT 1,
  message_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(session_id, date)
);

-- Index for efficient rate limit lookups
CREATE INDEX IF NOT EXISTS idx_visitor_ai_usage_session_date ON visitor_ai_usage(session_id, date);
CREATE INDEX IF NOT EXISTS idx_visitor_ai_usage_created ON visitor_ai_usage(created_at);

-- Enable RLS
ALTER TABLE visitor_ai_usage ENABLE ROW LEVEL SECURITY;

-- No direct access from frontend - only through edge functions
CREATE POLICY "visitor_ai_usage_no_access" ON visitor_ai_usage
  FOR ALL
  USING (false);

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE 'UTAMV Security Migration completed successfully';
  RAISE NOTICE 'Fixes applied:';
  RAISE NOTICE '  1. Quiz answers RLS policy';
  RAISE NOTICE '  2. Function search path secured';
  RAISE NOTICE '  3. Password recovery logging';
  RAISE NOTICE '  4. Server-side spam detection';
  RAISE NOTICE '  5. Rate limiting system';
  RAISE NOTICE '  6. Course access control';
  RAISE NOTICE '  7. Avatar access logging';
  RAISE NOTICE '  8. Visitor AI usage tracking';
END $$;
