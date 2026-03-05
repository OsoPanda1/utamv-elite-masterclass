// ============================================
// UTAMV Campus - Hook de Certificados
// ============================================

import { useState, useEffect, useCallback } from "react";
import { getUserCertificates, Certificate } from "@/lib/certificates";
import { toast } from "sonner";

interface UseCertificatesReturn {
  certificates: Certificate[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Hook para manejar los certificados del usuario
 */
export function useCertificates(): UseCertificatesReturn {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getUserCertificates();
      setCertificates(data);
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

  return {
    certificates,
    loading,
    error,
    refresh: fetchCertificates,
  };
}
