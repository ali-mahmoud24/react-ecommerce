import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { authAPI } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';

type Props = {
  onSuccess?: () => void;
};

export function useActivateAccount({ onSuccess }: Props = {}) {
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authAPI.activateAccount(data),

    onSuccess: async (res) => {
      const user = res?.data;
      if (user) {
        login(user);
        toast.success('Account reactivated successfully!');
      } else {
        toast.error('Activation succeeded but no user data returned.');
      }

      onSuccess?.();
    },

    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Activation failed. Please check your credentials.';
      toast.error(message);
    },
  });

  return {
    activateAccount: mutation.mutateAsync,
    isActivating: mutation.isPending,
  };
}
