export default function useConfig() {
	const config = {
		configPath: '.ai',
		paths: {
			cycles: '/cycles',
			prd: '/prd',
			tasks: '/tasks',
		},
		workspace: {
			ide: 'cursor',
			name: 'Devika',
		},
	};

	// TODO: Sync stores using websockets / SSE.

	return config;
}
