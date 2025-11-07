import React, { useState, useEffect, useCallback } from "react";
import { AuthContext, type User } from "./AuthContext";
import { authAPI } from "@/features/user/auth/api/auth.api";

type Props = { children: React.ReactNode };

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resetEmail, setResetEmail] = useState<string | null>(null);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const isAuthenticated = !!user;

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

  const login = useCallback((loggedUser: User) => {
    setUser(loggedUser);
  }, []);

  const logout = useCallback(() => {
    authAPI.logout().finally(() => {
      setUser(null);
      // No need to remove localStorage token since backend uses cookies
    });
  }, []);

  const updateUser = useCallback((updated: User) => {
    setUser(updated);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
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
