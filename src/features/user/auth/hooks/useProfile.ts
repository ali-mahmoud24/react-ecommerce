import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getProfileApi, updateProfileApi, type UpdateProfileRequest } from '../api/auth.api';
import { profileSchema, type ProfileFormData } from '../schemas/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

export const PROFILE_QK = ['profile'] as const;

export function useProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: PROFILE_QK,
    queryFn: getProfileApi,
    enabled: !!user,
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        country: '',
        zipCode: '',
      },
    },
  });

  // Update form when profile data loads
  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name,
        email: profile.email,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        phone: (profile as any)?.phone || '',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        address: (profile as any)?.address || {
          street: '',
          city: '',
          country: '',
          zipCode: '',
        },
      });
    }
  }, [profile, form]);

  const mutation = useMutation({
    mutationFn: (profileData: UpdateProfileRequest) => updateProfileApi(profileData),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(PROFILE_QK, updatedProfile);
      toast.success('Profile updated successfully!');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    profile,
    isLoading: isLoading || mutation.isPending,
    error: mutation.error,
  };
}