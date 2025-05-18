import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ProjectOnboarding_ProjectStructure() {
	return (
		<div>
			<Label>
				Execute this prompt to understand the project structure and generate
				existing PRD:
			</Label>
			<pre className="my-8 rounded-lg border border-border bg-text-primary p-4">
				Prompt
			</pre>

			{/* <Button>Generate PRD</Button> */}
			<Link to="/prd/files">
				<Button>Next</Button>
			</Link>
		</div>
	);
}

// Publish PRD to generate and update tasks.

// ---

// https://github.com/mendableai/firecrawl-mcp-server
// https://cursor.directory/mcp/coding-file-management
// https://cursor.directory/mcp/wcgw
// https://cursor.directory/mcp/filesystem-1
// https://cursor.directory/mcp/software-documentation-analysis

// ---
// - be professional
// - optimize for ai, reduce token usage but maintain high accuracy
// ---

// Clean Prompt:
// - Clean Data: Remove duplicates, irrelevant content, and non-UTF8 characters. Normalize whitespace.
// - Chunking: Split large documents into smaller chunks (e.g., 512 tokens per chunk) if needed for model limits.
// - Encoding: Always use UTF-8 to handle multilingual text.

// Metadata: Include contextual info (e.g., source, timestamp, author) in structured fields.
// Tokenization: Pre-tokenize text if required (e.g., for BERT-style models), but most LLMs handle raw text.
