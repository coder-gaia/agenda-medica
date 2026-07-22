import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({
  children,
}: Props) {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}