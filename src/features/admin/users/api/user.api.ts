import http from '@/lib/axios';
import type { User, CreateUserDto, UpdateUserDto } from '../types/user.type';

const RESOURCE = '/users';

export interface PaginatedUsersResponse {
  status?: string;
  results: number;
  paginationResult: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    next?: number;
  };
  data: User[];
}

export async function fetchPaginatedUsers(page: number = 1, limit: number = 10, sort?: string) {
  const params: Record<string, string | number> = { page, limit };

  if (sort) params.sort = sort;

  const { data } = await http.get<PaginatedUsersResponse>('/users', { params });
  return data;
}

export async function fetchUsers() {
  const { data } = await http.get<User[]>(RESOURCE);
  return data;
}

export async function fetchUserById(id: string) {
  const { data } = await http.get<User>(`${RESOURCE}/${id}`);
  return data;
}

export async function createUser(payload: CreateUserDto) {
  const { data } = await http.post(RESOURCE, payload, { withCredentials: true });
  return data;
}

export async function updateUser(id: string, payload: UpdateUserDto) {
  const { data } = await http.put<User>(`${RESOURCE}/${id}`, payload);
  return data;
}

export async function deleteUser(id: string) {
  const { data } = await http.delete(`${RESOURCE}/${id}`, { withCredentials: true });
  return data;
}
