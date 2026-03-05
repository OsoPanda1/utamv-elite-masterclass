// ============================================
// UTAMV Campus - Hook de Matrículas
// ============================================

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Enrollment {
  id: string;
  program_id: string;
  order_id: string | null;
  status: 
    | "preinscrito"
    | "inscrito"
    | "en_curso"
    | "completado"
    | "egresado"
    | "titulado"
    | "suspendido"
    | "baja"
    | "revocado";
  progress_percent: number;
  final_grade: number | null;
  started_at: string;
  completed_at: string | null;
  program?: {
    id: string;
    name: string;
    slug: string;
    description: string;
  };
  order?: {
    id: string;
    status: string;
    total_amount_cents: number;
    currency: string;
  };
}

interface UseEnrollmentsReturn {
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getEnrollmentByProgramId: (programId: string) => Enrollment | undefined;
  hasActiveEnrollment: (programId: string) => boolean;
}

/**
 * Hook para manejar las matrículas del usuario
 */
export function useEnrollments(): UseEnrollmentsReturn {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnrollments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("enrollments")
        .select(`
          *,
          programs(id, name, slug, description),
          orders(id, status, total_amount_cents, currency)
        `)
        .order("started_at", { ascending: false });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      const mappedEnrollments: Enrollment[] = (data || []).map((row: any) => ({
        id: row.id,
        program_id: row.program_id,
        order_id: row.order_id,
        status: row.status,
        progress_percent: row.progress_percent,
        final_grade: row.final_grade,
        started_at: row.started_at,
        completed_at: row.completed_at,
        program: row.programs ? {
          id: row.programs.id,
          name: row.programs.name,
          slug: row.programs.slug,
          description: row.programs.description,
        } : undefined,
        order: row.orders ? {
          id: row.orders.id,
          status: row.orders.status,
          total_amount_cents: row.orders.total_amount_cents,
          currency: row.orders.currency,
        } : undefined,
      }));

      setEnrollments(mappedEnrollments);
    } catch (err: any) {
      const message = err.message || "Error al cargar matrículas";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnrollments();

    // Suscribirse a cambios en tiempo real
    const subscription = supabase
      .channel("enrollments_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "enrollments",
        },
        () => {
          fetchEnrollments();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchEnrollments]);

  const getEnrollmentByProgramId = useCallback(
    (programId: string) => {
      return enrollments.find((e) => e.program_id === programId);
    },
    [enrollments]
  );

  const hasActiveEnrollment = useCallback(
    (programId: string) => {
      const enrollment = getEnrollmentByProgramId(programId);
      return (
        !!enrollment &&
        ["inscrito", "en_curso", "completado", "egresado"].includes(enrollment.status)
      );
    },
    [getEnrollmentByProgramId]
  );

  return {
    enrollments,
    loading,
    error,
    refresh: fetchEnrollments,
    getEnrollmentByProgramId,
    hasActiveEnrollment,
  };
}
