// src/features/user/auth/hooks/useLogout.ts
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { authAPI } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      logout();
      toast.success('Logged out successfully');
      navigate('/');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Logout failed';
      toast.error(message);
    },
  });

  return mutation;
}
