
-- =============================================
-- SECURITY HARDENING: Fix duplicate policies, add missing operational policies,
-- strengthen anon denial, and add admin moderation capabilities
-- =============================================

-- 1. Remove duplicate payments SELECT policy
DROP POLICY IF EXISTS "payments_select_own_only" ON public.payments;

-- 2. Add missing UPDATE policy for payments (service role handles via webhook, but add for admin)
CREATE POLICY "Admins can update payments"
ON public.payments FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Add missing UPDATE policy for lesson_progress (users can update their own)
CREATE POLICY "Users can update own lesson progress"
ON public.lesson_progress FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- 4. Add UPDATE policy for chat_messages (admin flagging)
CREATE POLICY "Admins can flag chat messages"
ON public.chat_messages FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 5. Add UPDATE/DELETE for chat_rooms (room creators)
CREATE POLICY "Room creators can update rooms"
ON public.chat_rooms FOR UPDATE
TO authenticated
USING (created_by = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Room creators can delete rooms"
ON public.chat_rooms FOR DELETE
TO authenticated
USING (created_by = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

-- 6. Add DELETE for room_members (users can leave rooms)
CREATE POLICY "Users can leave rooms"
ON public.room_members FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- 7. Add UPDATE for support_tickets (users update own, admins update any)
CREATE POLICY "Users can update own tickets"
ON public.support_tickets FOR UPDATE
TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

-- 8. Add INSERT for certificates (admin/system only)
CREATE POLICY "Admins can issue certificates"
ON public.certificates FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 9. Explicit anon denial on quizzes and lessons (currently rely on has_course_access but add explicit deny)
CREATE POLICY "deny_anon_quizzes"
ON public.quizzes AS RESTRICTIVE FOR SELECT
TO anon
USING (false);

CREATE POLICY "deny_anon_lessons"
ON public.lessons AS RESTRICTIVE FOR SELECT
TO anon
USING (false);

CREATE POLICY "deny_anon_questions"
ON public.questions AS RESTRICTIVE FOR SELECT
TO anon
USING (false);

CREATE POLICY "deny_anon_answers"
ON public.answers AS RESTRICTIVE FOR SELECT
TO anon
USING (false);
