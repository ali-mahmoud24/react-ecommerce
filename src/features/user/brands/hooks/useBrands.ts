import { useQuery } from "@tanstack/react-query";
import { getBrands, type Brand } from "../api/brands.api";

export const useBrands = () => {
    return useQuery<Brand[]>({
        queryKey: ["brands"],
        queryFn: getBrands,
    });
};
