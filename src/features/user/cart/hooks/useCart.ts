import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, addToCart, updateCartItem, deleteCartItem, clearCart } from '../api/cart.api';

import type { CartResponse } from '../api/cart.api';
import { useTheme } from '@mui/material/styles';
import { showToast } from '@/utils/showToast';
import { useAuth } from '@/hooks/useAuth';

export const useCart = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const { data: cart, isLoading } = useQuery<CartResponse>({
    queryKey: ['cart'],
    queryFn: getCart,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: addItemToCart } = useMutation({
    mutationFn: (productId: string) => addToCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      if (isAuthenticated) {
        showToast('Item added to cart!', 'success', theme);
      }
    },
    onError: () => {
      if (isAuthenticated) {
        showToast('Failed to add item to cart.', 'error', theme);
      }
    },
  });

  const updateItem = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) =>
      updateCartItem(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      if (isAuthenticated) {
        showToast('Cart updated successfully!', 'success', theme);
      }
    },
    onError: () => {
      if (isAuthenticated) {
        showToast('Failed to update cart.', 'error', theme);
      }
    },
  });

  const deleteItem = useMutation({
    mutationFn: (cartItemId: string) => deleteCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      if (isAuthenticated) {
        showToast('Item removed from cart.', 'success', theme);
      }
    },
    onError: () => {
      if (isAuthenticated) {
        showToast('Failed to remove item from cart.', 'error', theme);
      }
    },
  });

  const { mutate: clearAllItems, isPending } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.setQueryData(['cart'], { cartItems: [] });
      if (isAuthenticated) {
        showToast('Cart cleared successfully!', 'success', theme);
      }
    },
    onError: () => {
      if (isAuthenticated) {
        showToast('Failed to clear cart.', 'error', theme);
      }
    },
  });

  return {
    cart,
    isLoading,
    addItemToCart,
    deleteItem: deleteItem.mutate,
    updateItem: updateItem.mutate,
    clearAllItems,
    isPending,
    totalItems: cart?.cartItems?.length || 0,
  };
};
