import type { User } from "@/context/AuthContext";

/**
 * ---------------------------
 * 🔹 REQUEST PAYLOADS
 * ---------------------------
 */

// ✅ Login
export type LoginRequest = {
  email: string;
  password: string;
};

// ✅ Register (Signup)
export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // passwordConfirm is handled on frontend only
};

// ✅ Forgot Password
export type ForgotPasswordRequest = {
  email: string;
};

// ✅ Verify Reset Code
export type VerifyResetCodeRequest = {
  email: string;
  resetCode: string;
};

// ✅ Reset Password
export type ResetPasswordRequest = {
  email: string;
  newPassword: string;
};

/**
 * ---------------------------
 * 🔹 RESPONSE TYPES
 * ---------------------------
 */

// ✅ Backend always returns `{ status, message, data? }`
export type ApiSuccess<T = unknown> = {
  status: string;
  message?: string;
  data?: T;
};

// ✅ Standardized auth responses
export type AuthResponse = ApiSuccess<User>;

// ✅ Forgot password / verify reset responses
export type SimpleResponse = ApiSuccess<null>;
