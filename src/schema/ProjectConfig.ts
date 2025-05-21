import { type } from "arktype";

export const ProjectConfig = type({
	id: "string",
	name: "string",
	ide: "('cursor'|'github-copilot'|'cline'|'roo-code'|'continue'|'windsurf'|'augment')[]",
	tdd: "boolean",
	"server?": {
		"host?": "string",
		"port?": "number",
	},
});

export type ProjectConfig = typeof ProjectConfig.infer;
