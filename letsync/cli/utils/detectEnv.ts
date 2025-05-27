interface EnvironmentConfig {
	name: string;
	description: string;
}

const ENVIRONMENTS: Record<string, EnvironmentConfig> = {
	development: {
		name: 'Development',
		description: 'Local development environment',
	},
	staging: {
		name: 'Staging',
		description: 'Staging environment for testing',
	},
	testing: {
		name: 'Testing',
		description: 'Testing environment',
	},
	production: {
		name: 'Production',
		description: 'Production environment',
	},
};

export function detectEnvironment() {
	const nodeEnv = process.env.NODE_ENV?.toLowerCase();
	if (nodeEnv && ENVIRONMENTS[nodeEnv]) return ENVIRONMENTS[nodeEnv];
	return ENVIRONMENTS.development;
}
