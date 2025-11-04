// features/user/profile/api/profile.api.ts
import http from '@/lib/axios';
import type { User } from '@/context/AuthContext';

export type UpdateProfileRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profileImage?: string;
};

export async function getProfileApi(): Promise<{ data: User }> {
  try {
    const { data } = await http.get<{ data: User }>('/auth/profile');
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new Error('Failed to fetch profile');
  }
}

export async function updateProfileApi(profileData: UpdateProfileRequest): Promise<{ data: User }> {
  try {
    const { data } = await http.put<{ data: User }>('/auth/profile', profileData);
    return data;
  } catch (err) {
    if (typeof err === 'object' && err && 'response' in err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as any;
      const message = error.response?.data?.message || 'Profile update failed';
      throw new Error(message);
    }
    throw new Error('Network error');
  }
}
