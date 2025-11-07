import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext, type User, type UserUpdated } from './AuthContext';
import { authAPI } from '@/features/user/auth/api/auth.api';

type Props = { children: React.ReactNode };

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<UserUpdated | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resetEmail, setResetEmail] = useState<string | null>(null);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const isAuthenticated = !!user;

  // ✅ Fetch user on mount (via httpOnly cookie)
  const fetchCurrentUser = useCallback(async () => {
    try {
      const me = await authAPI.me();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // ✅ Login (after successful auth)
  const login = useCallback((loggedUser: User) => {
    setUser(loggedUser);
  }, []);

  // ✅ Logout (clear cookie on backend + clear state)
  const logout = useCallback(() => {
    authAPI.logout?.().finally(() => {
      setUser(null);
      setUpdatedUser(null);
    });
  }, []);

  // ✅ Update user (used after profile update)
  const updateUser = useCallback(
    (updated: UserUpdated) => {
      if (user) {
        const merged = { ...user, ...updated };
        setUser(merged);
        setUpdatedUser(updated);
      }
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        updatedUser,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
        setUser,
        resetEmail,
        setResetEmail,
        isCodeVerified,
        setIsCodeVerified,
      }}
    >
      {isLoading ? (
        <div className="flex h-screen items-center justify-center text-gray-500">
          Loading...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
