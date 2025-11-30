import { useQuery } from '@tanstack/react-query';
import {
  getAllProducts,
  getProductById,
  type ProductListResponse,
  type ProductResponse,
} from '../api/products.api';

export const useProducts = (page: number, limit: number, filters: Record<string, any>) => {
  return useQuery<ProductListResponse>({
    queryKey: ['products', page, limit, filters],
    queryFn: () => getAllProducts(page, limit, filters),
    placeholderData: (prev) => prev,
  });
};

export const useProductByIdQuery = (id: string) => {
  return useQuery<ProductResponse>({
    queryKey: ['products', id],
    queryFn: () => getProductById(id),
  });
};
