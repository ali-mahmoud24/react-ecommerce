import http from '@/lib/axios';
import type {
  Brand,
  UpdateBrandDto,
  PaginatedBrandsResponse,
  BrandResponse,
} from '../types/brand.type';

const RESOURCE = '/brands';

export async function fetchPaginatedBrands(
  page = 1,
  limit = 10,
  sort?: string,
  keyword?: string,
) {
  const params: Record<string, string | number> = { page, limit };

  if (sort) params.sort = sort;
  if (keyword) params.keyword = keyword;

  const { data } = await http.get<PaginatedBrandsResponse>(RESOURCE, { params });
  return data;
}

export async function fetchBrands() {
  const { data } = await http.get<Brand[]>(RESOURCE);
  return data;
}

export async function fetchBrandById(id: string) {
  const { data } = await http.get<BrandResponse>(`${RESOURCE}/${id}`);
  return data.data;
}

export async function createBrand(formData: FormData) {
  const { data } = await http.post(RESOURCE, formData);
  return data;
}

export async function updateBrand(id: string, payload: UpdateBrandDto) {
  const { data } = await http.put<Brand>(`${RESOURCE}/${id}`, payload);
  return data;
}

export async function deleteBrand(id: string) {
  const { data } = await http.delete(`${RESOURCE}/${id}`);
  return data;
}

export async function patchBrandName(id: string, name: string) {
  const { data } = await http.patch<Brand>(`${RESOURCE}/${id}/name`, { name });
  return data;
}

// PATCH image only
export async function patchBrandImage(id: string, image: File) {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await http.patch<Brand>(`${RESOURCE}/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
