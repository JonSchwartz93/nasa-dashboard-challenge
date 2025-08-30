export interface ProcessedNearEarthObject {
  id: string;
  name: string;
  size: number;
  distance: number;
  velocity: number;
  is_potentially_hazardous: boolean;
}

export type SortField = 'name' | 'size' | 'distance' | 'velocity';

export type SortDirection = 'asc' | 'desc';
