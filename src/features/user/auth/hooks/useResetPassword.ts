// src/features/user/auth/hooks/useResetPassword.ts
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

export function useResetPassword() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: (payload: { email: string; newPassword: string }) => authAPI.resetPassword(payload),
    onSuccess: (res) => {
      // backend sets httpOnly cookie and returns user
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user = res.data as any;
      login(user);
      toast.success('Password reset successful');
      navigate('/');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Reset failed';
      toast.error(message);
    },
  });

  return {
    reset: (email: string, newPassword: string) => mutation.mutate({ email, newPassword }),
    isLoading: mutation.isPending,
  };
}
