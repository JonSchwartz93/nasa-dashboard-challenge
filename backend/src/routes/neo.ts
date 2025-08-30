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
    {
      schema: {
        description: "Get Near Earth Objects for a date range",
        tags: ["NASA Near Earth Objects"],
        querystring: {
          type: "object",
          properties: {
            start_date: {
              type: "string",
              description: "Start date in YYYY-MM-DD format",
            },
            end_date: {
              type: "string",
              description: "End date in YYYY-MM-DD format",
            },
          },
          required: ["start_date"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              count: { type: "number" },
              objects: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      description: "Near Earth Object's ID",
                    },
                    name: {
                      type: "string",
                      description: 'The name of the NEO (i.e. "2004 VJ1")',
                    },
                    size: {
                      type: "number",
                      description: "Average diameter of the NEO in miles",
                    },
                    distance: {
                      type: "number",
                      description: "The NEO's distance from Earth in miles",
                    },
                    velocity: {
                      type: "string",
                      description: "The NEO'Relative velocity in mph",
                    },
                    is_potentially_hazardous: {
                      type: "boolean",
                      description:
                        "Whether or not the NEO is hazardous to Earth",
                    },
                    approach_date: {
                      type: "string",
                      description:
                        "Date the NEO will be closest to Earth (YYYY-MM-DD)",
                    },
                  },
                  required: [
                    "id",
                    "name",
                    "size",
                    "distance",
                    "velocity",
                    "is_potentially_hazardous",
                    "approach_date",
                  ],
                },
              },
            },
          },
          400: {
            description: "Invalid request parameters",
            type: "object",
            properties: {
              error: {
                type: "string",
                example:
                  'Invalid date format. Ensure that "end_date" is after "start_date"',
              },
            },
          },
          403: {
            description: "Invalid or missing NASA API key",
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "NASA API key is invalid or rate limit exceeded",
              },
            },
          },
          500: {
            description: "Internal server error",
            type: "object",
            properties: {
              error: { type: "string", example: "Failed to fetch NASA data" },
            },
          },
        },
      },
    },
    async (req, res) => {
      try {
        const { start_date, end_date } = req.query;
        const endDate = end_date || start_date;

        if (new Date(endDate) < new Date(start_date)) {
          await res.status(400).send({
            error: '"end_date" cannot be before "start_date"',
          });

          return;
        }

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
