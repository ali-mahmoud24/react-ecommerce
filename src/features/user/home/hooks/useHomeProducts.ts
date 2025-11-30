import { useQuery } from "@tanstack/react-query";
import {
    getNewArrivals,
    getOnSaleProducts,
    getMostSoldProducts,
    type HomeProduct,
} from "../api/home.api";

export const useNewArrivals = () => {
    return useQuery<HomeProduct[]>({
        queryKey: ["home", "new-arrivals"],
        queryFn: getNewArrivals,
    });
};

export const useOnSaleProducts = () => {
    return useQuery<HomeProduct[]>({
        queryKey: ["home", "on-sale"],
        queryFn: getOnSaleProducts,
    });
};

export const useMostSoldProducts = () => {
    return useQuery<HomeProduct[]>({
        queryKey: ["home", "most-sold"],
        queryFn: getMostSoldProducts,
    });
};
