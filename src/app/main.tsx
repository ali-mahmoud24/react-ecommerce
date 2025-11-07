// main.tsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App.tsx';
import './index.css';

import AppThemeProvider from '@/theme/ThemeProvider.tsx';
import { SnackbarProvider } from 'notistack';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/context/AuthProvider.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppThemeProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={3000}
          >
            <App />
            <Toaster />
          </SnackbarProvider>
        </AppThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
