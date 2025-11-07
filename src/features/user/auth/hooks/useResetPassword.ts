// src/features/user/auth/hooks/useResetPassword.ts
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authAPI } from '../api/auth.api';
import { resetPasswordSchema, type ResetPasswordFormData } from '../schemas/auth.schema';

export function useResetPassword() {
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
