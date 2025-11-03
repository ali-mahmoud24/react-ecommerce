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
  fullName?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);