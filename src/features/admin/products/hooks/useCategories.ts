import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const res = await axios.get('http://localhost:8000/api/v2/categories');
      return res.data.data;
    },
  });
};
