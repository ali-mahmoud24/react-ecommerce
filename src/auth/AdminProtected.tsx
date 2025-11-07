import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

type AdminProtectedProps = {
  children: ReactNode;
};
export default function AdminProtected({ children }: AdminProtectedProps) {
  const isAdmin = false; // TODO: replace with real admin auth logic

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
