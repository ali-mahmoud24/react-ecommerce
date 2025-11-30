import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import http from '@/lib/axios';
import type { Review } from '../api/reviews.api';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { showToast } from '@/utils/showToast';

export const useReviews = (productId: string) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // ========================
  // FETCH REVIEWS
  // ========================
  const { data, isLoading, isError, error } = useQuery<Review[]>({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const response = await http.get(`/products/${productId}/reviews`);
      return response.data.data || [];
    },
    enabled: !!productId, // only fetch if productId exists
  });

  // ========================
  // SUBMIT REVIEW
  // ========================
  const submitReview = useMutation({
    mutationFn: async ({ title, rating }: { title: string; rating: number }) => {
      await http.post(`/products/${productId}/reviews`, { title, rating });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      showToast('Review submitted successfully!', 'success', theme);
    },
    onError: () => {
      if (!isAuthenticated) {
        showToast('Please log in to submit a review.', 'error', theme);
        navigate('/login');
        return;
      }
      // You can check error.response?.status if needed
      showToast('Failed to submit review.', 'error', theme);
    },
  });

  return {
    reviews: data || [],
    loading: isLoading,
    error: isError ? (error as Error)?.message || 'Failed to fetch reviews' : null,
    submitReview: (title: string, rating: number) =>
      submitReview.mutate({ title, rating }),
  };
};
