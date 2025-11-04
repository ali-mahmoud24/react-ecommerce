import http from "@/lib/axios";

export type HomeProduct = {
    id: string;
    title: string;
    price: number;
    imageCoverUrl: string;
    numOfRatings: number;
    sold: number;
    createdAt: string;
};

export const getHomeProducts = async (): Promise<HomeProduct[]> => {
    const response = await http.get("/products");
    return response.data?.data || [];
};
