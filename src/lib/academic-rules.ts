// ============================================
// UTAMV Campus - Reglas Académicas
// Funciones puras para cálculos y validaciones académicas
// ============================================

// ============================================
// TIPOS
// ============================================

export interface Assessment {
  id: string;
  type: "tarea" | "examen" | "proyecto" | "participacion";
  weight_percent: number;
  grade: number;
  min_grade: number;
  is_required: boolean;
}

export interface AcademicProgress {
  totalLessons: number;
  completedLessons: number;
  assessments: Assessment[];
  attendancePercent: number;
}

export interface ProgressResult {
  percentComplete: number;
  currentGrade: number;
  weightedAverage: number;
  canAdvance: boolean;
  missingRequirements: string[];
}

export interface CertificateRequirements {
  minOverallGrade: number;
  minAttendancePercent: number;
  requiredAssessments: string[];
  minAssessmentGrades: Record<string, number>;
}

// ============================================
// CONSTANTES
// ============================================

/** Porcentaje mínimo de asistencia requerido */
export const MIN_ATTENDANCE_PERCENT = 80;

/** Calificación mínima aprobatoria (0-100) */
export const MIN_PASSING_GRADE = 60;

/** Calificación mínima con honores */
export const MIN_HONORS_GRADE = 90;

/** Pesos por defecto por tipo de evaluación */
export const DEFAULT_ASSESSMENT_WEIGHTS: Record<string, number> = {
  tareas: 30,
  examenes: 40,
  proyecto: 25,
  participacion: 5,
};

// ============================================
// FUNCIONES DE CÁLCULO
// ============================================

/**
 * Calcula el porcentaje de progreso basado en lecciones completadas
 */
export function calculateProgressPercent(
  completedLessons: number,
  totalLessons: number
): number {
  if (totalLessons === 0) return 0;
  const percent = (completedLessons / totalLessons) * 100;
  return Math.min(Math.round(percent * 100) / 100, 100);
}

/**
 * Calcula el promedio ponderado de calificaciones
 */
export function calculateWeightedAverage(assessments: Assessment[]): number {
  if (assessments.length === 0) return 0;

  const totalWeight = assessments.reduce((sum, a) => sum + a.weight_percent, 0);
  if (totalWeight === 0) return 0;

  const weightedSum = assessments.reduce(
    (sum, a) => sum + (a.grade * a.weight_percent) / 100,
    0
  );

  return Math.round(weightedSum * 100) / 100;
}

/**
 * Calcula el promedio simple de calificaciones
 */
export function calculateSimpleAverage(grades: number[]): number {
  if (grades.length === 0) return 0;
  const sum = grades.reduce((a, b) => a + b, 0);
  return Math.round((sum / grades.length) * 100) / 100;
}

// ============================================
// FUNCIONES DE VALIDACIÓN
// ============================================

/**
 * Verifica si una calificación es aprobatoria
 */
export function isPassingGrade(grade: number, minGrade: number = MIN_PASSING_GRADE): boolean {
  return grade >= minGrade;
}

/**
 * Verifica si el estudiante cumple con el requisito de asistencia
 */
export function meetsAttendanceRequirement(
  attendancePercent: number,
  minRequired: number = MIN_ATTENDANCE_PERCENT
): boolean {
  return attendancePercent >= minRequired;
}

/**
 * Verifica si todas las evaluaciones requeridas están aprobadas
 */
export function areRequiredAssessmentsPassed(
  assessments: Assessment[]
): { passed: boolean; failed: Assessment[] } {
  const failed = assessments.filter(
    (a) => a.is_required && !isPassingGrade(a.grade, a.min_grade)
  );
  return {
    passed: failed.length === 0,
    failed,
  };
}

/**
 * Valida si se pueden solicitar certificados
 */
export function canRequestCertificate(
  progress: AcademicProgress,
  requirements?: Partial<CertificateRequirements>
): { eligible: boolean; reasons: string[] } {
  const reasons: string[] = [];
  const minAttendance = requirements?.minAttendancePercent ?? MIN_ATTENDANCE_PERCENT;
  const minGrade = requirements?.minOverallGrade ?? MIN_PASSING_GRADE;

  // Verificar asistencia
  if (!meetsAttendanceRequirement(progress.attendancePercent, minAttendance)) {
    reasons.push(
      `Asistencia insuficiente: ${progress.attendancePercent}% (mínimo requerido: ${minAttendance}%)`
    );
  }

  // Verificar progreso
  const progressPercent = calculateProgressPercent(
    progress.completedLessons,
    progress.totalLessons
  );
  if (progressPercent < 100) {
    reasons.push(`Progreso incompleto: ${progressPercent}% (se requiere 100%)`);
  }

  // Verificar evaluaciones requeridas
  const assessmentsCheck = areRequiredAssessmentsPassed(progress.assessments);
  if (!assessmentsCheck.passed) {
    const failedNames = assessmentsCheck.failed.map((a) => a.type).join(", ");
    reasons.push(`Evaluaciones no aprobadas: ${failedNames}`);
  }

  // Verificar promedio general
  const weightedAverage = calculateWeightedAverage(progress.assessments);
  if (weightedAverage < minGrade) {
    reasons.push(
      `Promedio insuficiente: ${weightedAverage} (mínimo requerido: ${minGrade})`
    );
  }

  return {
    eligible: reasons.length === 0,
    reasons,
  };
}

