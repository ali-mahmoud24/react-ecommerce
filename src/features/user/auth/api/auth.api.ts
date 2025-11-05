// src/features/user/auth/api/auth.api.ts
import http from '@/lib/axios';
import type { User } from '@/context/AuthContext';
import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  VerifyResetCodeRequest,
  ResetPasswordRequest,
} from '../types';

function formatError(e: unknown): Error {
  if (typeof e === 'object' && e && 'response' in e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = e as any;
    const message =
      err.response?.data?.message ??
      err.response?.data?.error ??
      err.response?.data?.msg ??
      err.message ??
      'Something went wrong';
    return new Error(message);
  }
  return new Error('Network error');
}

export async function loginApi(credentials: LoginRequest): Promise<{ data: User }> {
  try {
    const { data } = await http.post<{ data: User }>('/auth/login', credentials);
    return data;
  } catch (err) {
    throw formatError(err);
  }
}

export async function registerApi(userData: RegisterRequest): Promise<{ data: User }> {
  try {
    const { data } = await http.post<{ data: User }>('/auth/signup', userData);
    return data;
  } catch (err) {
    throw formatError(err);
  }
}

export async function logoutApi(): Promise<void> {
  try {
    await http.post('/auth/logout', {});
  } catch (err) {
    throw formatError(err);
  }
}

export async function meApi(): Promise<User> {
  try {
    const response = await http.get('/users/profile');
    return response.data.data; // because backend wraps it in { data: user }
  } catch (err) {
    throw formatError(err);
  }
}

// 1- Forgot Password
export async function forgotPasswordApi(
  emailData: ForgotPasswordRequest,
): Promise<{ status: string; message: string }> {
  try {
    const { data } = await http.post<{ status: string; message: string }>(
      '/auth/forgotPassword',
      emailData,
    );
    return data;
  } catch (err) {
    throw formatError(err);
  }
}

// 2- Verify Reset Code
export async function verifyResetCodeApi(
  verifyData: VerifyResetCodeRequest,
): Promise<{ status: string }> {
  try {
    const { data } = await http.post<{ status: string }>('/auth/verifyResetCode', verifyData);
    return data;
  } catch (err) {
    throw formatError(err);
  }
}

// 3- Reset Password
export async function resetPasswordApi(resetData: ResetPasswordRequest): Promise<User> {
  try {
    const response = await http.patch('/auth/resetPassword', resetData);
    return response.data.data; // backend wraps user in data
  } catch (err) {
    throw formatError(err);
  }
}

export const authAPI = {
  login: loginApi,
  register: registerApi,
  logout: logoutApi,
  me: meApi,
  forgotPassword: forgotPasswordApi,
  verifyResetCode: verifyResetCodeApi,
  resetPassword: resetPasswordApi,
};
