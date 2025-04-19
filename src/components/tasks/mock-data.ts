import type { Task, TaskDetail } from './types';

export const MOCK_TASKS: Task[] = [
	{
		assignee: 'John Doe',
		due: '2023-12-31',
		id: 'TASK-1',
		priority: 'High',
		status: 'In Progress',
		title: 'Implement authentication flow',
	},
	{
		assignee: 'Jane Smith',
		due: '2023-12-25',
		id: 'TASK-2',
		priority: 'Medium',
		status: 'Todo',
		title: 'Design landing page',
	},
	{
		assignee: 'Alex Johnson',
		due: '2023-12-20',
		id: 'TASK-3',
		priority: 'Low',
		status: 'Done',
		title: 'Fix navigation bug',
	},
	{
		assignee: 'Sarah Williams',
		due: '2024-01-05',
		id: 'TASK-4',
		priority: 'Medium',
		status: 'Todo',
		title: 'Update documentation',
	},
	{
		assignee: 'Mike Brown',
		due: '2024-01-10',
		id: 'TASK-5',
		priority: 'High',
		status: 'In Progress',
		title: 'Optimize database queries',
	},
];

export const TASK_DETAILS: Record<string, TaskDetail> = {
	'TASK-1': {
		assignee: 'John Doe',
		comments: [
			{
				author: 'Jane Smith',
				content: 'Should we use refresh tokens as well?',
				id: 1,
				timestamp: '2023-11-16 09:30 AM',
			},
			{
				author: 'John Doe',
				content: 'Yes, we should implement refresh tokens for better security.',
				id: 2,
				timestamp: '2023-11-16 10:15 AM',
			},
		],
		createdAt: '2023-11-15',
		description:
			'Create a secure authentication flow using JWT tokens. The flow should include login, registration, password reset, and email verification. Ensure proper error handling and validation.',
		due: '2023-12-31',
		id: 'TASK-1',
		priority: 'High',
		status: 'In Progress',
		subtasks: [
			{ completed: true, id: 'ST-1', title: 'Design login UI' },
			{ completed: false, id: 'ST-2', title: 'Implement JWT authentication' },
			{ completed: false, id: 'ST-3', title: 'Add password reset flow' },
		],
		title: 'Implement authentication flow',
	},
	// Add more task details as needed
};

export const getTaskDetail = (id: string): TaskDetail => {
	return (
		TASK_DETAILS[id] || {
			...(MOCK_TASKS.find((task) => task.id === id) || MOCK_TASKS[0]),
			comments: [],
			createdAt: '2023-11-15',
			description: 'Task description not available.',
			subtasks: [],
		}
	);
};
