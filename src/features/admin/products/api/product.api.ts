import http from '@/lib/axios';
import type { Product, PaginatedProductsResponse, ProductResponse } from '../types/product.type';

const RESOURCE = '/products';

export async function fetchPaginatedProducts(
  page = 1,
  limit = 10,
  sort?: string,
  filters?: Record<string, string | boolean>,
  keyword?: string,
) {
  const params: Record<string, string | number | boolean> = { page, limit };

  if (sort) params.sort = sort;
  if (keyword) params.keyword = keyword;
  if (filters) Object.assign(params, filters);

  const { data } = await http.get<PaginatedProductsResponse>(RESOURCE, { params });
  return data;
}

export async function fetchProducts() {
  const { data } = await http.get<Product[]>(RESOURCE);
  return data;
}

export async function fetchProductById(id: string) {
  const { data } = await http.get<ProductResponse>(`${RESOURCE}/${id}`);
  return data.data;
}

export async function createProduct(formData: FormData) {
  const { data } = await http.post(RESOURCE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export async function updateProduct(id: string, payload: FormData) {
  const { data } = await http.put<Product>(`${RESOURCE}/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export async function deleteProduct(id: string) {
  const { data } = await http.delete(`${RESOURCE}/${id}`);
  return data;
}
