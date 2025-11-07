import http from '@/lib/axios';
import type { User } from '@/context/AuthContext';
import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  VerifyResetCodeRequest,
  ResetPasswordRequest,
  AuthResponse,
  ApiSuccess,
} from '../types';

http.defaults.withCredentials = true;

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

// Register
export async function registerApi(payload: RegisterRequest): Promise<User> {
  try {
    const { data } = await http.post<AuthResponse>('/auth/signup', payload);
    return data.data!;
  } catch (err) {
    throw formatError(err);
  }
}

// Login
export async function loginApi(credentials: LoginRequest): Promise<User> {
  try {
    const { data } = await http.post<AuthResponse>('/auth/login', credentials);
    return data.data!;
  } catch (err) {
    throw formatError(err);
  }
}

// Logout
export async function logoutApi(): Promise<void> {
  try {
    await http.post('/auth/logout');
  } catch (err) {
    throw formatError(err);
  }
}

// Current user (optional, if backend exposes /profile)
export async function meApi(): Promise<User> {
  try {
    const { data } = await http.get('/users/profile', {
      validateStatus: (status) => status === 200 || status === 304,
    });
    return data.data!;
  } catch (err) {
    throw formatError(err);
  }
}

// Forgot password
export async function forgotPasswordApi(payload: ForgotPasswordRequest): Promise<ApiSuccess> {
  try {
    const { data } = await http.post<ApiSuccess>('/auth/forgotPassword', payload);
    return data;
  } catch (err) {
    throw formatError(err);
  }
}

// Verify reset code
export async function verifyResetCodeApi(payload: VerifyResetCodeRequest): Promise<ApiSuccess> {
  try {
    const { data } = await http.post<ApiSuccess>('/auth/verifyResetCode', payload);
    return data;
  } catch (err) {
    throw formatError(err);
  }
}

// Reset password
export async function resetPasswordApi(payload: ResetPasswordRequest): Promise<User> {
  try {
    const { data } = await http.patch<AuthResponse>('/auth/resetPassword', payload);
    return data.data!;
  } catch (err) {
    throw formatError(err);
  }
}


// Activate Account
export async function activateAccountApi(payload: { email: string; password: string }) {
  try {
    const { data } = await http.post('/users/activateAccount', payload);
    return data;
  } catch (err) {
    throw formatError(err);
  }
}
/**
 * Export grouped API methods
 */
export const authAPI = {
  register: registerApi,
  login: loginApi,
  logout: logoutApi,
  me: meApi,
  forgotPassword: forgotPasswordApi,
  verifyResetCode: verifyResetCodeApi,
  resetPassword: resetPasswordApi,
  activateAccount: activateAccountApi, 
};
