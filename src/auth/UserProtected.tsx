import { useAuth } from "@/hooks/useAuth";
import { PUBLIC_ROUTES } from "@/constants/routes";
import { Navigate } from "react-router";

type Props = { children: React.ReactNode };

export default function UserProtected({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}
