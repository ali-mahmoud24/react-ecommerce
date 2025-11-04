// src/features/user/auth/hooks/useResetPassword.ts
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authAPI } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { resetPasswordSchema, type ResetPasswordFormData } from '../schemas/auth.schema';

export function useResetPassword() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
      resetCode: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Mutation for verifying the reset code
  const verifyCodeMutation = useMutation({
    mutationFn: (payload: { email: string; resetCode: string }) =>
      authAPI.verifyResetCode(payload),
    onSuccess: () => {
      toast.success('Reset code verified successfully!');
      // No need to set codeVerified here, the component will handle it
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Verification failed';
      toast.error(message);
      form.setError('resetCode', { type: 'manual', message: message });
    },
  });

  // Mutation for resetting the password
  const resetPasswordMutation = useMutation({
    mutationFn: (payload: { email: string; newPassword: string }) =>
      authAPI.resetPassword(payload),
    onSuccess: (res) => {
      // Backend sets httpOnly cookie and returns user
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user = res.data as any; // Assuming res.data contains the User object directly
      login(user); // Login the user after successful password reset
      toast.success('Password reset successful! You are now logged in.');
      navigate('/'); // Navigate to home or dashboard
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Password reset failed';
      toast.error(message);
      // Optionally set form error for newPassword
      form.setError('newPassword', { type: 'manual', message: message });
    },
  });

  const onSubmit = (values: ResetPasswordFormData) => {
    // This onSubmit will only be called after the code is verified
    resetPasswordMutation.mutate({
      email: values.email,
      newPassword: values.newPassword,
    });
  };

  return {
    form,
    onSubmit,
    verifyResetCode: verifyCodeMutation.mutate, // Expose verify function
    isLoading: verifyCodeMutation.isPending || resetPasswordMutation.isPending,
    isVerificationPending: verifyCodeMutation.isPending,
    isResetPending: resetPasswordMutation.isPending,
    isVerificationSuccess: verifyCodeMutation.isSuccess,
    verificationError: verifyCodeMutation.error,
    resetError: resetPasswordMutation.error,
  };
}