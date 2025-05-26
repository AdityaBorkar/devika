// import { join } from 'node:path';
// import { serve } from 'bun';
// import * as WorkspaceAPI from '@/api/actions/workspace/route';
// import authHandler from '@/api/auth/route';
// import frontend from './frontend.html';

// async function fileResponse(fileName: string) {
// 	const file = Bun.file(join(__dirname, '../dist', fileName));
// 	return new Response(await file.text(), {
// 		headers: { 'Content-Type': file.type },
// 	});
// }

// const server = serve({
// 	development: process.env.NODE_ENV !== 'production' && {
// 		hmr: true,
// 		console: true,
// 	},
// 	routes: {
// 		'/pglite.data': {
// 			async GET(request) {
// 				return fileResponse(
// 					'../node_modules/@electric-sql/pglite/dist/pglite.data',
// 				);
// 			},
// 		},
// 		'/pglite.wasm': {
// 			async GET(request) {
// 				return fileResponse(
// 					'../node_modules/@electric-sql/pglite/dist/pglite.wasm',
// 				);
// 			},
// 		},
// 		'/api/actions/workspace': WorkspaceAPI,
// 		'/api/auth/*': authHandler,
// 		'/*': frontend,
// 	},
// });

// console.log(`🚀 Server running at ${server.url}`);

import path from 'node:path';
import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/pglite.wasm', (req, res) => {
	res.sendFile(
		path.join(
			__dirname,
			'../node_modules/@electric-sql/pglite/dist/pglite.wasm',
		),
	);
});

app.get('/pglite.data', (req, res) => {
	res.sendFile(
		path.join(
			__dirname,
			'../node_modules/@electric-sql/pglite/dist/pglite.data',
		),
	);
});

app.get('*splat', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist', 'frontend.html'));
});

const server = app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});

const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
	const isAuthenticated = true; // TODO: better-auth

	if (isAuthenticated) {
		wss.handleUpgrade(request, socket, head, (ws) => {
			wss.emit('connection', ws, request);
		});
	} else {
		socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
		socket.destroy();
	}
});

wss.on('connection', (ws) => {
	console.log('Client connected');
	ws.send('Hello! Welcome to the websocket server.');

	ws.on('message', (message) => {
		console.log(`Received message => ${message}`);
		// Echo message back to client
		ws.send(`You sent: ${message}`);
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	});
});
