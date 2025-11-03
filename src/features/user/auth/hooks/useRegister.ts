import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerApi } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '../schemas/auth.schema';

export const useRegister = () => {
  const { login } = useAuth();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      login(data.token, data.data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || error.message || 'Registration failed. Please try again.';
      form.setError('root', { message: errorMessage });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  const registerWithGoogle = () => {
    console.log('Google registration clicked');
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
    registerWithGoogle,
  };
};
