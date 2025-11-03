import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordApi, verifyResetCodeApi } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { resetPasswordSchema, type ResetPasswordFormData } from '../schemas/auth.schema';

export const useResetPassword = () => {
  const { login } = useAuth();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
      resetCode: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const verifyMutation = useMutation({
    mutationFn: verifyResetCodeApi,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Invalid reset code. Please try again.';
      form.setError('root', { message: errorMessage });
    },
  });

  const resetMutation = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      // Auto-login after password reset
      // You might want to get user data from the backend here
      const user = {
        id: '',
        firstName: '',
        lastName: '',
        email: form.getValues('email'),
        role: 'user' as const,
        active: true,
        wishlist: [],
        addresses: [],
      };
      login(data.token, user);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || 'Password reset failed. Please try again.';
      form.setError('root', { message: errorMessage });
    },
  });

  const verifyResetCode = async (email: string, resetCode: string) => {
    return verifyMutation.mutateAsync({ email, resetCode });
  };

  const onSubmit = (data: ResetPasswordFormData) => {
    resetMutation.mutate({
      email: data.email,
      newPassword: data.newPassword,
    });
  };

  return {
    form,
    onSubmit,
    verifyResetCode,
    isLoading: resetMutation.isPending || verifyMutation.isPending,
    isSuccess: resetMutation.isSuccess,
    error: resetMutation.error || verifyMutation.error,
  };
};
