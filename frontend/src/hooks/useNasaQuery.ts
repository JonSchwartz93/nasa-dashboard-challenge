
import { useQuery } from '@tanstack/react-query';
import { fetchAsteroids } from '../api/nasa';

export const useNasaQuery = (startDate: string, endDate: string, smallestSize: number, largestSize: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['asteroids', startDate, endDate, smallestSize, largestSize],
    queryFn: () => fetchAsteroids(startDate, endDate, smallestSize, largestSize),
    staleTime: 5 * 60 * 1000,
    enabled: isEnabled
  });
};
