import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
  type Product,
  type UpdateProductRequest,
} from '../api/products.api';

export const useProducts = () => {
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const response = await getProductsApi();
      return response.data;
    },
  });

  const createProduct = useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & UpdateProductRequest) =>
      updateProductApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    products,
    isLoading,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
