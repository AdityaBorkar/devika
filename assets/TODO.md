## Vision

- Automate steps of Software Development Life Cycle
- Multi-agentic system to solve complex problems in lesser time

## Issues to solve

- Context Management
- Revising and asking for input to refine the 
- Staring new threads when required
- Assistants with specific roles - Testing, Documentation, Code Review, Release & Deployment, Security Vulnerabilities Scanner
- Language-Specific Optimization Techniques
- Dividing larger codebases into smaller understandable tokens to understand what is happening and making calls accordingly

- Use a database and MCP instead of a file-storage to increase performance.

- Voice to Code
- Model Selection Strategy
- Really simple one click rollbacks

- Implements - Linting, Formatting, Testing, Documentation, Error Handling, Logging
- Parallel Mode with Git

- Applies DRY (Don’t Repeat Yourself) principles and clean code practices (e.g., modular functions, descriptive naming) to ensure maintainability and reduce technical debt in automated pipelines

---

Defined a common interface (TaskProvider) that specifies methods for task operations (e.g., getTasks, addTask, updateTask, addDependency, removeDependency).
This allows different backend implementations to be used interchangeably.
Backend can be linear, jira, trello, etc.

---

Process each cycle as a separate branch.

Suggested Tasks
Run Task without a cycle

---

https://windsurf.com/editor/directory
https://windsurf.com/flows

---

Implementation Drift

product-vision.md (or docs/vision.md):
Purpose: The "North Star" document. High-level, relatively stable.
Content:
Overall Product Vision & Mission
Target Audience / Personas (briefly, links to more detail if needed)
Core User Problems being Solved (at a high level)
Key Goals / Objectives (e.g., Business Goals, User Goals)
High-Level Strategy / Principles
Maybe core assumptions or non-goals.
Tool Interaction: This document serves as context for all feature development. It likely shouldn't generate tasks directly but should inform the task generation for individual features.

features/ Directory:
Purpose: Container for individual, actionable feature specifications.
Content: Subdirectories or files for each distinct feature or epic.
features/feature-A/prd.md
features/feature-B/prd.md
features/authentication/prd.md
... potentially other related files (mocks, notes).
Tool Interaction: Each prd.md is a source document for generating feature-specific tasks.
tasks.json (Existing Single File - Enhanced):
Purpose: Remains the central, aggregated task list for the entire project.
Enhancement: Tasks generated from feature PRDs should ideally include metadata linking them back to their source feature.
Add a featureSource (or similar) field to each task object: {"id": 1, "title": "...", "featureSource": "feature-A", ...}.
Tool Interaction: This file is still the target for all task generation and manipulation commands.


Read product-vision.md content.
Read the specified feature PRD (e.g., features/feature-A/prd.md).
Read the current tasks.json (to know existing tasks and determine the next available ID).
Construct Prompt for Claude: Include vision context, feature PRD content, and potentially a summary/list of existing task titles from tasks.json to help Claude create relevant dependencies and avoid major overlaps. Crucially, instruct Claude to generate tasks specifically for this feature and potentially suggest dependencies on existing tasks if relevant.
Parse Claude's response.
Assign new sequential IDs (continuing from the highest existing ID in tasks.json).
Add the featureSource: "feature-A" metadata to each newly generated task.
Append these new tasks to the tasks.json file.

- Set goals & brainstorm metrics ChatPRD can help you brainstorm the right targets to track success for any one of your features.
Get coached on your PM skills Get direct feedback about your documents, plans, and communication. Get coached by an AI Chief Product Officer anytime you need.

- ChatPRD Templates: https://www.chatprd.ai/templates

---

v2 Features:

- Sound Notifications for:
	- "I have a question for you"
	- "Task(s) done!"
- PRD Version History
- Rich Text Editor
	- Width: Standard, Full-Size
	- Inline Select and Ask AI
	- Notion Styled TipTap v3 Editor
	- Export
		- GitHub, Asana, Trello, Coda, Notion, Google Docs, Linear, Confluence, Jira, etc.
		- OpenDocumentText, Microsoft Word, Markdown
	- Version History
	- "Improve" button
		- Ask AI to improve the PRD.
		- Divide the features into smaller docs
		- Make changes to the system such that this button is never needed.
