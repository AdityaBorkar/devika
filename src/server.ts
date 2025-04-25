import { serve } from 'bun';
import { handleCommand } from '@/algorithm';
import ApiServerRoute from '@/api/server/route';
import frontend from './frontend.html';

const server = serve({
	development: process.env.NODE_ENV !== 'production',
	routes: {
		'/*': frontend,
		'/api/server': ApiServerRoute,
	},
	websocket: {
		open() {
			console.log('[SERVER] WebSocket opened');
		},
		close() {
			// TODO: Stop the NODE SERVER
			console.log('[SERVER] WebSocket closed');
		},
		async message(ws, message) {
			console.log('[SERVER] Message:', message);
			const { command, data } = JSON.parse(message.toString());
			const result = await handleCommand(command, data, ws);
			const resultJson = JSON.stringify({ command, result });
			ws.send(resultJson);
		},
	},
});

console.log(`🚀 Server running at ${server.url}`);
