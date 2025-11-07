import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, addToCart, updateCartItem, deleteCartItem } from '../api/cart.api';
import type { CartResponse } from '../api/cart.api';

export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery<CartResponse>({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const { mutate: addItemToCart } = useMutation({
    mutationFn: (productId: string) => addToCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const updateItem = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) =>
      updateCartItem(cartItemId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const deleteItem = useMutation({
    mutationFn: (cartItemId: string) => deleteCartItem(cartItemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  return {
    cart,
    isLoading,
    addItemToCart,
    deleteItem: deleteItem.mutate,
    updateItem: updateItem.mutate,
    totalItems: cart?.cartItems?.length || 0,
  };
};
};
