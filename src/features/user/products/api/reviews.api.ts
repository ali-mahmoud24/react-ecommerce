import http from "@/lib/axios";

export interface Review {
    id: string;
    title: string;
    rating: number;
    createdAt: string;
}

export const getProductReviews = async (productId: string): Promise<Review[]> => {
    const { data } = await http.get(`/products/${productId}/reviews`);
    return data;
};

export const addProductReview = async (
    productId: string,
    review: { title: string; rating: number }
) => {
    const { data } = await http.post(`/products/${productId}/reviews`, review);
    return data;
};