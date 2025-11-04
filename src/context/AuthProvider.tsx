import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { AuthContext, type User } from './AuthContext';
import { authAPI } from '@/features/user/auth/api/auth.api'; // optional: to verify token on load

type Props = { children: React.ReactNode };

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // 🔹 Load user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // 🔹 Sync user state with localStorage on every change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // 🔹 Login
  const login = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  // 🔹 Logout
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  // 🔹 Update user profile (for example after edit)
  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }, []);

  // 🔹 Optionally: verify active session on load (if backend supports /auth/me)
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const data = await authAPI.me();
        if (data) setUser(data);
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    if (localStorage.getItem('user')) verifyUser();
    else setIsLoading(false);
  }, [logout]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
      updateUser,
      setUser,
      isLoading,
    }),
    [user, isAuthenticated, login, logout, updateUser, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
