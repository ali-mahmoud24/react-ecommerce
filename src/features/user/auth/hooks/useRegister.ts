// src/features/user/auth/hooks/useRegister.ts
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authAPI } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '../schemas/auth.schema';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { User } from '@/context/AuthContext';

export const useRegister = () => {
  const { login } = useAuth(); // Use the login function from AuthContext
  const navigate = useNavigate();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: RegisterFormData) =>
      authAPI.register({
        firstName: data.firstName,
        lastName: data.lastName, // Ensure lastName is passed
        email: data.email,
        password: data.password,
      }),
    onSuccess: (res) => {
      const user = res.data as User; // Assuming res.data contains the User object
      login(user); // Call the login function from AuthContext
      toast.success(`Welcome, ${user.firstName}!`);
      navigate('/'); // Navigate to home or dashboard after successful registration
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
    error: mutation.error, // Expose error for Alert component
  };
};