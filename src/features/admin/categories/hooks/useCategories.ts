import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPaginatedCategories,
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  patchCategoryName,
  patchCategoryImage,
} from '../api/user.api';
import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  PaginatedCategoriesResponse,
} from '../types/category.type';

import type { GridSortModel } from '@mui/x-data-grid';

// Query key
export const CATEGORIES_QK = ['categories'] as const;

function buildSortParam(sortModel: GridSortModel): string | undefined {
  if (!sortModel.length) return undefined;

  const { field, sort } = sortModel[0];

  return sort === 'asc' ? field : `-${field}`;
}

export function usePaginatedCategoriesQuery(
  page: number,
  limit: number,
  sortModel: GridSortModel,
  keyword?: string,
) {
  const sort = buildSortParam(sortModel);

  return useQuery<PaginatedCategoriesResponse>({
    queryKey: [...CATEGORIES_QK, page, limit, sort, keyword],
    queryFn: () => fetchPaginatedCategories(page, limit, sort, keyword),
    enabled: page > 0 && limit > 0,
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
}

// ==========================
//         QUERIES
// ==========================

export function useUsersQuery() {
  return useQuery<Category[]>({
    queryKey: CATEGORIES_QK,
    queryFn: fetchCategories,
    initialData: [],
  });
}

export function useCategoryByIdQuery(id: string) {
  return useQuery<Category>({
    queryKey: [...CATEGORIES_QK, id],
    queryFn: () => fetchCategoryById(id),
    enabled: !!id,
  });
}

// ==========================
//        MUTATIONS
// ==========================

function formDataToCreateCategoryDto(formData: FormData): CreateCategoryDto {
  return {
    name: formData.get('name') as string,
    image: formData.get('image') as FileList | null,
  };
}

export function useCreateCategoryMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createCategory(formData),

    onMutate: async (formData) => {
      await qc.cancelQueries({ queryKey: CATEGORIES_QK });

      const prev = qc.getQueryData<Category[]>(CATEGORIES_QK) ?? [];

      const payload = formDataToCreateCategoryDto(formData);

      const optimisticUser: Category = {
        id: `temp-${Date.now()}`,
        name: payload.name,
        createdAt: new Date().toISOString(),
        _optimistic: true,
      };

      qc.setQueryData(CATEGORIES_QK, [...prev, optimisticUser]);

      return { prev };
    },

    onError: (_err, _payload, ctx) => {
      if (ctx?.prev) qc.setQueryData(CATEGORIES_QK, ctx.prev);
    },

    onSuccess: (res) => {
      qc.setQueryData<Category[]>(CATEGORIES_QK, (old) =>
        old?.map((u) => (u._optimistic ? res.data : u)),
      );
    },

    onSettled: () => qc.invalidateQueries({ queryKey: CATEGORIES_QK }),
  });
}

export function useUpdateCategoryMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCategoryDto }) =>
      updateCategory(id, payload),

    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries({ queryKey: CATEGORIES_QK });

      const prev = qc.getQueryData<Category[]>(CATEGORIES_QK) ?? [];

      qc.setQueryData<Category[]>(
        CATEGORIES_QK,
        prev.map((u) => (u.id === id ? { ...u, ...payload } : u)),
      );

      return { prev };
    },

    onError: (_err, _payload, ctx) => {
      if (ctx?.prev) qc.setQueryData(CATEGORIES_QK, ctx.prev);
    },

    onSettled: () => qc.invalidateQueries({ queryKey: CATEGORIES_QK }),
  });
}

export function useDeleteCategoryMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: CATEGORIES_QK });

      const prev = qc.getQueryData<Category[]>(CATEGORIES_QK) ?? [];

      qc.setQueryData<Category[]>(
        CATEGORIES_QK,
        prev.filter((u) => u.id !== id),
      );

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(CATEGORIES_QK, ctx.prev);
    },

    onSettled: () => qc.invalidateQueries({ queryKey: CATEGORIES_QK }),
  });
}

export function usePatchCategoryNameMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => patchCategoryName(id, name),

    onMutate: async ({ id, name }) => {
      await qc.cancelQueries({ queryKey: [...CATEGORIES_QK, id] });

      //  Save previous data for rollback
      const prevCategory = qc.getQueryData<Category>([...CATEGORIES_QK, id]);
      const prevList = qc.getQueryData<Category[]>(CATEGORIES_QK);

      //  Optimistically update the single-category cache
      if (prevCategory) {
        qc.setQueryData<Category>([...CATEGORIES_QK, id], { ...prevCategory, name });
      }

      //  Optimistically update the category list cache
      if (prevList) {
        qc.setQueryData<Category[]>(
          CATEGORIES_QK,
          prevList.map((cat) => (cat.id === id ? { ...cat, name } : cat)),
        );
      }

      return { prevCategory, prevList };
    },

    onError: (_err, _payload, ctx) => {
      //  Rollback both caches if something fails
      if (ctx?.prevCategory) {
        qc.setQueryData([...CATEGORIES_QK, ctx.prevCategory.id], ctx.prevCategory);
      }
      if (ctx?.prevList) {
        qc.setQueryData(CATEGORIES_QK, ctx.prevList);
      }
    },

    onSettled: (_data, _error, { id }) => {
      //  Revalidate both caches to get fresh server data
      qc.invalidateQueries({ queryKey: [...CATEGORIES_QK, id] });
      qc.invalidateQueries({ queryKey: CATEGORIES_QK });
    },
  });
}

export function usePatchCategoryImageMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, image }: { id: string; image: File }) => patchCategoryImage(id, image),

    onMutate: async ({ id, image }) => {
      await qc.cancelQueries({ queryKey: [...CATEGORIES_QK, id] });
      const prev = qc.getQueryData<Category>([...CATEGORIES_QK, id]);

      if (prev) {
        const previewUrl = URL.createObjectURL(image);
        qc.setQueryData<Category>([...CATEGORIES_QK, id], {
          ...prev,
          imageUrl: previewUrl,
        });
      }

      return { prev };
    },

    onError: (_err, _payload, ctx) => {
      if (ctx?.prev) qc.setQueryData([...CATEGORIES_QK, ctx.prev.id], ctx.prev);
    },

    onSettled: (_data, _error, { id }) => {
      qc.invalidateQueries({ queryKey: [...CATEGORIES_QK, id] });
      qc.invalidateQueries({ queryKey: CATEGORIES_QK }); // list refresh
    },
  });
}
