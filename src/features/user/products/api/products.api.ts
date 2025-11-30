import http from '@/lib/axios';

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageCoverUrl: string;
  imageUrls: string[];
  averageRating: number;
};

export type ProductListResponse = {
  data: Product[];
  paginationResult: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    next?: number;
    prev?: number;
  };
  results: number;
};

export type ProductResponse = {
  data: Product[];
};

export const getAllProducts = async (
  page: number,
  limit: number,
  filters: Record<string, any> = {},
): Promise<ProductListResponse> => {
  const queryParts = [`page=${page}`, `limit=${limit}`];

  // add filters without encoding brackets
  Object.entries(filters).forEach(([key, value]) => {
    queryParts.push(`${key}=${value}`);
  });

  const queryString = queryParts.join('&');

  const response = await http.get(`/products?${queryString}`);
  return response.data;
};

export const getProductById = async (id: string): Promise<ProductResponse> => {
  const response = await http.get(`/products/${id}`);
  return response.data;
};
