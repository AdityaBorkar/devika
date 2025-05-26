export default {
	name: 'no-optimize-plugin',
	setup(build: Bun.PluginBuilder) {
		build.onStart(() => {
			console.log('Starting build...');
		});

		build.onLoad({ filter: /pglite.data/ }, async (args) => {
			console.log({ args });
			// 	console.log('Loading WASM file:', args.path);
			// 	const path = extractPath(args.path);
			// 	console.log('Replacing', args.path, 'with', path);
			// 	const response = await fetch(
			// 		`https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/${path}`,
			// 	);
			// 	const contents = await response.text();
			// 	console.log(`Resolving ${args.path} to CDN`);
			// 	return { contents, external: true };
		});
	},
};

export function extractPath(path: string) {
	const marker = '@electric-sql/pglite/dist/';
	const markerIndex = path.indexOf(marker);

	if (markerIndex === -1) {
		console.log('Error', path);
		return path;
	}

	return path.substring(markerIndex + marker.length);
}
