import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  const { 
    user, 
    updatedUser,
    isAuthenticated, 
    login, 
    logout, 
    updateUser, 
    setUser,
    isLoading,
    resetEmail,
    setResetEmail,
    isCodeVerified,
    setIsCodeVerified,
  } = context;

  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';
  const fullName = user ? `${user.firstName} ${user.lastName}` : '';
  const isLoadingProfile = isLoading;

  return {
    user,
    updatedUser,
    isAuthenticated,
    isLoading: isLoadingProfile,
    isAdmin,
    isUser,
    fullName,
    login,
    logout,
    updateUser,
    setUser,
    resetEmail,
    setResetEmail,
    isCodeVerified,
    setIsCodeVerified,
  };
}
