import { supabaseAdmin } from "../../lib/supabaseAdmin.ts";

export async function checkCourseIntegrity() {
  const { data: courses } = await supabaseAdmin
    .from("courses")
    .select("*")
    .eq("published", true);

  const suspicious = courses.filter(c =>
    !c.title || c.title.length < 10 || !c.description || c.price <= 0
  );

  if (suspicious.length > 0) {
    console.log("Cursos sospechosos detectados:", suspicious.map(c => c.title));
    await fetch(process.env.ADMIN_ALERT_WEBHOOK!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alert: "Cursos sin información coherente", courses: suspicious }),
    });
  }
}

if (import.meta.main) checkCourseIntegrity();