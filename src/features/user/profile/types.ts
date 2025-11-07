export type UpdateProfileRequest = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImage?: File | string;
};

export type UserProfile = {
  _id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
};
