import http from "@/lib/axios";

export type categoryProduct = {
    id: string;
    title: string;
    price: number;
    imageCoverUrl: string;
    numOfRatings: number;
    averageRating: number;
    sold: number;
    createdAt: string;
};

export const getCategoryProducts = async (categoryId: string): Promise<categoryProduct[]> => {
    const response = await http.get(`/products?category=${categoryId}`);
    return response.data?.data || [];
};
