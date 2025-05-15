import { Plus } from 'lucide-react';
import type React from 'react';
import { useNavigate } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { TaskCard } from './TaskCard';
import type { Task } from './types';

interface KanbanColumnProps {
	title: string;
	tasks: Task[];
	color: string;
	count: number;
	onClick: (id: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
	title,
	tasks,
	color,
	count,
	onClick,
}) => {
	return (
		<div className="w-full px-2 lg:w-1/3">
			<Card className="mb-4 border-t-4" style={{ borderTopColor: color }}>
				<CardHeader className="px-3 py-2">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<h2 className="font-medium text-sm">{title}</h2>
							<Badge className="text-xs" variant="secondary">
								{count}
							</Badge>
						</div>
						<Button
							aria-label={`Add task to ${title}`}
							className="h-6 w-6"
							size="icon"
							type="button"
							variant="ghost"
						>
							<Plus size={14} />
						</Button>
					</div>
				</CardHeader>
				<CardContent className="px-3 pt-0 pb-3">
					<div className="space-y-2">
						{tasks.map((task) => (
							<TaskCard key={task.id} onClick={onClick} task={task} />
						))}

						{tasks.length === 0 && (
							<div className="rounded-md border border-zinc-200 border-dashed p-3 text-center text-muted-foreground text-sm dark:border-zinc-700">
								No tasks
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

interface KanbanBoardProps {
	tasks: Task[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
	const navigate = useNavigate();

	const handleTaskClick = (id: string) => {
		navigate(`/tasks/${id}`);
	};

	const todoTasks = tasks.filter((task) => task.status === 'Todo');
	const inProgressTasks = tasks.filter((task) => task.status === 'In Progress');
	const doneTasks = tasks.filter((task) => task.status === 'Done');

	return (
		<div className="flex-1 overflow-x-auto">
			<div className="-mx-2 flex min-w-full flex-wrap p-4">
				<KanbanColumn
					color="#6b7280"
					count={todoTasks.length}
					onClick={handleTaskClick} // zinc-500
					tasks={todoTasks}
					title="Todo"
				/>
				<KanbanColumn
					color="#3b82f6"
					count={inProgressTasks.length}
					onClick={handleTaskClick} // blue-500
					tasks={inProgressTasks}
					title="In Progress"
				/>
				<KanbanColumn
					color="#10b981"
					count={doneTasks.length}
					onClick={handleTaskClick} // emerald-500
					tasks={doneTasks}
					title="Done"
				/>
			</div>
		</div>
	);
};
