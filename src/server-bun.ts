import { serve } from 'bun';
import * as WorkspaceAPI from '@/api/actions/workspace/route';
import authHandler from '@/api/auth/route';
import frontend from './frontend.html';

const server = serve({
	development: process.env.NODE_ENV !== 'production' && {
		hmr: true,
		console: true,
	},
	routes: {
		'/*': frontend,
		'/api/actions/workspace': WorkspaceAPI,
		'/api/auth/*': authHandler,
	},
});

// TODO: Setup an alternate server in-case we need to migrate away from Bun due to incompatibility with Node.js
// TODO: Frontend, API Routes, Websockets
// Last Updated: 2025-05-25

console.log(`🚀 Server running at ${server.url}`);
