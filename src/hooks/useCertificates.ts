// ============================================
// UTAMV Campus - Hook de Certificados
// ============================================

import { useState, useEffect, useCallback } from "react";
import {
  getUserCertificates,
  getUserCertificateRequests,
  requestCertificate as requestCertificateApi,
  Certificate,
  CertificateRequest,
  canRequestCertificate as canRequestCertificateLib,
} from "@/lib/certificates";
import { useEnrollments } from "./useEnrollments";
import { toast } from "sonner";

interface UseCertificatesReturn {
  certificates: Certificate[];
  requests: CertificateRequest[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  requestCertificate: (enrollmentId: string, reason?: string) => Promise<void>;
  canRequestCertificate: (enrollmentId: string) => boolean;
  getCertificateByEnrollment: (enrollmentId: string) => Certificate | undefined;
}

/**
 * Hook para manejar los certificados del usuario
 */
export function useCertificates(): UseCertificatesReturn {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [requests, setRequests] = useState<CertificateRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { enrollments, refresh: refreshEnrollments } = useEnrollments();

  const fetchCertificates = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [certsData, requestsData] = await Promise.all([
        getUserCertificates(),
        getUserCertificateRequests(),
      ]);

      setCertificates(certsData);
      setRequests(requestsData);
    } catch (err: any) {
      const message = err.message || "Error al cargar certificados";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const requestCertificate = useCallback(
    async (enrollmentId: string, reason?: string) => {
      try {
        await requestCertificateApi(enrollmentId, reason);
        toast.success("Solicitud de certificado enviada correctamente");
        await fetchCertificates();
        await refreshEnrollments();
      } catch (err: any) {
        toast.error(err.message || "Error al solicitar certificado");
        throw err;
      }
    },
    [fetchCertificates, refreshEnrollments]
  );

  const canRequestCertificate = useCallback(
    (enrollmentId: string): boolean => {
      const enrollment = enrollments.find((e) => e.id === enrollmentId);
      if (!enrollment) return false;

      // Verificar si ya tiene un certificado válido
      const existingCert = certificates.find(
        (c) => c.enrollment_id === enrollmentId && c.status === "valid"
      );
      if (existingCert) return false;

      // Verificar si ya tiene una solicitud pendiente
      const pendingRequest = requests.find(
        (r) => r.enrollment_id === enrollmentId && r.status === "pending"
      );
      if (pendingRequest) return false;

      // Verificar si cumple con los requisitos académicos
      return canRequestCertificateLib(enrollment.status);
    },
    [enrollments, certificates, requests]
  );

  const getCertificateByEnrollment = useCallback(
    (enrollmentId: string) => {
      return certificates.find(
        (c) => c.enrollment_id === enrollmentId && c.status === "valid"
      );
    },
    [certificates]
  );

  return {
    certificates,
    requests,
    loading,
    error,
    refresh: fetchCertificates,
    requestCertificate,
    canRequestCertificate,
    getCertificateByEnrollment,
  };
}
