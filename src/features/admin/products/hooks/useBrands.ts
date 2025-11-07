import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Brand {
  id: string;
  name: string;
  imageUrl?: string;
}

export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async (): Promise<Brand[]> => {
      const res = await axios.get('http://localhost:8000/api/v2/brands');
      return res.data.data;
    },
  });
};
