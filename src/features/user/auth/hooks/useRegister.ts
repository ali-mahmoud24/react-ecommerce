import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '../schemas/auth.schema';
import type { User } from '@/context/AuthContext';

export function useRegister() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const registerMutation = useMutation({
    mutationFn: (values: RegisterFormData) =>
      authAPI.register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        passwordConfirm: values.password,

      }),

    onSuccess: async (user: User) => {
      // ✅ Save user in context
      login(user);

      toast.success(`Welcome, ${user.firstName}!`);

      await queryClient.invalidateQueries({ queryKey: ['user'] });

      navigate('/');
    },

    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : 'Registration failed';
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
