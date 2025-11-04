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
    console.log('API response:', response.data);

    return response.data?.data || [];
};