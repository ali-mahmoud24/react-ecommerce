import { Navigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { ADMIN_ROUTES } from '@/constants/routes';
import AppLoader from '@/components/ui/AppLoader';

type Props = { children: React.ReactNode };

export default function NotAdmin({ children }: Props) {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <AppLoader />;
  }

  if (isAdmin) {
    return <Navigate to={ADMIN_ROUTES.ROOT} replace />;
  }

  return <>{children}</>;
}
