import { z } from 'zod';

export const ProjectOnboardingSchema = z.interface({
	aiEditor: z.enum(['windsurf', 'cursor', 'github_copilot']).default('cursor'),
	authorName: z.string().optional(),
	description: z.string().optional(),
	isBlank: z.enum(['blank', 'not_blank']).default('not_blank'),
	isMonorepo: z.enum(['yes', 'no']).default('no'),
	projectName: z.string().min(1, 'Project name is required.'),
	projectType: z.enum(['library', 'project']).default('project'),
	theme: z.enum(['light', 'dark']).default('light'),
	themeColor: z
		.string()
		// .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color")
		.optional()
		.default('#000000'),
});

export type ProjectOnboardingSchema = z.infer<typeof ProjectOnboardingSchema>;
