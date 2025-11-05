import { useQuery } from "@tanstack/react-query";
import { getCategoryById, type CategoryDetail } from "../api/categoryDetails.api";


export const useCategory = (id: string) => {
    return useQuery<CategoryDetail>({
        queryKey: ["category", id],
        queryFn: () => getCategoryById(id),
        enabled: !!id,
    });
};
