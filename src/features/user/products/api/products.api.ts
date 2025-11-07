import http from '@/lib/axios';

export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    imageCoverUrl: string;
    imageUrls: string[];
    numOfRatings: number;
};

export const getAllProduct = async (): Promise<Product[]> => {
    const response = await http.get('/products');
    return response.data?.data || [];
};