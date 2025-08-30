
import { useQuery } from '@tanstack/react-query';
import { fetchAsteroids } from '../api/nasa';

export const useNasaQuery = (startDate: string, endDate: string, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['asteroids', startDate, endDate],
    queryFn: () => fetchAsteroids(startDate, endDate),
    staleTime: 5 * 60 * 1000,
    enabled: isEnabled
  });
};
