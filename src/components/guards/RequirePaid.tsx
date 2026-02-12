import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RequirePaidProps {
  children: JSX.Element;
}

/**
 * Guard de pago:
 * - Permite acceso si el usuario está pagado
 * - Permite acceso SIEMPRE a admin (bypass total)
 * - Redirige a /inscripcion si no cumple
 */
export const RequirePaid: React.FC<RequirePaidProps> = ({ children }) => {
  const { loading, isPaid, isAdmin } = useAuth();
  const location = useLocation();

  // Mientras se resuelve sesión / roles
  if (loading) {
    return null; // o spinner global si lo deseas
  }

  // Admin SIEMPRE pasa (aunque no esté pagado)
  if (isAdmin) {
    return children;
  }

  // Usuario pagado pasa
  if (isPaid) {
    return children;
  }

  // Usuario autenticado pero sin pago
  return (
    <Navigate
      to="/inscripcion"
      replace
      state={{ from: location.pathname }}
    />
  );
};
