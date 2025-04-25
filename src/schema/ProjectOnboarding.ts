import { type } from 'arktype';

export const ProjectOnboarding = type({
	ide: "'cursor'", // 'github-copilot' | 'windsurf' | 'cline' | 'roo-code'
	name: 'string',
	// comments: {
	// 	todo: 'string',
	// 	issue: 'string',
	// },
	// gitStrategy: 'string',
	// path: 'string',
	// web: {
	// 	host: 'string',
	// 	port: 'number',
	// },
});

export type ProjectOnboarding = typeof ProjectOnboarding.infer;
