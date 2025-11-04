import { useQuery } from '@tanstack/react-query';
import { getAllProduct } from '../api/products.api';

export const useProduct = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
    });
};