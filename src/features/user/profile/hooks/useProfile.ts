import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getProfileApi, updateProfileApi } from '../../auth/api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { type ProfileFormData, profileSchema } from '../schemas/profile.schema';

export const useProfile = () => {
  const { user, updateUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await getProfileApi();
      return response.data;
    },
    enabled: !!user,
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: {
      firstName: profile?.firstName || user?.firstName || '',
      lastName: profile?.lastName || user?.lastName || '',
      email: profile?.email || user?.email || '',
      phone: profile?.phone || '',
    },
  });

  const mutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (response) => {
      updateUser(response.data);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      // Show success message
      console.log('Profile updated successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || 'Profile update failed. Please try again.';
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
