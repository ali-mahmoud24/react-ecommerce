import type { ReactNode } from 'react';


import { Navigate } from 'react-router';

type UserProtectedProps = {
  children: ReactNode;
};

export default function UserProtected({ children }: UserProtectedProps) {
  const isLoggedIn = false; // TODO: replace with real auth logic

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
