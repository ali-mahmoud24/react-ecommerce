import http from '@/lib/axios';

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageCoverUrl: string;
  numOfRatings: number;
};

export const getAllProduct = async (): Promise<Product[]> => {
  const response = await http.get('/products');
  console.log('API response:', response.data); // Debug

  // ✅ Make sure to return a value (array or object)
  return response.data?.data || [];
  // return response.data.data.products;
};
