import { type } from 'arktype';

export const ProjectOnboarding = type({
	name: 'string',
	ide: "('cursor'|'github-copilot'|'cline'|'roo-code'|'continue'|'windsurf'|'augment')[]",
	tdd: 'boolean',
	// path: "string?",
});

export type ProjectOnboarding = typeof ProjectOnboarding.infer;