- Tasks
	- Task Management
		- Task Dependencies
		- Task Priorities
		- Task Labels
		- Task Assignees
		- Task Due Dates
		- Complexity Score
	- Scope-Up - To increase the scope of the task and divide into smaller tasks (Add a Meter - Low, Medium, High)
	- Scope-Down - To decrease the scope of the task and combine into larger tasks (Add a Meter - Low, Medium, High)
	- Ask AI to automatically prioritize a certain task for faster MVP creation
	- Ask AI to automatically backlog the task for the next version
	- Add Hint Prompts to ask about "Product Strategy", "Competitor Analysis and Market Monitoring", "User Feedback Synthesis and Insights"
	- Create a group of commits and PR for each task.
	- 

----

v3 Features:


Guide to setup IDE for powerful development
- Extended tool usage, including web browsing, search engine queries, and LLM-driven text/image analysis
	- https://github.com/eastlondoner/cursor-tools
- Generate Rules for Cursor
	- https://github.com/SlyyCooper/cursorrules-architect
- Communication Chat-bots
	- Slack
	- Discord
	- Microsoft Teams
	- Google Chat

---

https://block.github.io/goose/prompt-library
goose

Implementing a MCP Server

Implementing a voice feature where you just talk with the AI.

---

High-Level Workflow
1. ideate → Turn idea into a structured product concept (concept.txt)
2. round-table → Simulate expert discussion and generate improvements (discussion.txt)
3. refine-concept → Apply refinements from prompts or round table to the concept
4. generate-prd → Generate full PRD (prd.txt)
5. (Optional) Generate tasks, continue iteration as needed

--
Purpose: Simulate a discussion between domain experts to generate insights and recommendations.
• Flags:
• --concept-file: Path to the concept.txt
• --participants: List of expert names or descriptions (e.g. “Nikita Bier”, “experienced growth strategist”, “AI safety researcher”)
• --refine-concept: Apply recommendations from discussion directly to concept.txt
• Flow:
1. Prompts user to define each participant.
2. Confirms setup and runs simulation.
3. Outputs full discussion in discussion.txt.
4. Summarizes actionable recommendations directly in CLI.
5. If --refine-concept is passed, updates concept.txt with recommendations.
• Notes:
• Should feel like a structured roundtable with personas contributing distinct takes.
• Each contribution should reflect domain-specific thinking.


---

Purpose: Improve and deepen the concept via additional research and prompts.
• Flags:
• --concept-file: Path to concept.txt
• --prompt: Custom prompt for refinement (e.g. "Consider using FastMCP for backend modularity.")
• --discussion-file: Optionally include discussion.txt to automatically pull recommendations into refinement.
• Flow:
1. Loads the concept.
2. Applies additional input (prompt or discussion-based suggestions).
3. Outputs updated concept.txt.


--
Purpose: Turn the finalized concept into a detailed PRD.
• Flags:
• --concept-file: Path to concept.txt
• --example-prd: Reference template structure
• --research: Optional live research (e.g. Grok, Perplexity)
• Output: prd.txt
• Notes:
• Should handle both structured concepts and slightly fuzzy ones.
• Output should be well-structured and scoped (features, goals, edge cases, etc.)

---

## Prompts:

Generate a PRD
Write PRD using a sample template (you can also write to Google Docs to share with others)
Generate tasks from PRD
Update Tasks from PRD (analyze for changes using git)
Analyze Complexity
Breakdown complex tasks into smaller tasks

Ollama support (tasks generated by Claude and Perplexity right now)

Two way task/PRD sync
Generate test file for any task file to easily verify functionality and improve code stability as Cursor implements other tasks
Bulk verify implementation and mark all related tasks as done — makes it easier to drop this into an existing project



Development Environment
- Attach Terminal with setup commands
	- Attach Database if required
	- Attach SST/Pulumi/Terraform if required
	- Attach Mocking services if required
	- Attach Testing services if TDD
- Attach Browser if required
- Attach Figma if required
- linter, formatter, etc

