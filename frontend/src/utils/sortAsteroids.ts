import { ProcessedNearEarthObject, SortField, SortDirection } from '../types/nasa';

export const sortAsteroids = (
  asteroids: ProcessedNearEarthObject[],
  sortField: SortField,
  sortDirection: SortDirection
): ProcessedNearEarthObject[] => {
  return [...asteroids].sort((a, b) => {
    let aValue: number | string;
    let bValue: number | string;

    switch (sortField) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'size':
        aValue = a.size;
        bValue = b.size;
        break;
      case 'distance':
        aValue = a.distance;
        bValue = b.distance;
        break;
      case 'velocity':
        aValue = a.velocity;
        bValue = b.velocity;
        break;
    }

    if (typeof aValue === 'string') {
      const result = aValue.localeCompare(bValue as string);
      return sortDirection === 'asc' ? result : -result;
    } else {
      const result = (aValue as number) - (bValue as number);
      return sortDirection === 'asc' ? result : -result;
    }
  });
};
