import { createContext } from 'react';

export type UserAddress = {
  id: string;
  alias?: string;
  country: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  details?: string;
  phone: string;
  postalCode?: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profileImage?: string;
  profileImageUrl?: string;
  role: 'user' | 'admin';
  active: boolean;
  wishlist: string[];
  addresses: UserAddress[];
  createdAt?: string;
  updatedAt?: string;
};

export type UserUpdated = Omit<User, 'email'>; // Updated user info except email

export type AuthContextType = {
  user: User | null;
  updatedUser: UserUpdated | null;
  isAuthenticated: boolean;
  isLoading: boolean;


  // Auth actions
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updated: UserUpdated) => void;
  setUser: (user: User | null) => void;

  // Password reset
  resetEmail: string | null;
  setResetEmail: (email: string | null) => void;
  isCodeVerified: boolean;
  setIsCodeVerified: (verified: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

