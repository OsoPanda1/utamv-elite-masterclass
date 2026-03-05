// ============================================
// UTAMV Campus - Hook de Matrículas
// Basado en la tabla payments como proxy de enrollment
// ============================================

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Enrollment {
  id: string;
  course_id: string;
  status: string;
  amount_cents: number;
  currency: string;
  created_at: string;
  course_title?: string;
}

interface UseEnrollmentsReturn {
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  hasActiveEnrollment: (courseId: string) => boolean;
}

/**
 * Hook para manejar las matrículas del usuario
 * Usa la tabla payments como proxy de enrollment
 */
export function useEnrollments(): UseEnrollmentsReturn {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchEnrollments = useCallback(async () => {
    if (!user) {
      setEnrollments([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("payments")
        .select("id, course_id, status, amount_cents, currency, created_at")
        .eq("user_id", user.id)
        .eq("status", "succeeded")
        .order("created_at", { ascending: false });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      const mapped: Enrollment[] = (data || []).map((row) => ({
        id: row.id,
        course_id: row.course_id,
        status: row.status || "pending",
        amount_cents: row.amount_cents,
        currency: row.currency || "usd",
        created_at: row.created_at || "",
      }));

      setEnrollments(mapped);
    } catch (err: any) {
      setError(err.message || "Error al cargar matrículas");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const hasActiveEnrollment = useCallback(
    (courseId: string) => {
      return enrollments.some((e) => e.course_id === courseId);
    },
    [enrollments]
  );

  return {
    enrollments,
    loading,
    error,
    refresh: fetchEnrollments,
    hasActiveEnrollment,
  };
}
