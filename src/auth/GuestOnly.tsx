import { Navigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { USER_ROUTES } from '@/constants/routes';
import AppLoader from '@/components/ui/AppLoader';

type Props = { children: React.ReactNode };

export default function GuestOnly({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <AppLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to={USER_ROUTES.ROOT} replace />;
  }

  return <>{children}</>;
}
