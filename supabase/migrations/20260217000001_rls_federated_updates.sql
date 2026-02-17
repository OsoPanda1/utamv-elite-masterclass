-- Habilitar RLS para quizzes y cursos protegidos
alter table quizzes enable row level security;
alter table courses enable row level security;

-- Política: solo cursos publicados visibles para todos, admins pueden todo
create policy "courses_select_published" on courses
  for select using (published = true OR auth.role() = 'admin');

create policy "courses_update_admin" on courses
  for update using (auth.role() = 'admin');

-- Políticas para quizzes
create policy "quizzes_select_course_access" on quizzes
  for select using (
    exists (
      select 1 from course_access
      where course_access.user_id = auth.uid()
      and course_access.course_id = quizzes.course_id
    )
    or auth.role() = 'admin'
  );

-- Políticas para users
create policy "users_select_own" on users
  for select using (auth.uid() = id OR auth.role() = 'admin');

create policy "users_update_own" on users
  for update using (auth.uid() = id OR auth.role() = 'admin');

-- Políticas para course_access
create policy "course_access_select_own" on course_access
  for select using (auth.uid() = user_id OR auth.role() = 'admin');

create policy "course_access_insert_own" on course_access
  for insert with check (auth.uid() = user_id);

create policy "course_access_update_own" on course_access
  for update using (auth.uid() = user_id OR auth.role() = 'admin');

-- Políticas para lesson_progress
create policy "lesson_progress_select_own" on lesson_progress
  for select using (auth.uid() = user_id OR auth.role() = 'admin');

create policy "lesson_progress_insert_own" on lesson_progress
  for insert with check (auth.uid() = user_id);

create policy "lesson_progress_update_own" on lesson_progress
  for update using (auth.uid() = user_id OR auth.role() = 'admin');

-- Políticas para visitor_ai_usage
create policy "visitor_ai_usage_select_own" on visitor_ai_usage
  for select using (auth.uid() = user_id OR auth.role() = 'admin');

create policy "visitor_ai_usage_insert_own" on visitor_ai_usage
  for insert with check (auth.uid() = user_id);

create policy "visitor_ai_usage_update_own" on visitor_ai_usage
  for update using (auth.uid() = user_id OR auth.role() = 'admin');

-- Políticas para certificates
create policy "certificates_select_own" on certificates
  for select using (auth.uid() = user_id OR auth.role() = 'admin');

create policy "certificates_insert_own" on certificates
  for insert with check (auth.uid() = user_id);

create policy "certificates_update_own" on certificates
  for update using (auth.uid() = user_id OR auth.role() = 'admin');

-- Políticas para quizzes
create policy "quizzes_select_public" on quizzes
  for select using (auth.role() = 'admin' OR exists (
    select 1 from courses where courses.id = quizzes.course_id and courses.published = true
  ));

-- Políticas para quiz_answers
create policy "quiz_answers_select_own" on quiz_answers
  for select using (auth.uid() = user_id OR auth.role() = 'admin');

create policy "quiz_answers_insert_own" on quiz_answers
  for insert with check (auth.uid() = user_id);

create policy "quiz_answers_update_own" on quiz_answers
  for update using (auth.uid() = user_id OR auth.role() = 'admin');
