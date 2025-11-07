import { useAuth } from '@/hooks/useAuth';
import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';
import { Navigate } from 'react-router';
import AppLoader from '@/components/ui/AppLoader';

type Props = { children: React.ReactNode };

export default function UserProtected({ children }: Props) {
  const { isAuthenticated, isLoading, isUser, isAdmin } = useAuth();

  if (isLoading) {
    return <AppLoader />;
  }

  if (isAuthenticated && isAdmin) {
    return <Navigate to={ADMIN_ROUTES.ROOT} replace />;
  }

  if (!isAuthenticated && !isUser) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}
