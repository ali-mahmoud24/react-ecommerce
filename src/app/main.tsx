import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient.ts';

import App from './App.tsx';
import './index.css';
import { AuthProvider } from '@/context/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
