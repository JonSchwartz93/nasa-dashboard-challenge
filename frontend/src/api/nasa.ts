const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export const fetchAsteroids = async (startDate: string, endDate?: string) => {
  const url = `${API_BASE_URL}/api/neo?start_date=${startDate}&end_date=${endDate ? endDate : startDate}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch asteroids');
  }

  const result = await response.json();

  return result.objects || [];
};
