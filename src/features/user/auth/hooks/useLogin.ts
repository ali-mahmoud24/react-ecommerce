import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginApi } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginFormData } from '../schemas/auth.schema';

export const useLogin = () => {
  const { login } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data.token, data.data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      form.setError('root', { message: errorMessage });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  const loginWithGoogle = () => {
    // Redirect to Google OAuth
    console.log('Google login clicked');
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
    loginWithGoogle,
  };
};