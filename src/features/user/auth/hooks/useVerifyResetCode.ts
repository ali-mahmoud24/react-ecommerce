// src/features/user/auth/hooks/useVerifyResetCode.ts
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authAPI } from '../api/auth.api';
import { resetPasswordSchema } from '../schemas/auth.schema';

export type VerifyResetCodeFormData = {
  email: string;
  resetCode: string;
};

export function useVerifyResetCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const form = useForm<VerifyResetCodeFormData>({
    resolver: zodResolver(
      // Only validate email and resetCode
      resetPasswordSchema.pick({ email: true, resetCode: true }),
    ),
    defaultValues: { email: '', resetCode: '' },
  });

  const onSubmit = async (data: VerifyResetCodeFormData) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    try {
      await authAPI.verifyResetCode(data);
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
