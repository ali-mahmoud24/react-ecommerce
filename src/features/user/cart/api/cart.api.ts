import http from '@/lib/axios';

export type CartItem = {
  id: string;
  product: {
    id: string;
    title: string;
    price: number;
    imageCoverUrl: string;
  };
  quantity: number;
  price: number;
};

export type CartResponse = {
  id: string;
  cartItems: CartItem[];
  totalCartPrice: number;
};

export const getCart = async (): Promise<CartResponse> => {
  const response = await http.get('/cart');
  return response.data?.data || { cartItems: [], totalCartPrice: 0 };
};

export const addToCart = async (productId: string): Promise<CartResponse> => {
  const response = await http.post('/cart', { productId });
  return response.data?.data || { cartItems: [], totalCartPrice: 0 };
};

export const updateCartItem = async (
  cartItemId: string,
  quantity: number,
): Promise<CartResponse> => {
  const response = await http.put(`/cart/${cartItemId}`, { quantity });
  return response.data?.data || { cartItems: [], totalCartPrice: 0 };
};

export const deleteCartItem = async (cartItemId: string): Promise<CartResponse> => {
  const response = await http.delete(`/cart/${cartItemId}`);
  return response.data?.data || { cartItems: [], totalCartPrice: 0 };
};

export const clearCart = async (): Promise<CartResponse> => {
  const response = await http.delete('/cart');
  return response.data?.data || { cartItems: [], totalCartPrice: 0 };
};
