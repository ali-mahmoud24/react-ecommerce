import http from "@/lib/axios";

export type BrandProduct = {
    id: string;
    title: string;
    price: number;
    imageCoverUrl: string;
    numOfRatings: number;
    averageRating: number;
    sold: number;
    createdAt: string;
};

export const getBrandProducts = async (brandId: string): Promise<BrandProduct[]> => {
    const response = await http.get(`/products?brand=${brandId}`);
    return response.data?.data || [];
};
