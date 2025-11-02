export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  profileImageUrl?: string;
}
export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
  profileImageUrl?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: string;
}
