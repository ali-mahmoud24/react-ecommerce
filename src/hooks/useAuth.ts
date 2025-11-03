import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, token, isAuthenticated, login, logout, updateUser } = context;

  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';
  const fullName = user?.fullName || `${user?.firstName} ${user?.lastName}`;

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isUser,
    fullName,
    login,
    logout,
    updateUser,
  };
}
