// src/features/user/auth/hooks/useLogin.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { authAPI } from '../api/auth.api';
import type { User } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginFormData } from '../schemas/auth.schema';

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormData) => authAPI.login(values),
    onSuccess: ({ data }: { data: User }) => {
      // backend sets httpOnly cookie. frontend sets user in context.
      login(data);
      toast.success(`Welcome back, ${data.firstName}!`);
      navigate('/');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Login failed';
      toast.error(message);
    },
  });

  const onSubmit = (values: LoginFormData) => loginMutation.mutate(values);

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
}
