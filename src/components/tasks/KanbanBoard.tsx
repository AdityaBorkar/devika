import { Plus } from 'lucide-react';
import type React from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { TaskCard } from './TaskCard';
import type { Task } from './types';

interface KanbanColumnProps {
	title: string;
	tasks: Task[];
}

// Use memo to prevent unnecessary re-renders when other columns' tasks change
export const KanbanColumn: React.FC<KanbanColumnProps> = memo(
	function KanbanColumn({ title, tasks }) {
		return (
			<div className="h-full rounded-lg bg-zinc-950 px-6 ">
				<div className="flex items-center gap-2 py-4">
					<h2 className="font-medium text-sm">{title}</h2>
					<div className="size-5 rounded-full bg-zinc-700 text-center text-xs text-zinc-300 leading-5">
						{tasks.length}
					</div>
				</div>
				<div className="space-y-2">
					{tasks.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}

					{tasks.length === 0 && (
						<div className="rounded-md border border-zinc-200 border-dashed p-3 text-center text-muted-foreground text-sm dark:border-zinc-700">
							No tasks
						</div>
					)}
				</div>
			</div>
		);
	},
);
