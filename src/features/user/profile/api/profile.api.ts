import http from '@/lib/axios';
import type { UpdateProfileRequest, UserProfile } from '../types';

export const profileAPI = {
  getProfile: async (): Promise<UserProfile> => {
    const { data } = await http.get<{ data: UserProfile }>('/users/profile', {
      withCredentials: true,
    });
    return data.data;
  },

  updateProfile: async (profileData: UpdateProfileRequest): Promise<UserProfile> => {
    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    const { data } = await http.put<{ data: UserProfile }>(
      '/users/updateMe',
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return data.data;
  },

  deactivateProfile: async () => {
    const { data } = await http.delete('/users/deactivateMe', {
      withCredentials: true,
    });
    return data;
  },

    changePassword: async (data: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
    const response = await http.put('/users/changeMyPassword', data, { withCredentials: true });
    return response.data;
  },
};
