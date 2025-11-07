import http from '@/lib/axios';
import type { User, CreateUserDto, UpdateUserDto } from '../types/user.type';

const RESOURCE = '/users';

export async function fetchUsers() {
  const { data } = await http.get<User[]>(RESOURCE);
  return data;
}

export async function fetchUserById(id: string) {
  const { data } = await http.get<User>(`${RESOURCE}/${id}`);
  return data;
}

export async function createUser(payload: CreateUserDto) {
  const { data } = await http.post<User>(RESOURCE, payload);
  return data;
}

export async function updateUser(id: string, payload: UpdateUserDto) {
  const { data } = await http.put<User>(`${RESOURCE}/${id}`, payload);
  return data;
}

export async function deleteUser(id: string) {
  const { data } = await http.delete(`${RESOURCE}/${id}`);
  return data;
}
