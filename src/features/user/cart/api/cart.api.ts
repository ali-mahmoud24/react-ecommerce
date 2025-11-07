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
  cartItems: CartItem[];
  totalCartPrice: number;
};

export const getCart = async (): Promise<CartResponse> => {
  const response = await http.get('/cart');
  console.log('🛒 Cart Response=========================:', response.data);

  // Ensure data format
  return response.data?.data || { cartItems: [], totalCartPrice: 0 };
};

export const addToCart = async (productId: string): Promise<CartResponse> => {
  console.log('🛒 Adding product to cart:', productId);

  const response = await http.post('/cart', { productId });
  console.log('✅ Add to cart response:', response.data);

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