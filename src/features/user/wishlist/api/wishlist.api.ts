import http from '@/lib/axios';

export type WishlistItem = {
    id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCoverUrl: string;
    sold: number;
};

export type WishlistResponse = {
    data: WishlistItem[];
};

export const getWishlist = async (): Promise<WishlistResponse> => {
    const response = await http.get('/wishlist');
    return { data: response.data?.data || [] };
};

export const addToWishlist = async (productId: string): Promise<WishlistResponse> => {
    const response = await http.post('/wishlist', { productId });
    return { data: response.data?.data || [] };
};

export const deleteFromWishlist = async (productId: string): Promise<WishlistResponse> => {
    const response = await http.delete(`/wishlist/${productId}`, { data: { productId } });
    return { data: response.data?.data || [] };
};
