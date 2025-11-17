import type { ReactNode } from "react";
import { useLogin } from "../lib/use-login";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  path?: string;
}

export const ProtectedRoute = ({
  children,
  path = "/",
}: ProtectedRouteProps) => {
  const { user, isLoading } = useLogin();

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }

  if (!user) {
    return <Navigate to={path} replace />;
  }

  return <>{children}</>;
};
