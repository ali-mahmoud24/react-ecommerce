import { useQuery } from "@tanstack/react-query";
import { getBrandProducts, type BrandProduct } from "../api/getBrandProducts";


export const useBrandProducts = (brandId: string) => {
    return useQuery<BrandProduct[]>({
        queryKey: ["brand-products", brandId],
        queryFn: () => getBrandProducts(brandId),
        enabled: !!brandId,
    });
};
