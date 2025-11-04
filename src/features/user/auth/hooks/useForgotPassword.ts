// src/features/user/auth/hooks/useForgotPassword.ts
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../api/auth.api';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form'; // Added useForm
import { zodResolver } from '@hookform/resolvers/zod'; // Added zodResolver
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../schemas/auth.schema'; // Import schema

export function useForgotPassword() {
  const form = useForm<ForgotPasswordFormData>({ // Initialize useForm
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: { email: string }) => authAPI.forgotPassword({ email: payload.email }),
    onSuccess: (res) => {
      toast.success(res.message || 'Reset code sent to email');
      // Optionally reset form after success
      form.reset();
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Request failed';
      toast.error(message);
    },
  });

  const onSubmit = (values: ForgotPasswordFormData) => mutation.mutate(values);

  return {
    form, // Expose form methods
    onSubmit, // Expose onSubmit
    isLoading: mutation.isPending,
  };
}