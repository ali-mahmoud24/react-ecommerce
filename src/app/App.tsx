import { Routes, Route, Navigate } from 'react-router';
import { useEffect, useState } from 'react';
import http from '@/lib/axios';
import { userRoutes } from '@/routes/user.routes';
import { adminRoutes } from '@/routes/admin.routes';
import { PUBLIC_ROUTES } from '@/constants/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CircularProgress, Box } from '@mui/material';

const queryClient = new QueryClient();

export default function App() {
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const login = async () => {
      try {
        await http.post('/auth/login', {
          email: 'jhon@gmail.com',
          password: '123456',
        });
        // token stored in HttpOnly cookie by backend
      } catch (error) {
        console.error('Login failed:', error);
      } finally { 
        setIsAuthLoading(false);
      }
    };

    login();
  }, []);

  if (isAuthLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {userRoutes}
        {adminRoutes}

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to={PUBLIC_ROUTES.HOME} replace />} />
      </Routes>
    </QueryClientProvider>
  );
}
