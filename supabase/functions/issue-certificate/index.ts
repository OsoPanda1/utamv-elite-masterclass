// ============================================
// UTAMV Campus - Edge Function: Issue Certificate
// ============================================

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.4";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Generador de ID público
function generatePublicId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 12; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

serve(async (req) => {
  // Verificar método
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), { 
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Verificar autenticación
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { 
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { 
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Verificar rol de admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "admin_academico"].includes(profile.role)) {
    return new Response(JSON.stringify({ message: "Forbidden - Admin access required" }), { 
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Parsear body
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ message: "Invalid JSON body" }), { 
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { enrollmentId, templateCode, grade, extraData } = body;
  
  if (!enrollmentId || !templateCode) {
    return new Response(JSON.stringify({ message: "Missing required fields" }), { 
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Obtener matrícula
    const { data: enrollment, error: enrollError } = await supabase
      .from("enrollments")
      .select("id, user_id, program_id, status, final_grade")
      .eq("id", enrollmentId)
      .single();

    if (enrollError || !enrollment) {
      return new Response(JSON.stringify({ message: "Enrollment not found" }), { 
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Verificar que la matrícula esté completada
    if (!["completado", "egresado", "titulado"].includes(enrollment.status)) {
      return new Response(
        JSON.stringify({ message: "Enrollment must be completed before issuing certificate" }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verificar que no exista un certificado válido
    const { data: existingCert } = await supabase
      .from("certificates")
      .select("id")
      .eq("enrollment_id", enrollmentId)
      .eq("status", "valid")
      .maybeSingle();

    if (existingCert) {
      return new Response(
        JSON.stringify({ message: "Valid certificate already exists for this enrollment" }), 
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Obtener plantilla
    const { data: template, error: templateError } = await supabase
      .from("certificate_templates")
      .select("id")
      .eq("code", templateCode)
      .eq("is_active", true)
      .single();

    if (templateError || !template) {
      return new Response(JSON.stringify({ message: "Certificate template not found" }), { 
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Generar public_id único
    let publicId = "";
    let attempts = 0;
    while (attempts < 5) {
      publicId = generatePublicId();
      const { data: existing } = await supabase
        .from("certificates")
        .select("id")
        .eq("public_id", publicId)
        .maybeSingle();
      if (!existing) break;
      attempts++;
    }

    if (!publicId) {
      return new Response(
        JSON.stringify({ message: "Failed to generate unique certificate ID" }), 
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const today = new Date().toISOString().slice(0, 10);
    const finalGrade = grade || enrollment.final_grade;

    // Crear certificado
    const { data: cert, error: certError } = await supabase
      .from("certificates")
      .insert({
        public_id: publicId,
        user_id: enrollment.user_id,
        enrollment_id: enrollment.id,
        program_id: enrollment.program_id,
        template_id: template.id,
        status: "valid",
        issue_date: today,
        grade: finalGrade,
        final_average: finalGrade,
        extra_data: extraData || {},
        created_by: user.id,
      })
      .select("id, public_id")
      .single();

    if (certError || !cert) {
      console.error("Certificate creation error:", certError);
      return new Response(
        JSON.stringify({ message: "Failed to create certificate" }), 
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Actualizar estado de la matrícula a titulado
    await supabase
      .from("enrollments")
      .update({ status: "titulado" })
      .eq("id", enrollmentId);

    // Actualizar solicitud de certificado si existe
    await supabase
      .from("certificate_requests")
      .update({ 
        status: "approved",
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id
      })
      .eq("enrollment_id", enrollmentId)
      .eq("status", "pending");

    const publicBaseUrl = Deno.env.get("PUBLIC_BASE_URL") || "https://utamv.edu.mx";

    return new Response(
      JSON.stringify({
        id: cert.id,
        publicId: cert.public_id,
        verifyUrl: `${publicBaseUrl}/verificar-certificado/${cert.public_id}`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Issue certificate error:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Internal server error" }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
