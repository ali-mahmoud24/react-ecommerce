// src/features/user/auth/hooks/useForgotPassword.ts
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authAPI } from '../api/auth.api';
import { type ForgotPasswordFormData, forgotPasswordSchema } from '../schemas/auth.schema';

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    try {
      await authAPI.forgotPassword({ email: data.email });
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
