// ============================================
// UTAMV Campus - Librería de Certificados
// ============================================

import { supabase } from "@/integrations/supabase/client";

export interface CertificateContext {
  studentName: string;
  programName: string;
  issueDate: string;
  grade?: string;
  certificateNumber: string;
  verifyUrl: string;
  extra?: Record<string, string>;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_number: string;
  generated_at: string | null;
}

/**
 * Genera un número de certificado único
 */
export function generateCertificateNumber(userId: string): string {
  return `UTAMV-${Date.now()}-${userId.slice(0, 8).toUpperCase()}`;
}

/**
 * Formatea un número de certificado para visualización
 */
export function formatCertificateNumber(certNumber: string): string {
  return certNumber;
}

/**
 * Verifica un certificado públicamente por su número
 */
export async function verifyCertificatePublic(
  certificateNumber: string
): Promise<{
  certificate_number: string;
  student_name: string;
  program_name: string;
  generated_at: string | null;
} | null> {
  // Query certificates table joined with profiles and courses
  const { data, error } = await supabase
    .from("certificates")
    .select(`
      certificate_number,
      generated_at,
      user_id,
      course_id
    `)
    .eq("certificate_number", certificateNumber)
    .maybeSingle();

  if (error || !data) {
    console.error("Error verifying certificate:", error);
    return null;
  }

  // Fetch student name
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("user_id", data.user_id)
    .maybeSingle();

  // Fetch course name
  const { data: course } = await supabase
    .from("courses")
    .select("title")
    .eq("id", data.course_id)
    .maybeSingle();

  return {
    certificate_number: data.certificate_number,
    student_name: profile?.full_name || "Estudiante UTAMV",
    program_name: course?.title || "Programa UTAMV",
    generated_at: data.generated_at,
  };
}

/**
 * Obtiene los certificados del usuario actual
 */
export async function getUserCertificates(): Promise<Certificate[]> {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("generated_at", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener certificados: ${error.message}`);
  }

  return data || [];
}

/**
 * Obtiene un certificado específico por número
 */
export async function getCertificateByNumber(
  certNumber: string
): Promise<Certificate | null> {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("certificate_number", certNumber)
    .maybeSingle();

  if (error) {
    throw new Error(`Error al obtener certificado: ${error.message}`);
  }

  return data || null;
}

/**
 * Renderiza un certificado HTML a partir de una plantilla
 */
export function renderCertificateHtml(
  template: string,
  context: CertificateContext
): string {
  let html = template;
  const flat: Record<string, string> = {
    studentName: context.studentName,
    programName: context.programName,
    issueDate: context.issueDate,
    grade: context.grade ?? "",
    certificateNumber: context.certificateNumber,
    verifyUrl: context.verifyUrl,
    ...context.extra,
  };

  for (const [key, value] of Object.entries(flat)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    html = html.replace(regex, value ?? "");
  }

  return html;
}

/**
 * Valida si un certificado puede generarse
 */
export function canGenerateCertificate(
  progressPercent: number,
  isPaid: boolean
): boolean {
  return progressPercent >= 100 && isPaid;
}
