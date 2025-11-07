import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { authAPI } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginFormData } from '../schemas/auth.schema';
import { ADMIN_ROUTES, USER_ROUTES } from '@/constants/routes';
import { useState } from 'react';

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isDeactivated, setIsDeactivated] = useState(false);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormData) => authAPI.login(values),
    onSuccess: async () => {
      const user = await authAPI.me();
      login(user);
      toast.success(`Welcome back, ${user.firstName}!`);
      navigate(user.role === 'admin' ? ADMIN_ROUTES.ROOT : USER_ROUTES.ROOT);
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Login failed';
      if (message.includes('deactivated') || message.includes('inactive')) {
        console.log('setIsDeactivated(true);');
        setIsDeactivated(true);
      }
      toast.error(message);
    },
  });

  const onSubmit = (values: LoginFormData) => loginMutation.mutate(values);

  return { form, onSubmit,isDeactivated,setIsDeactivated, isLoading: loginMutation.isPending };
}
