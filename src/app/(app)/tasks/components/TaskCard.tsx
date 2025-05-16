export const TaskCard = () => {
	return <div>TaskCard</div>;
};
id: Unique identifier for the task (Example: 1)
title: Brief, descriptive title of the task (Example: "Initialize Repo")
description: Concise description of what the task involves (Example: "Create a new repository, set up initial structure.")
status: Current state of the task (Example: "pending", "done", "deferred")
dependencies: IDs of tasks that must be completed before this task (Example: [1, 2])
Dependencies are displayed with status indicators (✅ for completed, ⏱️ for pending)
This helps quickly identify which prerequisite tasks are blocking work
priority: Importance level of the task (Example: "high", "medium", "low")
details: In-depth implementation instructions (Example: "Use GitHub client ID/secret, handle callback, set session token.")
testStrategy: Verification approach (Example: "Deploy and call endpoint to confirm 'Hello World' response.")
subtasks: List of smaller, more specific tasks that make up the main task (Example: [{"id": 1, "title": "Configure OAuth", ...}])