// * Labels
// - This is for developer's reference
// * Milestones
// 1. Create an MVP
// 2. Add support for multiple users
// 3. Create PRD for each milestone
// * Tasks
// - Blocking, Blocked By
// - Bug / New Feature / Improvement
// - Backlog, Planned, In Progress, Completed / Cancelled

Suggest Features

Figma and make changes, Drawings and make changes, Inspect elements and make changes
Auto detect console errors and fix them


---


Store notes, knowledge
Planner, find bugs

Code Mode
Debug Mode
Architect Mode

SPARC stands for Specification, Pseudocode, Architecture, Refinement, and Completion.


Each subtask operates within its own isolated context, ensuring focused and efficient task management
SPARC Orchestrator guarantees that every subtask adheres to best practices—avoiding hard-coded environment variables, maintaining files under 500 lines, and ensuring a modular, extensible design.
Model: Reasoning Models: o3, Sonnet 3.7 Thinking, DeepSeek

---

📋Specification & Pseudocode 
Role: Captures the complete project context and produces a modular pseudocode blueprint with TDD anchors. 

Focus: Clear, modular design; externalizes configuration; splits complex logic across modules.

Model: Reasoning Models: o3, Sonnet 3.7 Thinking, DeepSeek

🏗️ Architect 
Role: Designs scalable, secure, and modular architectures based on requirements and pseudocode. 

Focus: Detailed system diagrams, data flows, API boundaries, and service segmentation. Leverages Sonnet 3.7 for instructive reasoning.

Model: Reasoning Models: o3, Sonnet 3.7 Thinking, DeepSeek

🧠 Code 
Role: Implements robust, efficient code using externalized configurations. 

Focus: Clean, modular code split into files under 500 lines, with no hard-coded secrets.

Model: Instruct Models: Sonnet 3.7, GPT-4o Thinking, Mistral

🧪 TDD 
Role: Enforces Test-Driven Development by writing failing tests first and then minimal code followed by refactoring. 

Focus: Thorough test coverage, modular test files, and adherence to security practices.

Model: Instruct Models: Sonnet 3.7, GPT-4o Thinking, Mistral

🪲 Debug 
 Role: Troubleshoots and resolves runtime issues using logging, tracing, and analysis tools.

Focus: Isolates and fixes bugs while keeping fixes modular and secure.

Model: Instruct Models: Sonnet 3.7, GPT-4o Thinking, Mistral

🛡️Security Reviewer 
Role: Audits code and architecture to identify vulnerabilities and enforce secure practices.

Focus: Detects exposed secrets, oversized files, and non-modular code, recommending necessary mitigations.

Model: Instruct Models: Sonnet 3.7, GPT-4o Thinking, Mistral

📚Documentation Writer 
Role: Produces clear, comprehensive Markdown documentation for usage, configuration, and integration. 

Focus: Modular documentation (files under 500 lines) that avoids exposing sensitive data.

Model: Reasoning Models: o3, Sonnet 3.7 Thinking, DeepSeek

🔗 Integrator 
Role: Merges outputs from all specialized modes into a cohesive final product. 

Focus: Seamless integration of components ensuring modularity and adherence to security standards.

Model: Instruct Models: Sonnet 3.7, GPT-4o Thinking, Mistral

📈Post-Deployment Monitor 
Role: Monitors system performance post-deployment, collecting metrics, logs, and user feedback. 

Focus: Continuous monitoring with secure, modular configurations and prompt escalation of issues.

Model: Instruct Models: Sonnet 3.7, GPT-4o Thinking, Mistral

🧹Optimizer 
Role: Continuously refines and optimizes the codebase for performance, modularity, and maintainability. 

Focus: Refactoring, splitting large files, and externalizing configurations to meet best practices.

Model: Instruct Models: Sonnet 3.7, GPT-4o Thinking, Mistral

❓ Ask 
Role: Guides users in formulating precise, modular requests to delegate tasks to the correct specialized modes. 

Focus: Providing task formulation and delegation strategies, leveraging DeepSeek and Sonnet 3.7 Thinking for effective inquiries.

Model: Reasoning Models: o3, Sonnet 3.7 Thinking, DeepSeek

