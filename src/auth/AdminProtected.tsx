import { PUBLIC_ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router';
import AppLoader from '@/components/ui/AppLoader';
import type { ReactNode } from 'react';

type AdminProtectedProps = {
  children: ReactNode;
};

export default function AdminProtected({ children }: AdminProtectedProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <AppLoader />;
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}
