import { useQuery } from "@tanstack/react-query";
import { getHomeProducts, type HomeProduct } from "../api/home.api";

export const useHomeProducts = () => {
    return useQuery<HomeProduct[]>({
        queryKey: ["home-products"],
        queryFn: getHomeProducts,
    });
};
