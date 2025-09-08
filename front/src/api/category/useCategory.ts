import { useQuery } from '@tanstack/react-query';
import { getCategories } from './category';


export const useCategory = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}
