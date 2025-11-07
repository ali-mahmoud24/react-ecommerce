import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import {
  fetchPaginatedProducts,
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/product.api';
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
  PaginatedProductsResponse,
} from '../types/product.type';

export const PRODUCTS_QK = ['products'] as const;

export function buildSortParam(sortModel?: GridSortModel): string | undefined {
  if (!Array.isArray(sortModel) || sortModel.length === 0) {
    return undefined; 
  }
  const { field, sort } = sortModel[0];
  if (!field) return undefined;
  return sort === 'asc' ? field : `-${field}`;
}

function buildFilterParams(filterModel: GridFilterModel) {
  const params: Record<string, string | boolean> = {};
  for (const filter of filterModel.items) {
    if (!filter.value || !filter.field) continue;
    if (filter.field === 'title') {
      params.keyword = filter.value as string;
    } else {
      params[filter.field] = filter.value as string;
    }
  }
  return params;
}

export function usePaginatedProductsQuery(
  page: number,
  limit: number,
  sortModel: GridSortModel,
  filterModel: GridFilterModel,
  keyword?: string,
) {
  const sort = buildSortParam(sortModel);
  const filters = buildFilterParams(filterModel);

  return useQuery<PaginatedProductsResponse>({
    queryKey: [...PRODUCTS_QK, page, limit, sort, filters, keyword],
    queryFn: () => fetchPaginatedProducts(page, limit, sort, filters, keyword),
    enabled: page > 0 && limit > 0,
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
}

// ==========================
//         QUERIES
// ==========================
export function useProductsQuery() {
  return useQuery<Product[]>({
    queryKey: PRODUCTS_QK,
    queryFn: fetchProducts,
    initialData: [],
  });
}

export function useProductByIdQuery(id: string) {
  return useQuery<Product>({
    queryKey: [...PRODUCTS_QK, id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}

// ==========================
//        MUTATIONS
// ==========================
export function useCreateProductMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createProduct(formData),

    // Optimistic update
    onMutate: async (formData) => {
      await qc.cancelQueries({ queryKey: PRODUCTS_QK });

      const previous = qc.getQueryData<Product[]>(PRODUCTS_QK) ?? [];

      const optimisticProduct: Product = {
        id: `temp-${Date.now()}`,
        title: (formData.get('title') as string) ?? 'Untitled product',
        description: (formData.get('description') as string) ?? '',
        price: Number(formData.get('price') ?? 0),
        quantity: Number(formData.get('quantity') ?? 0),
        createdAt: new Date().toISOString(),
        imageCoverUrl: null,
        imageUrls: [],
        _optimistic: true,
      };

      qc.setQueryData(PRODUCTS_QK, [...previous, optimisticProduct]);

      return { previous };
    },

    // Rollback if error
    onError: (_err, _data, context) => {
      if (context?.previous) qc.setQueryData(PRODUCTS_QK, context.previous);
    },

    // Replace optimistic product with real one
    onSuccess: (res) => {
      qc.setQueryData<Product[]>(PRODUCTS_QK, (old) =>
        old?.map((p) => (p._optimistic ? res.data : p)) ?? []
      );
    },

    // Always refetch fresh data
    onSettled: () => {
      qc.invalidateQueries({ queryKey: PRODUCTS_QK });
    },
  });
}


export function useUpdateProductMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateProduct(id, formData),

    onMutate: async ({ id, formData }) => {
      await qc.cancelQueries({ queryKey: PRODUCTS_QK });
      const prev = qc.getQueryData<Product[]>(PRODUCTS_QK) ?? [];

      const optimisticProduct: Partial<Product> = {
        id,
        title: (formData.get('title') as string) || '',
        description: (formData.get('description') as string) || '',
        price: Number(formData.get('price')) || 0,
        priceAfterDiscount: Number(formData.get('priceAfterDiscount') || 0),
        quantity: Number(formData.get('quantity')) || 0,
        colors: (formData.getAll('colors') as string[]) || [],
        category: { id: (formData.get('category') as string) || '', name: '' },
        brand: { id: (formData.get('brand') as string) || '', name: '' },
        imageCoverUrl: formData.get('imageCover') instanceof File
          ? URL.createObjectURL(formData.get('imageCover') as File)
          : prev.find(p => p.id === id)?.imageCoverUrl || null,
        imageUrls:
          (formData.getAll('images') as any[]).filter(f => f instanceof File).length > 0
            ? (formData.getAll('images') as File[]).map((file) => URL.createObjectURL(file))
            : prev.find(p => p.id === id)?.imageUrls || [],
      };

      qc.setQueryData(PRODUCTS_QK, prev.map((p) => (p.id === id ? { ...p, ...optimisticProduct } : p)));

      return { prev };
    },

    onError: (_err, _payload, ctx) => {
      if (ctx?.prev) qc.setQueryData(PRODUCTS_QK, ctx.prev);
    },

    onSettled: () => qc.invalidateQueries({ queryKey: PRODUCTS_QK }),
  });
}



export function useDeleteProductMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: PRODUCTS_QK });

      const prev = qc.getQueryData<Product[]>(PRODUCTS_QK) ?? [];

      qc.setQueryData<Product[]>(
        PRODUCTS_QK,
        prev.filter((p) => p.id !== id),
      );

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(PRODUCTS_QK, ctx.prev);
    },

    onSettled: () => qc.invalidateQueries({ queryKey: PRODUCTS_QK }),
  });
}
