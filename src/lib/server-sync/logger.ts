export const logger = {
	// biome-ignore lint/suspicious/noExplicitAny: Change to data types that support .toString()
	log: (...args: any[]) => {
		console.log('[ENGINE]', ...args);
	},
	// biome-ignore lint/suspicious/noExplicitAny: Change to data types that support .toString()
	error: (...args: any[]) => {
		console.error('[ENGINE]', ...args);
	},
};
