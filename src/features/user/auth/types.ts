import type { User } from "@/context/AuthContext";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type AuthResponse = {
  data: User;
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