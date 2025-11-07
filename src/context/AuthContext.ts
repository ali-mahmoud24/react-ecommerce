// context/AuthContext.ts
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

export type UpdatedUser = Partial<User>;

export type AuthContextType = {
  // User state
  user: User | null;
  updatedUser: UpdatedUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Auth actions
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: UpdatedUser) => void;
  setUser: (user: User | null) => void;
  setUpdatedUser: (user: UpdatedUser | null) => void;

  // Password reset state
  resetEmail: string | null;
  setResetEmail: (email: string | null) => void;
  isCodeVerified: boolean;
  setIsCodeVerified: (verified: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
