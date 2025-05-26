#!/usr/bin/env bun

import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'bun';
import plugin from 'bun-plugin-tailwind';

console.log('\n🚀 Building React frontend...\n');

const outdir = path.join(process.cwd(), 'dist');

// Clean previous build
if (existsSync(outdir)) {
	console.log('🗑️ Cleaning previous build...');
	await rm(outdir, { force: true, recursive: true });
}

const start = performance.now();

export function extractPath(path: string) {
	const marker = '@electric-sql/pglite/dist/';
	const markerIndex = path.indexOf(marker);

	if (markerIndex === -1) {
		console.log('Error', path);
		return path;
	}

	return path.substring(markerIndex + marker.length);
}

try {
	// Build the React frontend
	const result = await build({
		entrypoints: ['src/frontend.html'],
		outdir,
		minify: false,
		target: 'browser',
		sourcemap: 'linked',
		plugins: [
			plugin,
			// {
			// 	name: 'Wasm loader',
			// 	setup(build) {
			// 		build.onLoad({ filter: /@electric-sql\/pglite/ }, async (args) => {
			// 			console.log('Loading WASM file:', args.path);
			// 			const path = extractPath(args.path);
			// 			console.log('Replacing', args.path, 'with', path);
			// 			const response = await fetch(
			// 				`https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/${path}`,
			// 			);
			// 			const contents = await response.text();
			// 			console.log(`Resolving ${args.path} to CDN`);
			// 			return { contents, external: true };
			// 		});
			// 	},
			// },
		],
		define: {
			'process.env.NODE_ENV': JSON.stringify('production'),
		},
	});

	const end = performance.now();
	const buildTime = (end - start).toFixed(2);

	if (result.success) {
		console.log('✅ Build completed successfully!');

		// Show build output
		if (result.outputs.length > 0) {
			console.table(
				result.outputs.map((output) => ({
					File: path.relative(process.cwd(), output.path),
					Size: formatBytes(output.size),
				})),
			);
		}

		console.log(`⏱️ Build time: ${buildTime}ms\n`);
	} else {
		console.error('❌ Build failed!');
		if (result.logs) {
			console.error(result.logs);
		}
		process.exit(1);
	}
} catch (error) {
	console.error('❌ Build error:', error);
	process.exit(1);
}

function formatBytes(bytes: number): string {
	const units = ['B', 'KB', 'MB', 'GB'];
	let size = bytes;
	let unitIndex = 0;

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}

	return `${size.toFixed(2)} ${units[unitIndex]}`;
}
