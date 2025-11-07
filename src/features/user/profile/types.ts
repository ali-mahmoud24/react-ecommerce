export type UpdateProfileRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profileImage?: File | string; // allow both base64/file or url
};

export type UserProfile = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
