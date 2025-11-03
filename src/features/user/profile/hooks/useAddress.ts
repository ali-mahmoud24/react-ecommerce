import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import http from '@/lib/axios';

export type Address = {
  id: string;
  alias?: string;
  country: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  details?: string;
  phone: string;
  postalCode?: string;
};

export const useAddress = () => {
  const queryClient = useQueryClient();

  const { data: addresses, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: async (): Promise<Address[]> => {
      // This would be your actual API endpoint
      const { data } = await http.get('/user/addresses');
      return data.data;
    },
  });

  const addAddress = useMutation({
    mutationFn: async (addressData: Omit<Address, 'id'>) => {
      const { data } = await http.post('/user/addresses', addressData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  const updateAddress = useMutation({
    mutationFn: async ({ id, ...addressData }: Address) => {
      const { data } = await http.put(`/user/addresses/${id}`, addressData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  const deleteAddress = useMutation({
    mutationFn: async (addressId: string) => {
      await http.delete(`/user/addresses/${addressId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  return {
    addresses,
    isLoading,
    addAddress,
    updateAddress,
    deleteAddress,
  };
};
