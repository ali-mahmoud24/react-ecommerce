import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

type AdminProtectedProps = {
  children: ReactNode;
};
export default function AdminProtected({ children }: AdminProtectedProps) {
  const { isAuthenticated, isAdmin, isLoading, isUser } = useAuth();
  console.log('isAuthenticated :', isAuthenticated);
  console.log('isAdmin :', isAdmin);
  console.log('isUser :', isUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated && isUser) {
    return <Navigate to={ADMIN_ROUTES.UNAUTHORIZED} replace />;
  }

  if (!isAuthenticated && !isAdmin) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}
