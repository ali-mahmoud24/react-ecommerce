import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';

interface LoginFormData {
  email: string;
  password: string;
}

export function useLogin() {
  const form = useForm<LoginFormData>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await api.post('/auth/login', data);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return { form, onSubmit, isLoading, loginWithGoogle };
}
