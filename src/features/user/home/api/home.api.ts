import http from '@/lib/axios';

export type HomeProduct = {
  id: string;
  title: string;
  price: number;
  imageCoverUrl: string;
  averageRating: number;
  sold: number;
  createdAt: string;
};

export const getNewArrivals = async (): Promise<HomeProduct[]> => {
  const response = await http.get('/products', {
    params: {
      limit: 4,
    },
  });
  return response.data?.data || [];
};

export const getOnSaleProducts = async (): Promise<HomeProduct[]> => {
  const response = await http.get('/products', {
    params: {
      limit: 4,
    },
  });
  return response.data?.data || [];
};

export const getMostSoldProducts = async (): Promise<HomeProduct[]> => {
  const response = await http.get('/products', {
    params: {
      limit: 4,
      sort: '-sold',
    },
  });
  return response.data?.data || [];
};
