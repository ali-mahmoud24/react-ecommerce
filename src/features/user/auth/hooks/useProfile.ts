import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getProfileApi, updateProfileApi } from '../../auth/api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { profileSchema, type ProfileFormData } from '../schemas/auth.schema';

export const useProfile = () => {
  const { user, login } = useAuth();
  const queryClient = useQueryClient();

  // For demo purposes, we'll use mock data instead of actual API call
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        id: user?.id || '1',
        name: user?.name || 'John Doe',
        email: user?.email || 'john@example.com',
        role: user?.role || 'user',
        phone: user?.phone || '+1234567890',
        address: user?.address || {
          street: '123 Main St',
          city: 'New York',
          country: 'USA',
          zipCode: '10001'
        }
      };
    },
    enabled: !!user,
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: {
      name: profile?.name || user?.name || '',
      email: profile?.email || user?.email || '',
      phone: profile?.phone || '',
      address: {
        street: profile?.address?.street || '',
        city: profile?.address?.city || '',
        country: profile?.address?.country || '',
        zipCode: profile?.address?.zipCode || '',
      },
    },
  });

  const mutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (updatedUser) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        login(token, updatedUser);
      }
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Profile update failed. Please try again.';
      form.setError('root', { message: errorMessage });
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
    profile,
    isLoadingProfile,
    error: mutation.error,
  };
};