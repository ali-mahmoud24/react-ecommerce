import http from '@/lib/axios';
import type { User } from '@/context/AuthContext';

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type UpdateProfileRequest = {
  name?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
    zipCode?: string;
  };
};

export async function loginApi(credentials: LoginRequest): Promise<AuthResponse> {
  const { data } = await http.post<AuthResponse>('/auth/login', credentials);
  return data;
}

export async function registerApi(userData: RegisterRequest): Promise<AuthResponse> {
  const { data } = await http.post<AuthResponse>('/auth/register', userData);
  return data;
}

export async function getProfileApi(): Promise<User> {
  const { data } = await http.get<User>('/auth/profile');
  return data;
}

export async function updateProfileApi(profileData: UpdateProfileRequest): Promise<User> {
  const { data } = await http.put<User>('/auth/profile', profileData);
  return data;
}

export async function logoutApi(): Promise<void> {
  await http.post('/auth/logout');
}