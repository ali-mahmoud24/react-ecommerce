import { useAuthContext } from '@/hooks/useAuthContext';

export function useAuth() {
  const { user, token, isAuthenticated, login, logout } = useAuthContext();

  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isUser,
    login,
    logout,
  };
}
