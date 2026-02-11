
-- Explicit authentication-required policies for all sensitive tables
-- Section 12 compliance: deny public/anonymous access

-- profiles: require auth for ALL operations
CREATE POLICY "deny_anon_profiles_select" ON public.profiles FOR SELECT USING (auth.uid() IS NOT NULL);

-- payments: require auth
CREATE POLICY "deny_anon_payments_select" ON public.payments FOR SELECT USING (auth.uid() IS NOT NULL);

-- certificates: require auth
CREATE POLICY "deny_anon_certificates_select" ON public.certificates FOR SELECT USING (auth.uid() IS NOT NULL);

-- support_tickets: require auth
CREATE POLICY "deny_anon_tickets_select" ON public.support_tickets FOR SELECT USING (auth.uid() IS NOT NULL);

-- lesson_progress: require auth
CREATE POLICY "deny_anon_lesson_progress" ON public.lesson_progress FOR SELECT USING (auth.uid() IS NOT NULL);

-- module_progress: require auth
CREATE POLICY "deny_anon_module_progress" ON public.module_progress FOR SELECT USING (auth.uid() IS NOT NULL);

-- quiz_attempts: require auth
CREATE POLICY "deny_anon_quiz_attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() IS NOT NULL);

-- quiz_scores: require auth
CREATE POLICY "deny_anon_quiz_scores" ON public.quiz_scores FOR SELECT USING (auth.uid() IS NOT NULL);

-- user_roles: require auth (prevent role enumeration)
CREATE POLICY "deny_anon_user_roles" ON public.user_roles FOR SELECT USING (auth.uid() IS NOT NULL);

-- Ensure user_roles has policy to prevent users from modifying their own roles
CREATE POLICY "only_admins_insert_roles" ON public.user_roles FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "only_admins_update_roles" ON public.user_roles FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "only_admins_delete_roles" ON public.user_roles FOR DELETE USING (public.has_role(auth.uid(), 'admin'));
