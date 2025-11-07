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
            const { data } = await http.post(`/products/${productId}/reviews`, { title, rating });
            setReviews(prev => [data, ...prev]);
        } catch {
            setError('Failed to submit review.');
        }
    };

    useEffect(() => {
        fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    return { reviews, loading, error, submitReview };
};
