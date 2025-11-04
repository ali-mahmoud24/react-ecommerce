// src/features/user/auth/hooks/useLogout.ts
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: async () => {
      // clear client state
      await logout();
      navigate('/login');
    },
    onError: () => {
      // still clear client state
      logout();
      navigate('/login');
    },
  });

  return {
    logout: () => mutation.mutate(),
    isLoading: mutation.isPending,
  };
}
