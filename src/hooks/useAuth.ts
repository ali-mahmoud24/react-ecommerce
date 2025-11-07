// hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { 
    user, 
    isAuthenticated, 
    login, 
    logout, 
    updateUser, 
    setUser,
    isLoading,
    resetEmail,
    setResetEmail,
    isCodeVerified,
    setIsCodeVerified 
    
  } = context;

  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';
  const fullName = user ? `${user.firstName} ${user.lastName}` : '';
  const isLoadingProfile = isLoading;

  return {
    // User state
    user,
    isAuthenticated,
    isLoading: isLoadingProfile,
    
    // User role helpers
    isAdmin,
    isUser,
    fullName,
    
    // Auth actions
    login,
    logout,
    updateUser,
    setUser,
    
    // Password reset state
    resetEmail,
    setResetEmail,
    isCodeVerified,
    setIsCodeVerified,
  };
}