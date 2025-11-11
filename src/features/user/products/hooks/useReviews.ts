import http from '@/lib/axios';
import { useState, useEffect } from 'react';
import type { Review } from '../api/reviews.api';


export const useReviews = (productId: string) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReviews = async () => {
        if (!productId) return;
        setLoading(true);
        try {
            const response = await http.get(`/products/${productId}/reviews`);
            setReviews(response.data.data || []);
        } catch (err) {
            console.log(err)
            setError('Failed to fetch reviews.');
        } finally {
            setLoading(false);
        }
    };

    const submitReview = async (title: string, rating: number) => {
        try {
            await http.post(`/products/${productId}/reviews`, { title, rating });
            await fetchReviews();
        } catch (err) {
            console.error(err);
            setError('You have already submitted a review for this product.');
        }
    };


    useEffect(() => {
        fetchReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    return { reviews, loading, error, submitReview };
};