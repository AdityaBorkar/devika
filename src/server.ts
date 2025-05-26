import { serve } from 'bun';
import * as WorkspaceAPI from '@/api/actions/workspace/route';
import authHandler from '@/api/auth/route';

// import { join } from 'node:path';
import frontend from './frontend.html';

// async function fileResponse(fileName: string) {
// 	const file = Bun.file(join(__dirname, '../dist', fileName));
// 	if (await file.exists()) {
// 		return new Response(await file.text(), {
// 			headers: { 'Content-Type': file.type },
// 		});
// 	}

// 	const frontend = Bun.file(join(__dirname, '../dist', 'frontend.html'));
// 	return new Response(await frontend.text(), {
// 		headers: { 'Content-Type': frontend.type },
// 	});
// }

const server = serve({
	development: process.env.NODE_ENV !== 'production' && {
		hmr: true,
		console: true,
	},
	routes: {
		// ! ISSUE: PGlite is being processed by Bun, but we need to ignore it and bundle it without optimizations.
		// '/pglite.data': {
		// 	async GET(request) {
		// 		const file = Bun.file(
		// 			path.join(
		// 				__dirname,
		// 				'../node_modules/@electric-sql/pglite/dist/pglite.data',
		// 			),
		// 		);
		// 		const contents = await file.text();
		// 		console.log({ size: file.size, sizee: contents.length });
		// 		return new Response(contents, {
		// 			headers: { 'Content-Type': file.type },
		// 		});
		// 		// return new Response('Hello World', {
		// 		// 	headers: { 'Content-Type': 'text/plain' },
		// 		// });
		// 	},
		// },
		// '/*': {
		// 	async GET(request) {
		// 		const fileName = request.url.replace('http://localhost:3000', '');
		// 		// if (fileName === '/pglite.wasm')
		// 		// 	return fileResponse(
		// 		// 		'../node_modules/@electric-sql/pglite/dist/pglite.wasm',
		// 		// 	);
		// 		// if (fileName === '/pglite.data') {
		// 		// 	const file = Bun.file(
		// 		// 		path.join(
		// 		// 			__dirname,
		// 		// 			'../node_modules/@electric-sql/pglite/dist/pglite.data',
		// 		// 		),
		// 		// 	);
		// 		// 	const contents = await file.text();
		// 		// 	console.log({
		// 		// 		size: file.size,
		// 		// 		sizee: contents.length,
		// 		// 		type: file.type,
		// 		// 	});
		// 		// 	return new Response(contents, {
		// 		// 		headers: { 'Content-Type': file.type },
		// 		// 	});
		// 		// }
		// 		return fileResponse(fileName);
		// 	},
		// },
		'/*': frontend,
		'/api/actions/workspace': WorkspaceAPI,
		'/api/auth/*': authHandler,
	},
});

console.log(`🚀 Server running at ${server.url}`);

// import path from 'node:path';
// import express from 'express';

// const app = express();
// const port = 3000;

// app.use(express.static(path.join(__dirname, '../dist')));

// app.get('/pglite.wasm', (req, res) => {
// 	res.sendFile(
// 		path.join(
// 			__dirname,
// 			'../node_modules/@electric-sql/pglite/dist/pglite.wasm',
// 		),
// 	);
// });

// app.get('/pglite.data', (req, res) => {
// 	res.sendFile(
// 		path.join(
// 			__dirname,
// 			'../node_modules/@electric-sql/pglite/dist/pglite.data',
// 		),
// 	);
// });

// app.get('*splat', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../dist', 'frontend.html'));
// });

// app.listen(port, () => {
// 	console.log(`Listening on port ${port}...`);
// });
