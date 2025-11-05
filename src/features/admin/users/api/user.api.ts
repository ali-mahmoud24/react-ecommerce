import http from '@/lib/axios';
import type { User, UpdateUserDto, PaginatedUsersResponse, UserResponse } from '../types/user.type';

const RESOURCE = '/users';

export async function fetchPaginatedUsers(
  page = 1,
  limit = 10,
  sort?: string,
  filters?: Record<string, string | boolean>,
  keyword?: string,
) {
  const params: Record<string, string | number> = { page, limit };

  if (sort) params.sort = sort;
  if (keyword) params.keyword = keyword;
  if (filters) Object.assign(params, filters);

  const { data } = await http.get<PaginatedUsersResponse>('/users', { params });
  return data;
}

export async function fetchUsers() {
  const { data } = await http.get<User[]>(RESOURCE);
  return data;
}

export async function fetchUserById(id: string) {
  const { data } = await http.get<UserResponse>(`${RESOURCE}/${id}`);
  return data.data;
}

export async function createUser(formData: FormData) {
  const { data } = await http.post(RESOURCE, formData);
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
