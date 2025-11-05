// src/features/user/auth/hooks/useRegister.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authAPI } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '../schemas/auth.schema';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { User } from '@/context/AuthContext';

export function useRegister() {
  const { login } = useAuth(); // from AuthContext
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // React Hook Form setup
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  // React Query mutation for registration
  const registerMutation = useMutation({
    mutationFn: (values: RegisterFormData) =>
      authAPI.register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      }),
    onSuccess: async ({ data }) => {
      // 🔹 Set user in context
      login(data as User);

      // 🔹 Show success toast
      toast.success(`Welcome, ${(data as User).firstName}!`);

      // 🔹 Refresh user cache
      await queryClient.invalidateQueries({ queryKey: ['user'] });

      // 🔹 Redirect to homepage
      navigate('/');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Registration failed';
      toast.error(message);
    },
  });

  const onSubmit = (values: RegisterFormData) => registerMutation.mutate(values);

  return {
    form,
    onSubmit,
    isLoading: registerMutation.isPending,
  };
}
