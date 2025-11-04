import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPaginatedUsers,
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  type PaginatedUsersResponse,
} from '../api/user.api';
import type { User, CreateUserDto, UpdateUserDto } from '../types/user.type';
import type { GridSortModel } from '@mui/x-data-grid';

// Query key
export const USERS_QK = ['users'] as const;

function buildSortParam(sortModel: GridSortModel): string | undefined {
  if (!sortModel.length) return undefined;
  const { field, sort } = sortModel[0];
  return sort === 'asc' ? field : `-${field}`;
}

export function usePaginatedUsersQuery(page: number, limit: number, sortModel: GridSortModel) {
  const sort = buildSortParam(sortModel);

  return useQuery<PaginatedUsersResponse>({
    queryKey: [...USERS_QK, page, limit, sort],
    queryFn: () => fetchPaginatedUsers(page, limit, sort),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
    retry: 1,
    enabled: page > 0 && limit > 0,
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

export function useCreateUserMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserDto) => createUser(payload),

    // Optimistic cache update
    onMutate: async (payload) => {
      await qc.cancelQueries({ queryKey: USERS_QK });

      const prev = qc.getQueryData<User[]>(USERS_QK) ?? [];

      const optimistic: User = {
        ...payload,
      };

      qc.setQueryData<User[]>(USERS_QK, [...prev, optimistic]);

      return { prev };
    },

    // rollback on error
    onError: (_err, _payload, ctx) => {
      if (ctx?.prev) qc.setQueryData(USERS_QK, ctx.prev);
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
