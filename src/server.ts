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
import { LetsyncApiHandler } from 'letsync/express';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/pglite.wasm', (_, res) => {
	res.sendFile(
		path.join(
			__dirname,
			'../node_modules/@electric-sql/pglite/dist/pglite.wasm',
		),
	);
});

app.get('/pglite.data', (_, res) => {
	res.sendFile(
		path.join(
			__dirname,
			'../node_modules/@electric-sql/pglite/dist/pglite.data',
		),
	);
});

// app.get('/api/auth/*')

app.get('/api/letsync/*splat', LetsyncApiHandler);

app.get('*splat', (_, res) => {
	res.sendFile(path.join(__dirname, '../dist', 'frontend.html'));
});

const server = app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});

// const wss = LetsyncWsServer({
// 	server,
// 	auth(request) {
// 		// TODO: better-auth
// 		// console.log({ request });
// 		const user = { id: '123' };
// 		return user;
// 		// return null; FOR UNAUTHORIZED
// 	},
// });
// console.log({ ws: !!wss });
