import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { WishlistResponse } from '../api/wishlist.api';
import { getWishlist, addToWishlist, deleteFromWishlist } from '../api/wishlist.api';
import { useTheme } from '@mui/material/styles';
import { showToast } from '@/utils/showToast';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router';

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<WishlistResponse>({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const addItemToWishlist = useMutation({
    mutationFn: (productId: string) => addToWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      showToast('Item added to wishlist!', 'success', theme);
    },
    onError: () => {
      if (!isAuthenticated) {
        showToast('Please log in to add items to your wishlist.', 'error', theme);
        navigate('/login');
        return;
      }
      showToast('Failed to add item to wishlist.', 'error', theme);
    },
  });

  const deleteItemFromWishlist = useMutation({
    mutationFn: (productId: string) => deleteFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      showToast('Item removed from wishlist.', 'success', theme);
    },
    onError: () => {
      showToast('Failed to remove item from wishlist.', 'error', theme);
    },
  });

  return {
    wishlist: data?.data || [],
    isLoading,
    addItemToWishlist: addItemToWishlist.mutate,
    deleteItemFromWishlist: deleteItemFromWishlist.mutate,
    totalItems: data?.data?.length || 0,
  };
};
