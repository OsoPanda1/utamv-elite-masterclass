// ============================================
// UTAMV Campus - Librería de Certificados
// ============================================

import { supabase } from "@/integrations/supabase/client";

export interface CertificateContext {
  studentName: string;
  programName: string;
  issueDate: string;
  grade?: string;
  publicId: string;
  verifyUrl: string;
  extra?: Record<string, string>;
}

export interface Certificate {
  id: string;
  public_id: string;
  user_id: string;
  enrollment_id: string;
  program_id: string;
  template_id: string;
  status: "valid" | "revoked";
  issue_date: string;
  revoke_date: string | null;
  grade: number | null;
  final_average: number | null;
  extra_data: Record<string, any>;
  pdf_url: string | null;
  created_at: string;
  programs?: {
    name: string;
    slug: string;
  };
}

export interface CertificateTemplate {
  id: string;
  code: string;
  name: string;
  description: string | null;
  program_type: string;
  html_template: string;
  css_styles: string | null;
  is_active: boolean;
}

export interface CertificateRequest {
  id: string;
  enrollment_id: string;
  requested_by: string;
  status: "pending" | "approved" | "rejected" | "processing";
  reason: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  notes: string | null;
  created_at: string;
}

/**
 * Genera un ID público único para certificados
 * Formato: 12 caracteres alfanuméricos (excluye 0, O, I, 1 para evitar confusiones)
 */
export function generatePublicCertificateId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 12; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

/**
 * Verifica un certificado públicamente por su ID
 */
export async function verifyCertificatePublic(
  publicId: string
): Promise<{
  public_id: string;
  student_name: string;
  program_name: string;
  issue_date: string;
  status: string;
  final_average: number | null;
} | null> {
  const { data, error } = await supabase.rpc("verify_certificate_public", {
    p_public_id: publicId,
  });

  if (error) {
    console.error("Error verifying certificate:", error);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data[0];
}

/**
 * Obtiene los certificados del usuario actual
 */
export async function getUserCertificates(): Promise<Certificate[]> {
  const { data, error } = await supabase
    .from("certificates")
    .select(`
      *,
      programs(name, slug)
    `)
    .eq("status", "valid")
    .order("issue_date", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener certificados: ${error.message}`);
  }

  return (data || []).map((cert) => ({
    ...cert,
    programs: cert.programs ? {
      name: (cert.programs as any).name,
      slug: (cert.programs as any).slug,
    } : undefined,
  }));
}

/**
 * Obtiene un certificado específico por ID público (para usuarios autenticados)
 */
export async function getCertificateByPublicId(
  publicId: string
): Promise<Certificate | null> {
  const { data, error } = await supabase
    .from("certificates")
    .select(`
      *,
      programs(name, slug)
    `)
    .eq("public_id", publicId)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Error al obtener certificado: ${error.message}`);
  }

  return {
    ...data,
    programs: data.programs ? {
      name: (data.programs as any).name,
      slug: (data.programs as any).slug,
    } : undefined,
  };
}

/**
 * Solicita la emisión de un certificado
 */
export async function requestCertificate(
  enrollmentId: string,
  reason?: string
): Promise<CertificateRequest> {
  const { data, error } = await supabase
    .from("certificate_requests")
    .insert({
      enrollment_id: enrollmentId,
      reason: reason || null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Error al solicitar certificado: ${error.message}`);
  }

  return data;
}

/**
 * Obtiene las solicitudes de certificado del usuario
 */
export async function getUserCertificateRequests(): Promise<CertificateRequest[]> {
  const { data, error } = await supabase
    .from("certificate_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener solicitudes: ${error.message}`);
  }

  return data || [];
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
    publicId: context.publicId,
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
 * Genera el HTML de un certificado para impresión/PDF
 */
export async function generateCertificateHtml(
  certificateId: string
): Promise<string | null> {
  // Obtener el certificado con template
  const { data: cert, error: certError } = await supabase
    .from("certificates")
    .select(`
      *,
      certificate_templates(html_template),
      profiles(full_name),
      programs(name)
    `)
    .eq("id", certificateId)
    .single();

  if (certError || !cert) {
    console.error("Error fetching certificate:", certError);
    return null;
  }

  const template = (cert.certificate_templates as any)?.html_template;
  const studentName = (cert.profiles as any)?.full_name;
  const programName = (cert.programs as any)?.name;

  if (!template || !studentName || !programName) {
    return null;
  }

  const verifyUrl = `${window.location.origin}/verificar-certificado/${cert.public_id}`;

  return renderCertificateHtml(template, {
    studentName,
    programName,
    issueDate: new Date(cert.issue_date).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    grade: cert.final_average ? `${cert.final_average}/100` : undefined,
    publicId: cert.public_id,
    verifyUrl,
  });
}

/**
 * Formatea un ID público para visualización (grupos de 4 caracteres)
 */
export function formatPublicId(publicId: string): string {
  return publicId.match(/.{1,4}/g)?.join("-") || publicId;
}

/**
 * Valida si un certificado puede solicitarse para una matrícula
 */
export function canRequestCertificate(enrollmentStatus: string): boolean {
  return ["completado", "egresado"].includes(enrollmentStatus);
}

/**
 * Obtiene las plantillas de certificado activas
 */
export async function getCertificateTemplates(): Promise<CertificateTemplate[]> {
  const { data, error } = await supabase
    .from("certificate_templates")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) {
    throw new Error(`Error al obtener plantillas: ${error.message}`);
  }

  return data || [];
}
