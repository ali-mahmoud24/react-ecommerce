// src/features/user/auth/hooks/useForgotPassword.ts
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../api/auth.api';
import toast from 'react-hot-toast';

export function useForgotPassword() {
  const mutation = useMutation({
    mutationFn: (payload: { email: string }) => authAPI.forgotPassword({ email: payload.email }),
    onSuccess: (res) => {
      toast.success(res.message || 'Reset code sent to email');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Request failed';
      toast.error(message);
    },
  });

  return {
    send: (email: string) => mutation.mutate({ email }),
    isLoading: mutation.isPending,
  };
}
