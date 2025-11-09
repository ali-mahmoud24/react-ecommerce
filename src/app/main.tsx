import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App.tsx';
import './index.css';

import AppThemeProvider from '@/theme/ThemeProvider.tsx';
import AuthProvider from '@/context/AuthProvider.tsx';
import AppToaster from '@/components/ui/AppToaster.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
<BrowserRouter basename={import.meta.env.MODE === 'production' ? '/react-ecommerce' : '/'}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppThemeProvider>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={3000}
          >
            <AppToaster />
            <App />
          </SnackbarProvider>
        </AppThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
