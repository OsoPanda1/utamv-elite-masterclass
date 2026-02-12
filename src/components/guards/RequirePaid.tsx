import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: JSX.Element;
}

export const RequirePaid = ({ children }: Props) => {
  const { isPaid, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isPaid) {
    return <Navigate to="/pricing" replace />;
  }

  return children;
};
