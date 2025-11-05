import http from "@/lib/axios";

export type categories = {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
};

export const getCategories = async (): Promise<categories[]> => {
    const response = await http.get("/categories");
    return response.data?.data || [];
};
