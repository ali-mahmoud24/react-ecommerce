import { Navigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { ADMIN_ROUTES } from '@/constants/routes';

type Props = { children: React.ReactNode };

export default function NotAdmin({ children }: Props) {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAdmin) {
    return <Navigate to={ADMIN_ROUTES.ROOT} replace />;
  }

  return <>{children}</>;
}
