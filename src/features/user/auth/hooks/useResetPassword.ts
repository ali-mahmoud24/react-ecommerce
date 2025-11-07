// src/features/user/auth/hooks/useResetPassword.ts
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authAPI } from '../api/auth.api';
import { resetPasswordSchema, type ResetPasswordFormData } from '../schemas/auth.schema';
import { useAuth } from '@/hooks/useAuth';

export function useResetPassword() {
  const { login,isAdmin,isUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
      resetCode: '',
      newPassword: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);

    setIsError(false);
    setError(null);
    try {
      await authAPI.resetPassword(data);
      await authAPI.login({ email: data.email, password: data.newPassword });
      const user = await authAPI.me();
      login(user);
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err as Error);
      setIsError(true);
      setIsLoading(false);
      return false;
    }
  };

  return { form, onSubmit, isLoading, isError, error };
}
