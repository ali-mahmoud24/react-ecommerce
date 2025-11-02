export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
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
