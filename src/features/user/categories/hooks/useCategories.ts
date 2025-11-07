import { useQuery } from "@tanstack/react-query";
import { getCategories, type categories } from "../api/categories.api";

export const useCategories = () => {
    return useQuery<categories[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
};
