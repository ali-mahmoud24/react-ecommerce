import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient.ts';

import App from './App.tsx';
import './index.css';

import { AuthProvider } from '@/context/AuthProvider.tsx';
import AppThemeProvider from '@/theme/ThemeProvider.tsx';
import { SnackbarProvider } from 'notistack';

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
          </SnackbarProvider>
        </AppThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