🚀DevOps 
Role: Manages deployments and infrastructure operations across cloud providers, edge platforms, and internal environments. 

Focus: Secure, traceable, and automated deployments using CI/CD pipelines and managed configuration, with no hard-coded credentials.

Model: Instruct Models: Sonnet 3.7, GPT-4o Thinking, Mistral
--
Tool Access Restrictions: Adjust the "groups" field for each mode to control which tools they can use (e.g., read, edit, browser, command, mcp).

Role Definitions & Custom Instructions: Edit the roleDefinition and customInstructions to match your organization’s language and standards. For lengthy instructions, consider using .clinerules-{mode-slug} files.

API Configuration (Optional): Add an "apiConfiguration" property to any mode for model-specific parameters (e.g., {"model": "gpt-4", "temperature": 0.2}).

Approval Settings: Configure manual or auto-approvals for new_task and attempt_completion actions in your Roo Code workflow settings.

Project-Specific Overrides: Store this JSON in .roomodes at your project root to override global settings from cline_custom_modes.json.


Context7 + Sequential Thinking + Serper Search + n8n MCP = Absolute Agentic Power
@OP, Brave search, Fetcher and a database mcp server are important to me.
just using Quillopy for specific library context.

---
Feedback

- Is the current UI/UX good?
- How can we make the UI/UX better?
- What features do you think are missing?

---

## Collected TODOs from codebase

### Layout & Architecture
- Entire thing is a SPA in Bun with React Router + Server-Sent-Events + Websockets. (src/app/layout.tsx)

### Configuration & Data Management
- Throw Validation Errors (src/algorithm/config.ts)
- If not exists create file (src/algorithm/config.ts)
- Sync stores using websockets / SSE. (src/hooks/useConfig.tsx)

### Onboarding & Authentication
- Add submit logic (src/app/(app-onboarding)/onboarding/page.tsx)

### UI Components & Pages
- Make this external link to https://cursor.directory/ (src/app/(app)/ai-editor/layout.tsx)
- Add dashboard widgets (src/app/(app)/dashboard/page.tsx)
- Implement cycle list view and management (src/app/(app)/cycles/page.tsx)
- Implement repository scanning and display (src/app/(app)/repository/page.tsx)

### Repository Styling Page
- Fetch actual style configs from backend (src/app/(app)/repository/styling/page.tsx)
- Implement actual TipTap editor component (src/app/(app)/repository/styling/page.tsx)
- Replace with actual state management/fetching logic (src/app/(app)/repository/styling/page.tsx)
- Persist new config to backend (src/app/(app)/repository/styling/page.tsx)
- Delete config from backend (src/app/(app)/repository/styling/page.tsx)
- Add editor/controls for Common Style Config (src/app/(app)/repository/styling/page.tsx)

### Next.js and UI Improvements
- Ensure all components follow React Server Component patterns where appropriate
- Convert UI components to use shadcn/ui equivalents
- Follow mobile-first approach with Tailwind responsive design
- Optimize for Web Vitals (LCP, CLS, FID)
- Limit use of 'use client' directive to components that actually need client-side interactivity
- Implement dynamic loading for non-critical components

### Task Management Components
- Update task status types in components/tasks/types.ts
- Ensure consistency in task status naming and filtering across components
- Implement proper state management for task filtering and updates

---

- https://docs.cline.bot/exploring-clines-tools/remote-browser-support
- Interaction Tools
	- ask_followup_question: Ask user for clarification
	- attempt_completion: Present final results
- 

----

- Inspect and write instructions
- Scribe and write instructions
- Open NGROK MCP and start sharing live

---

- https://www.chatprd.ai/resources/PRD-for-Cursor

----

1. do all todos
2. plan the auto-suggestions and prd-ai generation
2. plan the review cycle
3. plan the versioning cycling

----

- Build More:
	- VSCode Extension
	- Chrome Extension

----

- Release Notes
- Help
- Support
- Discord
- Forum
- Documentation
- Feedback / Bug Reports
- Changelog
- Legal
	- Privacy Policy
	- Terms of Service
	- Cookie Policy
	- Security Policy
	- DMCA Policy
	- Copyright Policy