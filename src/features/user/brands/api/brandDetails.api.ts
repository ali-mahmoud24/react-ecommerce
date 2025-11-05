import http from "@/lib/axios";

export type BrandDetail = {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
};

export const getBrandById = async (id: string): Promise<BrandDetail> => {
    const response = await http.get(`/brands/${id}`);
    return response.data?.data;
};
