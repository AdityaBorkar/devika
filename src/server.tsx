import { serve } from 'bun';
import index from './index.html';

const server = serve({
	development: process.env.NODE_ENV !== 'production',
	routes: { '/*': index },

	websocket: {
		close(ws, code, reason) {
			console.log('WebSocket closed', code, reason);
		},
		message(ws, message) {
			console.log('WebSocket message', message);
		},
		open(ws) {
			console.log('WebSocket opened');
		},
	},
});

console.log(`🚀 Server running at ${server.url}`);
