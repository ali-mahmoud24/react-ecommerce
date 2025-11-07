import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPaginatedBrands,
  fetchBrands,
  fetchBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  patchBrandName,
  patchBrandImage,
} from '../api/brand.api';
import type {
  Brand,
  CreateBrandDto,
  UpdateBrandDto,
  PaginatedBrandsResponse,
} from '../types/brand.type';

import type { GridSortModel } from '@mui/x-data-grid';

// Query key
export const BRANDS_QK = ['brands'] as const;

function buildSortParam(sortModel: GridSortModel): string | undefined {
  if (!sortModel.length) return undefined;

  const { field, sort } = sortModel[0];

  return sort === 'asc' ? field : `-${field}`;
}

export function usePaginatedBrandsQuery(
  page: number,
  limit: number,
  sortModel: GridSortModel,
  keyword?: string,
) {
  const sort = buildSortParam(sortModel);

  return useQuery<PaginatedBrandsResponse>({
    queryKey: [...BRANDS_QK, page, limit, sort, keyword],
    queryFn: () => fetchPaginatedBrands(page, limit, sort, keyword),
    enabled: page > 0 && limit > 0,
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
}

// ==========================
//         QUERIES
// ==========================

export function useBrandsQuery() {
  return useQuery<Brand[]>({
    queryKey: BRANDS_QK,
    queryFn: fetchBrands,
    initialData: [],
  });
}

export function useBrandByIdQuery(id: string) {
  return useQuery<Brand>({
    queryKey: [...BRANDS_QK, id],
    queryFn: () => fetchBrandById(id),
    enabled: !!id,
  });
}

// ==========================
//        MUTATIONS
// ==========================

function formDataToCreateBrandDto(formData: FormData): CreateBrandDto {
  return {
    name: formData.get('name') as string,
    image: formData.get('image') as FileList | null,
  };
}

export function useCreateBrandMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createBrand(formData),

    onMutate: async (formData) => {
      await qc.cancelQueries({ queryKey: BRANDS_QK });

      const prev = qc.getQueryData<Brand[]>(BRANDS_QK) ?? [];

      const payload = formDataToCreateBrandDto(formData);

      const optimisticUser: Brand = {
        id: `temp-${Date.now()}`,
        name: payload.name,
        createdAt: new Date().toISOString(),
        _optimistic: true,
      };

      qc.setQueryData(BRANDS_QK, [...prev, optimisticUser]);

      return { prev };
    },

    onError: (_err, _payload, ctx) => {
      if (ctx?.prev) qc.setQueryData(BRANDS_QK, ctx.prev);
    },

    onSuccess: (res) => {
      qc.setQueryData<Brand[]>(BRANDS_QK, (old) => old?.map((u) => (u._optimistic ? res.data : u)));
    },

    onSettled: () => qc.invalidateQueries({ queryKey: BRANDS_QK }),
  });
}

export function useUpdateBrandMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateBrandDto }) =>
      updateBrand(id, payload),

    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries({ queryKey: BRANDS_QK });

      const prev = qc.getQueryData<Brand[]>(BRANDS_QK) ?? [];

      qc.setQueryData<Brand[]>(
        BRANDS_QK,
        prev.map((u) => (u.id === id ? { ...u, ...payload } : u)),
      );

      return { prev };
    },

    onError: (_err, _payload, ctx) => {
      if (ctx?.prev) qc.setQueryData(BRANDS_QK, ctx.prev);
    },

    onSettled: () => qc.invalidateQueries({ queryKey: BRANDS_QK }),
  });
}

export function useDeleteBrandMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBrand(id),

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: BRANDS_QK });

      const prev = qc.getQueryData<Brand[]>(BRANDS_QK) ?? [];

      qc.setQueryData<Brand[]>(
        BRANDS_QK,
        prev.filter((u) => u.id !== id),
      );

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(BRANDS_QK, ctx.prev);
    },

    onSettled: () => qc.invalidateQueries({ queryKey: BRANDS_QK }),
  });
}

export function usePatchBrandNameMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => patchBrandName(id, name),

    onMutate: async ({ id, name }) => {
      await qc.cancelQueries({ queryKey: [...BRANDS_QK, id] });

      //  Save previous data for rollback
      const prevBrand = qc.getQueryData<Brand>([...BRANDS_QK, id]);
      const prevList = qc.getQueryData<Brand[]>(BRANDS_QK);

      //  Optimistically update the single-Brand cache
      if (prevBrand) {
        qc.setQueryData<Brand>([...BRANDS_QK, id], { ...prevBrand, name });
      }

      //  Optimistically update the Brand list cache
      if (prevList) {
        qc.setQueryData<Brand[]>(
          BRANDS_QK,
          prevList.map((cat) => (cat.id === id ? { ...cat, name } : cat)),
        );
      }

      return { prevBrand, prevList };
    },

    onError: (_err, _payload, ctx) => {
      //  Rollback both caches if something fails
      if (ctx?.prevBrand) {
        qc.setQueryData([...BRANDS_QK, ctx.prevBrand.id], ctx.prevBrand);
      }
      if (ctx?.prevList) {
        qc.setQueryData(BRANDS_QK, ctx.prevList);
      }
    },

    onSettled: (_data, _error, { id }) => {
      //  Revalidate both caches to get fresh server data
      qc.invalidateQueries({ queryKey: [...BRANDS_QK, id] });
      qc.invalidateQueries({ queryKey: BRANDS_QK });
    },
  });
}

export function usePatchBrandImageMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, image }: { id: string; image: File }) => patchBrandImage(id, image),

    onMutate: async ({ id, image }) => {
      await qc.cancelQueries({ queryKey: [...BRANDS_QK, id] });
      const prev = qc.getQueryData<Brand>([...BRANDS_QK, id]);

      if (prev) {
        const previewUrl = URL.createObjectURL(image);
        qc.setQueryData<Brand>([...BRANDS_QK, id], {
          ...prev,
          imageUrl: previewUrl,
        });
      }

      return { prev };
    },

    onError: (_err, _payload, ctx) => {
      if (ctx?.prev) qc.setQueryData([...BRANDS_QK, ctx.prev.id], ctx.prev);
    },

    onSettled: (_data, _error, { id }) => {
      qc.invalidateQueries({ queryKey: [...BRANDS_QK, id] });
      qc.invalidateQueries({ queryKey: BRANDS_QK }); // list refresh
    },
  });
}
