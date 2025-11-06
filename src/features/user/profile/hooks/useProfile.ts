import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { profileAPI } from '../api/profile.api';
import { profileSchema, type ProfileFormData, type ChangePasswordFormData } from '../schemas/profile.schema';
import type { UserProfile, UpdateProfileRequest } from '../types';

export const useProfile = () => {
  const { user, updateUser, setUser } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch profile
  const { data: profileData, isLoading: isLoadingProfile } = useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: profileAPI.getProfile,
    enabled: !!user,
  });

  const profile: Partial<UserProfile> = profileData || user || {};

  // ---------------- Profile Form ----------------
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '' },
  });

  useEffect(() => {
    form.reset({
      firstName: profile.firstName ?? '',
      lastName: profile.lastName ?? '',
      email: profile.email ?? '',
      phone: profile.phone ?? '',
    });
  }, [profile, form]);

  // ---------------- Mutations ----------------
  const updateMutation = useMutation<UserProfile, any, UpdateProfileRequest>({
    mutationFn: profileAPI.updateProfile,
    onSuccess: (updatedProfile) => {
      updateUser({ ...user, ...updatedProfile } as any);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update profile');
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: profileAPI.changePassword,
    onSuccess: () => {
      toast.success('Password changed successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to change password');
    },
  });

  const deactivateMutation = useMutation({
    mutationFn: () => profileAPI.deactivateProfile(),
    onSuccess: () => {
      setUser(null);
      toast.success('Your account has been deactivated.');
      navigate('/login');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to deactivate account');
    },
  });

  // ---------------- Actions ----------------
  const onSubmit = (values: ProfileFormData) => updateMutation.mutate(values);
  const changePassword = (data: ChangePasswordFormData) => {
    const { oldPassword, newPassword } = data;
    changePasswordMutation.mutate({ oldPassword, newPassword, confirmPassword: newPassword });
  };
  const deactivateAccount = () => {
    if (window.confirm('Are you sure you want to deactivate your account? This action is irreversible.')) {
      deactivateMutation.mutate();
    }
  };

  return {
    form,
    onSubmit,
    profile,
    isLoadingProfile,
    isUpdating: updateMutation.isPending,
    deactivateAccount,
    isDeactivating: deactivateMutation.isPending,
    changePassword,
    isChangingPassword: changePasswordMutation.isPending,
  };
};
