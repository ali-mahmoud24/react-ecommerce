import { useQuery } from '@tanstack/react-query';
import http from '@/lib/axios';

export type Order = {
  id: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
};

export const useOrders = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async (): Promise<Order[]> => {
      // This would be your actual API endpoint
      const { data } = await http.get('/user/orders');
      return data.data;
    },
  });

  return {
    orders,
    isLoading,
  };
};
