import http from '@/lib/axios';
import type {
  Category,
  UpdateCategoryDto,
  PaginatedCategoriesResponse,
  CategoryResponse,
} from '../types/category.type';

const RESOURCE = '/categories';

export async function fetchPaginatedCategories(
  page = 1,
  limit = 10,
  sort?: string,
  keyword?: string,
) {
  const params: Record<string, string | number> = { page, limit };

  if (sort) params.sort = sort;
  if (keyword) params.keyword = keyword;

  const { data } = await http.get<PaginatedCategoriesResponse>(RESOURCE, { params });
  return data;
}

export async function fetchCategories() {
  const { data } = await http.get<Category[]>(RESOURCE);
  return data;
}

export async function fetchCategoryById(id: string) {
  const { data } = await http.get<CategoryResponse>(`${RESOURCE}/${id}`);
  return data.data;
}

export async function createCategory(formData: FormData) {
  const { data } = await http.post(RESOURCE, formData);
  return data;
}

export async function updateCategory(id: string, payload: UpdateCategoryDto) {
  const { data } = await http.put<Category>(`${RESOURCE}/${id}`, payload);
  return data;
}

export async function deleteCategory(id: string) {
  const { data } = await http.delete(`${RESOURCE}/${id}`);
  return data;
}


export async function patchCategoryName(id: string, name: string) {
  const { data } = await http.patch<Category>(`${RESOURCE}/${id}/name`, { name });
  return data;
}

// PATCH image only
export async function patchCategoryImage(id: string, image: File) {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await http.patch<Category>(`${RESOURCE}/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}