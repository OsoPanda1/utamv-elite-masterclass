import { supabaseAdmin } from "../../lib/supabaseAdmin.ts";

interface Course {
  title: string;
  description: string | null;
  price_cents: number | null;
}

export async function checkCourseIntegrity() {
  const { data: courses } = await supabaseAdmin
    .from("courses")
    .select("*");

  if (!courses) return;

  const suspicious = (courses as Course[]).filter((c: Course) =>
    !c.title || c.title.length < 10 || !c.description || (c.price_cents ?? 0) <= 0
  );

  if (suspicious.length > 0) {
    console.log("Cursos sospechosos detectados:", suspicious.map((c: Course) => c.title));
  }
}

if (import.meta.main) checkCourseIntegrity();
