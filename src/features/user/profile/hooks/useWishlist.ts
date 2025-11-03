import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import http from '@/lib/axios';

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  inStock: boolean;
};

export const useWishlist = () => {
  const queryClient = useQueryClient();

  const { data: wishlistItems } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async (): Promise<WishlistItem[]> => {
      // This would be your actual API endpoint
      const { data } = await http.get('/user/wishlist');
      return data.data;
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: async (itemId: string) => {
      await http.delete(`/user/wishlist/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  const moveToCart = useMutation({
    mutationFn: async (itemId: string) => {
      const { data } = await http.post('/user/cart', { productId: itemId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  return {
    wishlistItems,
    removeFromWishlist,
    moveToCart,
  };
};
