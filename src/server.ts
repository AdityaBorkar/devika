import path from 'node:path';
import staticPlugin from '@fastify/static';
import Fastify from 'fastify';

const fastify = Fastify({ logger: process.env.NODE_ENV !== 'production' });

fastify.register(staticPlugin, {
	root: path.join(__dirname, '../'), // Assuming frontend.html is at the project root
	serve: false, // Don't serve files automatically based on path
});

// Define routes
// You'll need to adapt your existing handlers (WorkspaceAPI, authHandler)
// to fit Fastify's request/response handling if they aren't generic functions.
// This is a placeholder, you'll need to adjust based on how your current handlers work.
fastify.get('/*', (request, reply) => {
	// Serve frontend.html for all other GET requests
	// reply.sendFile('index.html');
	return reply.sendFile('frontend.html');
});

// fastify.route({
// 	method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Or specify methods used by WorkspaceAPI
// 	url: '/api/actions/workspace',
// 	handler: WorkspaceAPI as any, // Cast or adapt your handler
// });

// fastify.route({
// 	method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Or specify methods used by authHandler
// 	url: '/api/auth/*',
// 	handler: authHandler as any, // Cast or adapt your handler
// });

try {
	// if (process.env.NODE_ENV === 'production') break;
	const port = process.env.PORT ? Number(process.env.PORT) : 3000;
	await fastify.listen({ port, host: '0.0.0.0' });
	console.log(`🚀 Server running at http://localhost:${port}`);
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
