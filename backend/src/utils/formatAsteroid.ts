import type { NearEarthObject, FormattedNearEarthObject } from "../types/nasa.js";

export const formatAsteroid = (
  asteroid: NearEarthObject
): FormattedNearEarthObject => {
  const closeApproach = asteroid.close_approach_data[0];

  return {
    id: asteroid.id,
    name: asteroid.name.replace(/[()]/g, ""),
    size:
      (asteroid.estimated_diameter.miles.estimated_diameter_min +
        asteroid.estimated_diameter.miles.estimated_diameter_max) /
      2,
    distance: closeApproach ? parseFloat(closeApproach.miss_distance.miles) : 0,
    velocity: closeApproach ? parseFloat(closeApproach.relative_velocity.miles_per_hour) : 0,
    is_potentially_hazardous: asteroid.is_potentially_hazardous_asteroid,
  };
}
