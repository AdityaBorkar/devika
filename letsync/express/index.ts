import type { IncomingMessage, Server } from 'node:http';
import type { WebSocket } from 'ws';
import { WebSocketServer } from 'ws';

interface LetsyncServerProps {
	server: Server;
	auth: (request: IncomingMessage) => { id: string } | null;
}

interface LetsyncWebSocket extends WebSocket {
	clientId: string;
	user: { id: string };
}

export function LetsyncServer({ server, auth }: LetsyncServerProps) {
	const wss = new WebSocketServer({ noServer: true });
	wss.on('connection', (ws: LetsyncWebSocket) => {
		// TODO: UPDATE LIST OF COMMANDS AND RPC

		console.log('Client connected:', ws.clientId);
		console.log('User:', ws.user);
		// ws.send('Hello! Welcome to the websocket server.');

		ws.on('message', (message) => {
			console.log(`Received message => ${message}`);
			// Echo message back to client
			ws.send(`You sent: ${message}`);
		});

		ws.on('close', () => {
			console.log('Client disconnected');
		});
	});

	server.on('upgrade', (request, socket, head) => {
		const user = auth(request);
		if (!user) {
			socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
			socket.destroy();
			return;
		}

		const searchParams = new URLSearchParams(request.url);
		const clientId = searchParams.get('clientId') || '';
		// if (clientId === 'NULL') {
		// 	generateClientId();
		// }
		console.log('Connection Authorized');
		// TODO: Update as connected in DB

		wss.handleUpgrade(request, socket, head, (client) => {
			const ws = client as LetsyncWebSocket;
			ws.user = user;
			ws.clientId = clientId;
			wss.emit('connection', ws, request);
		});
	});

	return { wss };
}
