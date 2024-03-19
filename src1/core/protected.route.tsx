import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "./auth/useAuth";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};
