// features/user/profile/hooks/useProfile.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { profileSchema, type ProfileFormData } from '../schemas/profile.schema';
import toast from 'react-hot-toast';
import { getProfileApi, updateProfileApi } from '../api/auth.api';

export const useProfile = () => {
  const { user, updateUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileApi,
    enabled: !!user,
  });

  const profile = profileData?.data;

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: {
      firstName: profile?.firstName || user?.firstName || '',
      lastName: profile?.lastName || user?.lastName || '',
      email: profile?.email || user?.email || '',
      phone: profile?.phone || user?.phone || '',
    },
  });

  const mutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (response) => {
      updateUser(response.data);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
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
