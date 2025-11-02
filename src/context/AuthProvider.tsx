import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext, type User } from './AuthContext';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!token;

  const login = (jwt: string, userData: User) => {
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(userData));

    setToken(jwt);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      import('@/lib/axios').then(({ default: http }) => {
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      });
    } else {
      import('@/lib/axios').then(({ default: http }) => {
        delete http.defaults.headers.common['Authorization'];
      });
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
