import type { FastifyInstance } from "fastify";
import axios from "axios";
import "dotenv/config";
import type {
  NasaApiResponse,
  FormattedNearEarthObject,
} from "../types/nasa.js";
import { formatAsteroid } from "../utils/formatAsteroid.js";

const NASA_BASE_URL = "https://api.nasa.gov/neo/rest/v1";
const API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function nearEathObjectsRoute(
  fastify: FastifyInstance,
): Promise<void> {
  fastify.get<{
    Querystring: {
      start_date: string;
      end_date?: string;
    };
  }>(
    "/neo",
    async (req, res) => {
      try {
        const { start_date, end_date } = req.query;
        const endDate = end_date || start_date;

        const response = await axios.get<NasaApiResponse>(
          `${NASA_BASE_URL}/feed`,
          {
            params: {
              start_date,
              end_date: endDate,
              api_key: API_KEY,
            },
            timeout: 10000,
          },
        );

        const allObjects: FormattedNearEarthObject[] = Object.entries(
          response.data.near_earth_objects,
        ).flatMap(([date, asteroids]) =>
          (asteroids as any[]).map((asteroid) => ({
            ...formatAsteroid(asteroid),
            approach_date: date,
          })),
        );

        return {
          start_date,
          end_date: endDate,
          count: allObjects.length,
          objects: allObjects,
        };
      } catch (error) {
        fastify.log.error("NASA API Error:", error as any);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            await res.status(403).send({
              error: "NASA API key invalid or rate limit exceeded",
            });

            return;
          }
        }

        await res.status(500).send({
          error: "Failed to fetch NASA data",
        });
      }
    },
  );
}
