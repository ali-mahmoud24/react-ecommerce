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

// Mock data for demonstration
const mockUser: User = {
  id: '1',
  email: 'john@example.com',
  role: 'user',
  phone: '+1234567890',
  firstName: '',
  lastName: '',
  active: false,
  wishlist: [],
  addresses: [],
};

export async function loginApi(credentials: LoginRequest): Promise<AuthResponse> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In real app, you would use:
  // const { data } = await http.post<AuthResponse>('/auth/login', credentials);

  // Mock response
  if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
    return {
      user: mockUser,
      token: 'mock-jwt-token-123456',
    };
  } else {
    throw new Error('Invalid credentials');
  }
}

export async function registerApi(userData: RegisterRequest): Promise<AuthResponse> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock response
  return {
    user: {
      id: '2',
      firstName: userData.name,
      lastName: userData.name,
      email: userData.email,
      role: 'user',
      active: false,
      wishlist: [],
      addresses: [],
    },
    token: 'mock-jwt-token-789012',
  };
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

export async function forgotPasswordApi(email: string): Promise<void> {
  await http.post('/auth/forgot-password', { email });
}
