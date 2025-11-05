export interface PaginatedUsersResponse {
  status?: string;
  results: number;
  paginationResult: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    totalDocs: number;
    next: number | null;
    previous: number | null;
  };
  data: User[];
}

export interface UserResponse {
  data: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: string;
  profileImageUrl?: string;
  _optimistic?: boolean;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
  profileImage?: FileList | null;
}

export type CreateUserFormPayload = FormData;

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
}
