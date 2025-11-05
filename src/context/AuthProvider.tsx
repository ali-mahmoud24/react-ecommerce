// src/context/AuthProvider.tsx
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { AuthContext, type User } from './AuthContext';
import { authAPI } from '@/features/user/auth/api/auth.api';

type Props = { children: React.ReactNode };

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [resetEmail, setResetEmail] = useState<string | null>(null);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // 🔹 Verify user session on mount
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const data = await authAPI.me(); // calls /auth/me (backend reads cookie)
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  // 🔹 Login — sets user (after successful login mutation)
  const login = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  // 🔹 Logout — clears user (after logout API)
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  // 🔹 Update user info (for profile updates)
  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
      updateUser,
      setUser,
      isLoading,
      // Password reset state
      resetEmail,
      setResetEmail,
      isCodeVerified,
      setIsCodeVerified,
    }),
    [user, isAuthenticated, login, logout, updateUser, isLoading, resetEmail, isCodeVerified],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
