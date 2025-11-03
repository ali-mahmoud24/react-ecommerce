import http from '@/lib/axios';
import type { User } from '@/context/AuthContext';

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  data: User;
  token: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type VerifyResetCodeRequest = {
  email: string;
  resetCode: string;
};

export type ResetPasswordRequest = {
  email: string;
  newPassword: string;
};

export type UpdateProfileRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profileImage?: string;
};

export async function loginApi(credentials: LoginRequest): Promise<AuthResponse> {
  const { data } = await http.post<AuthResponse>('/auth/login', credentials);
  return data;
}

export async function registerApi(userData: RegisterRequest): Promise<AuthResponse> {
  const { data } = await http.post<AuthResponse>('/auth/signup', userData);
  return data;
}

export async function getProfileApi(): Promise<{ data: User }> {
  const { data } = await http.get<{ data: User }>('/auth/profile');
  return data;
}

export async function updateProfileApi(profileData: UpdateProfileRequest): Promise<{ data: User }> {
  const { data } = await http.put<{ data: User }>('/auth/profile', profileData);
  return data;
}

export async function logoutApi(): Promise<void> {
  await http.post('/auth/logout');
}

export async function forgotPasswordApi(emailData: ForgotPasswordRequest): Promise<{ status: string; message: string }> {
  const { data } = await http.post<{ status: string; message: string }>('/auth/forgotPassword', emailData);
  return data;
}

export async function verifyResetCodeApi(verifyData: VerifyResetCodeRequest): Promise<{ status: string }> {
  const { data } = await http.post<{ status: string }>('/auth/verifyResetCode', verifyData);
  return data;
}

export async function resetPasswordApi(resetData: ResetPasswordRequest): Promise<{ token: string }> {
  const { data } = await http.patch<{ token: string }>('/auth/resetPassword', resetData);
  return data;
}