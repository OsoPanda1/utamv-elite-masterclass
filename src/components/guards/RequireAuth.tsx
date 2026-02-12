import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: JSX.Element;
}

export const RequireAuth = ({ children }: Props) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null; // o loader global
  }

  if (!user) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};
