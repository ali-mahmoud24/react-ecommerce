import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import Spinner from '@/components/ui/Spinner';

type UserProtectedProps = {
  children: ReactNode;
};

export default function UserProtected({ children }: UserProtectedProps) {
  const { isAuthenticated, isLoadingProfile } = useAuth();

  if (isLoadingProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}