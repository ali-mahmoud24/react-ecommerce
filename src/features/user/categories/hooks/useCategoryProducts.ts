import { useQuery } from "@tanstack/react-query";
import { getCategoryProducts, type categoryProduct } from "../api/getCategoryProducts";


export const useCategoryProducts = (categoryId: string) => {
    return useQuery<categoryProduct[]>({
        queryKey: ["category-products", categoryId],
        queryFn: () => getCategoryProducts(categoryId),
        enabled: !!categoryId,
    });
};
