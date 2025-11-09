import { Routes, Route, Navigate } from 'react-router';
import { userRoutes } from '@/routes/user.routes';
import { adminRoutes } from '@/routes/admin.routes';
import { PUBLIC_ROUTES } from '@/constants/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import ScrollToTop from '../components/ui/ScrollToTop';

const queryClient = new QueryClient();

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <Routes>
        {userRoutes}
        {adminRoutes}

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to={PUBLIC_ROUTES.HOME} replace />} />
      </Routes>
    </QueryClientProvider>
  );
}
