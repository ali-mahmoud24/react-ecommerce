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
  const { login } = useAuth(); // Use the login function from AuthContext

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
      // Backend sets httpOnly cookie. Frontend sets user in context.
      login(data); // Call the login function from AuthContext
      toast.success(`Welcome back, ${data.firstName}!`);
      navigate('/'); // Navigate to home or dashboard after successful login
    },
    onError: (err: unknown) => {
      // The auth.api.ts formatError function already extracts a good message
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