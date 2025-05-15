import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import type React from 'react';
import { Link } from 'react-router';
import type { TaskDetail } from './types';

interface TaskDetailHeaderProps {
	task: TaskDetail;
}

export const TaskDetailHeader: React.FC<TaskDetailHeaderProps> = ({ task }) => {
	return (
		<div className="flex items-center justify-between border-zinc-200 border-b px-6 py-4 dark:border-zinc-800">
			<div className="flex items-center gap-3">
				<Link
					className="rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
					to="/tasks"
				>
					<ArrowLeft size={18} />
				</Link>
				<h1 className="font-semibold text-xl">
					{task.id}: {task.title}
				</h1>
			</div>
			<div className="flex items-center gap-2">
				<button
					className="rounded p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
					type="button"
				>
					<MoreHorizontal size={18} />
				</button>
			</div>
		</div>
	);
};
