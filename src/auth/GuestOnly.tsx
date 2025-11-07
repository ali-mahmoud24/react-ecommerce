import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { USER_ROUTES } from '@/constants/routes';

type Props = { children: React.ReactNode };

export default function GuestOnly({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth();

  // Wait for AuthProvider to load user state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If user is already logged in, redirect to home/profile
  if (isAuthenticated) {
    return <Navigate to={USER_ROUTES.ROOT} replace />;
  }

  // Otherwise, show guest-only content
  return <>{children}</>;
}
