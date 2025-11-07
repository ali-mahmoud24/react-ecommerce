import http from "@/lib/axios";

export type CategoryDetail = {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
};

export const getCategoryById = async (id: string): Promise<CategoryDetail> => {
    const response = await http.get(`/categories/${id}`);
    return response.data?.data;
};
