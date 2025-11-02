import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
});

type FormData = z.infer<typeof schema>;

export function useForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setSuccess(false);

    // Simulate API delay
    await new Promise((res) => setTimeout(res, 1500));

    console.log('Password reset link sent to:', data.email);

    setIsLoading(false);
    setSuccess(true);
    reset();
  };

  return { register, handleSubmit, onSubmit, errors, isLoading, success };
}
