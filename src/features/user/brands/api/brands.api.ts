import http from "@/lib/axios";

export type Brand = {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
};

export const getBrands = async (): Promise<Brand[]> => {
    const response = await http.get("/brands");
    return response.data?.data || [];
};
