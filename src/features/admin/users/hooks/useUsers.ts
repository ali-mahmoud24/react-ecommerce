import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPaginatedUsers,
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../api/user.api';
import type {
  User,
  CreateUserDto,
  UpdateUserDto,
  PaginatedUsersResponse,
} from '../types/user.type';
import type { GridFilterModel, GridSortModel } from '@mui/x-data-grid';

// Query key
export const USERS_QK = ['users'] as const;

function buildSortParam(sortModel: GridSortModel): string | undefined {
  if (!sortModel.length) return undefined;

  const { field, sort } = sortModel[0];

  // map fullName → firstName
  if (field === 'fullName') {
    return sort === 'asc' ? 'firstName' : '-firstName';
  }

  return sort === 'asc' ? field : `-${field}`;
}

function buildFilterParams(filterModel: GridFilterModel) {
  const params: Record<string, string | boolean> = {};

  for (const filter of filterModel.items) {
    if (!filter.value || !filter.field) continue;

    if (filter.field === 'fullName') {
      params.keyword = filter.value;
    } else if (filter.field === 'active') {
      params.active = filter.value === 'true'; // <-- Convert to boolean
    } else {
      params[filter.field] = filter.value;
    }
  }

  return params;
}

export function usePaginatedUsersQuery(
  page: number,
  limit: number,
  sortModel: GridSortModel,
  filterModel: GridFilterModel,
  keyword?: string,
) {
  const sort = buildSortParam(sortModel);
  const filters = buildFilterParams(filterModel);

  return useQuery<PaginatedUsersResponse>({
    queryKey: [...USERS_QK, page, limit, sort, filters, keyword],
    queryFn: () => fetchPaginatedUsers(page, limit, sort, filters, keyword),
    enabled: page > 0 && limit > 0,
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
}

// ==========================
//         QUERIES
// ==========================

export function useUsersQuery() {
  return useQuery<User[]>({
    queryKey: USERS_QK,
    queryFn: fetchUsers,
    initialData: [],
  });
}

export function useUserByIdQuery(id: string) {
  return useQuery<User>({
    queryKey: [...USERS_QK, id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
}

// ==========================
//        MUTATIONS
// ==========================

function formDataToCreateUserDto(formData: FormData): CreateUserDto {
  return {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    passwordConfirm: formData.get('passwordConfirm') as string,
    role: formData.get('role') as string,
  };
}

export function useCreateUserMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createUser(formData),

    onMutate: async (formData) => {
      await qc.cancelQueries({ queryKey: USERS_QK });

      const prev = qc.getQueryData<User[]>(USERS_QK) ?? [];

      const payload = formDataToCreateUserDto(formData);

      const optimisticUser: User = {
        id: `temp-${Date.now()}`,
        firstName: payload.firstName,
        lastName: payload.lastName,
        fullName: `${payload.firstName} ${payload.lastName}`,
        email: payload.email,
        role: payload.role,
        createdAt: new Date().toISOString(),
        active: true,
        _optimistic: true,
      };

      qc.setQueryData(USERS_QK, [...prev, optimisticUser]);

      return { prev };
    },

    onError: (_err, _payload, ctx) => {
      if (ctx?.prev) qc.setQueryData(USERS_QK, ctx.prev);
    },

    onSuccess: (res) => {
      qc.setQueryData<User[]>(USERS_QK, (old) => old?.map((u) => (u._optimistic ? res.data : u)));
    },

    onSettled: () => qc.invalidateQueries({ queryKey: USERS_QK }),
  });
}

export function useUpdateUserMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserDto }) =>
      updateUser(id, payload),

    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries({ queryKey: USERS_QK });

      const prev = qc.getQueryData<User[]>(USERS_QK) ?? [];

      qc.setQueryData<User[]>(
        USERS_QK,
        prev.map((u) => (u.id === id ? { ...u, ...payload } : u)),
      );

      return { prev };
    },

    onError: (_err, _payload, ctx) => {
      if (ctx?.prev) qc.setQueryData(USERS_QK, ctx.prev);
    },

    onSettled: () => qc.invalidateQueries({ queryKey: USERS_QK }),
  });
}

export function useDeleteUserMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: USERS_QK });

      const prev = qc.getQueryData<User[]>(USERS_QK) ?? [];

      qc.setQueryData<User[]>(
        USERS_QK,
        prev.filter((u) => u.id !== id),
      );

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(USERS_QK, ctx.prev);
    },

    onSettled: () => qc.invalidateQueries({ queryKey: USERS_QK }),
  });
}
