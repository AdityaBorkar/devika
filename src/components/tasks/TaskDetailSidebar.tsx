import type React from 'react';
import type { TaskDetail } from './types';

interface TaskDetailSidebarProps {
	task: TaskDetail;
	onTaskUpdate?: (
		field: keyof TaskDetail,
		value: string | boolean | Date,
	) => void;
}

export const TaskDetailSidebar: React.FC<TaskDetailSidebarProps> = ({
	task,
	onTaskUpdate = () => {},
}) => {
	return (
		<div className="w-64 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900">
			<h2 className="mb-3 font-medium text-gray-500 text-sm">Properties</h2>

			<div className="space-y-4">
				<div>
					<label className="mb-1 block text-gray-500 text-xs" htmlFor="status">
						Status
					</label>
					<select
						className="w-full rounded border border-gray-300 bg-white p-1.5 text-sm dark:border-gray-700 dark:bg-gray-800"
						id="status"
						onChange={(e) => onTaskUpdate('status', e.target.value)}
						value={task.status}
					>
						<option value="Todo">Todo</option>
						<option value="In Progress">In Progress</option>
						<option value="Done">Done</option>
					</select>
				</div>

				<div>
					<label
						className="mb-1 block text-gray-500 text-xs"
						htmlFor="assignee"
					>
						Assignee
					</label>
					<select
						className="w-full rounded border border-gray-300 bg-white p-1.5 text-sm dark:border-gray-700 dark:bg-gray-800"
						id="assignee"
						onChange={(e) => onTaskUpdate('assignee', e.target.value)}
						value={task.assignee}
					>
						<option>John Doe</option>
						<option>Jane Smith</option>
						<option>Alex Johnson</option>
						<option>Sarah Williams</option>
						<option>Mike Brown</option>
					</select>
				</div>

				<div>
					<label
						className="mb-1 block text-gray-500 text-xs"
						htmlFor="priority"
					>
						Priority
					</label>
					<select
						className="w-full rounded border border-gray-300 bg-white p-1.5 text-sm dark:border-gray-700 dark:bg-gray-800"
						id="priority"
						onChange={(e) => onTaskUpdate('priority', e.target.value)}
						value={task.priority}
					>
						<option value="High">High</option>
						<option value="Medium">Medium</option>
						<option value="Low">Low</option>
					</select>
				</div>

				<div>
					<label className="mb-1 block text-gray-500 text-xs" htmlFor="dueDate">
						Due Date
					</label>
					<input
						className="w-full rounded border border-gray-300 bg-white p-1.5 text-sm dark:border-gray-700 dark:bg-gray-800"
						id="dueDate"
						onChange={(e) => onTaskUpdate('due', e.target.value)}
						type="date"
						value={task.due}
					/>
				</div>

				<div>
					<label className="mb-1 block text-gray-500 text-xs" htmlFor="labels">
						Labels
					</label>
					<div className="mt-1 flex flex-wrap gap-1" id="labels">
						<div className="rounded-full bg-indigo-100 px-2 py-1 text-indigo-800 text-xs">
							Frontend
						</div>
						<div className="rounded-full bg-purple-100 px-2 py-1 text-purple-800 text-xs">
							Authentication
						</div>
						<div className="cursor-pointer rounded-full bg-gray-100 px-2 py-1 text-gray-800 text-xs hover:bg-gray-200">
							+ Add
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 border-gray-200 border-t pt-6 dark:border-gray-800">
				<h2 className="mb-3 font-medium text-gray-500 text-sm">Activity</h2>
				<div className="space-y-2 text-gray-500 text-xs">
					<div>
						<span className="font-medium text-gray-700">John Doe</span> created
						this task
						<div className="mt-0.5 text-gray-400">{task.createdAt}</div>
					</div>
					<div>
						<span className="font-medium text-gray-700">Jane Smith</span>{' '}
						changed status to &quot;{task.status}&quot;
						<div className="mt-0.5 text-gray-400">Yesterday</div>
					</div>
				</div>
			</div>
		</div>
	);
};
