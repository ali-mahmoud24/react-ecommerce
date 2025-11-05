import { useQuery } from "@tanstack/react-query";
import { getBrandById, type BrandDetail } from "../api/brandDetails.api";

export const useBrand = (id: string) => {
    return useQuery<BrandDetail>({
        queryKey: ["brand", id],
        queryFn: () => getBrandById(id),
        enabled: !!id,
    });
};
