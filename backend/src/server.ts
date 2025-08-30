import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { nearEathObjectsRoute } from './routes/neo.js';

const fastify = Fastify({
  logger: true
});

await fastify.register(cors, {
  origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3001']
});

await fastify.register(swagger, {
  swagger: {
    info: {
      title: 'NASA Dashboard',
      description: 'API for fetching data from NASA\'s Near Earth Objects Web Service',
      version: '1.0.0'
    },
    host: 'localhost:3001',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
});

await fastify.register(swaggerUI, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
});

await fastify.register(nearEathObjectsRoute, { prefix: '/api' });

const start = async (): Promise<void> => {
  try {
    const port = Number(process.env.PORT) || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server running on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

await start();