// ============================================
// FUNCIONES DE ESTADO ACADÉMICO
// ============================================

/**
 * Determina el estado académico basado en el progreso
 */
export function determineAcademicStatus(
  progress: AcademicProgress,
  isPaid: boolean
): "preinscrito" | "inscrito" | "en_curso" | "completado" | "egresado" | "titulado" {
  if (!isPaid) return "preinscrito";

  const progressPercent = calculateProgressPercent(
    progress.completedLessons,
    progress.totalLessons
  );

  if (progressPercent === 0) return "inscrito";
  if (progressPercent < 100) return "en_curso";

  // 100% completado
  const { eligible } = canRequestCertificate(progress);
  if (eligible) return "egresado";

  return "completado";
}

/**
 * Calcula la mención honorífica si aplica
 */
export function calculateHonors(
  finalAverage: number,
  attendancePercent: number
): "sin_mencion" | "mencion_honorifica" | "mencion_especial" | null {
  if (finalAverage >= 95 && attendancePercent >= 95) {
    return "mencion_especial";
  }
  if (finalAverage >= MIN_HONORS_GRADE && attendancePercent >= MIN_ATTENDANCE_PERCENT) {
    return "mencion_honorifica";
  }
  if (finalAverage >= MIN_PASSING_GRADE) {
    return "sin_mencion";
  }
  return null;
}

// ============================================
// FUNCIONES DE EVALUACIÓN
// ============================================

/**
 * Calcula la calificación final considerando recuperación
 */
export function calculateFinalGrade(
  originalGrade: number,
  recoveryGrade: number | null,
  recoveryMaxGrade: number = 70
): number {
  if (recoveryGrade === null) return originalGrade;

  // La calificación de recuperación tiene un máximo
  const cappedRecovery = Math.min(recoveryGrade, recoveryMaxGrade);
  
  // Se toma el mejor entre la original y la de recuperación
  return Math.max(originalGrade, cappedRecovery);
}

/**
 * Determina si un estudiante puede presentar evaluación de recuperación
 */
export function canTakeRecovery(
  grade: number,
  minGrade: number = MIN_PASSING_GRADE,
  attempts: number = 0,
  maxAttempts: number = 2
): boolean {
  return grade < minGrade && attempts < maxAttempts;
}

// ============================================
// FUNCIONES DE PROGRESO
// ============================================

/**
 * Calcula el progreso completo del estudiante
 */
export function calculateFullProgress(
  progress: AcademicProgress
): ProgressResult {
  const percentComplete = calculateProgressPercent(
    progress.completedLessons,
    progress.totalLessons
  );

  const weightedAverage = calculateWeightedAverage(progress.assessments);
  const { passed, failed } = areRequiredAssessmentsPassed(progress.assessments);

  const missingRequirements: string[] = [];

  if (percentComplete < 100) {
    missingRequirements.push("Completar todas las lecciones");
  }

  if (!meetsAttendanceRequirement(progress.attendancePercent)) {
    missingRequirements.push("Cumplir con el porcentaje de asistencia mínimo");
  }

  if (!passed) {
    missingRequirements.push(
      `Aprobar evaluaciones: ${failed.map((a) => a.type).join(", ")}`
    );
  }

  return {
    percentComplete,
    currentGrade: weightedAverage,
    weightedAverage,
    canAdvance: percentComplete >= 100 && passed,
    missingRequirements,
  };
}

// ============================================
// FUNCIONES DE FORMATO
// ============================================

/**
 * Formatea una calificación para visualización
 */
export function formatGrade(grade: number): string {
  return grade.toFixed(2);
}

/**
 * Obtiene el color según la calificación
 */
export function getGradeColor(grade: number): string {
  if (grade >= 90) return "text-green-600";
  if (grade >= 80) return "text-blue-600";
  if (grade >= MIN_PASSING_GRADE) return "text-yellow-600";
  return "text-red-600";
}

/**
 * Obtiene el estado de progreso como texto
 */
export function getProgressStatusText(
  percentComplete: number
): { text: string; color: string } {
  if (percentComplete === 100) {
    return { text: "Completado", color: "text-green-600" };
  }
  if (percentComplete >= 75) {
    return { text: "En curso avanzado", color: "text-blue-600" };
  }
  if (percentComplete >= 50) {
    return { text: "En curso", color: "text-yellow-600" };
  }
  if (percentComplete > 0) {
    return { text: "Iniciado", color: "text-gray-600" };
  }
  return { text: "Sin iniciar", color: "text-gray-400" };
}
