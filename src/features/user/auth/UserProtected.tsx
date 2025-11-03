import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Spinner from '@/components/ui/Spinner';
import { PUBLIC_ROUTES } from '@/constants/routes';

interface UserProtectedProps {
  children: ReactNode;
}

export default function UserProtected({ children }: UserProtectedProps) {
  const { isAuthenticated } = useAuth();

  // Show loading spinner while checking authentication
  if (isAuthenticated === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}