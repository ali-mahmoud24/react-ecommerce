import { useAuth } from '@/hooks/useAuth';
import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';
import { Navigate } from 'react-router';

type Props = { children: React.ReactNode };

export default function UserProtected({ children }: Props) {
  const { isAuthenticated, isLoading, isUser, isAdmin } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && isAdmin) {
    return <Navigate to={ADMIN_ROUTES.ROOT} replace />;
  }

  if (!isAuthenticated && !isUser) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}
