'use client';

import { useState } from 'react';
import { useParams } from 'react-router';
import { getTaskDetail } from '@/components/tasks/mock-data';
import { TaskDetailContent } from '@/components/tasks/TaskDetailContent';
import { TaskDetailHeader } from '@/components/tasks/TaskDetailHeader';
import { TaskDetailSidebar } from '@/components/tasks/TaskDetailSidebar';
import type { Comment, TaskDetail } from '@/components/tasks/types';

type TaskDetailPageProps = {
	params: { id: string };
};

export default function TaskDetailPage() {
	// Get initial task data
	const { id } = useParams();
	const [task, setTask] = useState<TaskDetail>(() => getTaskDetail(id));

	// Handle task updates
	const handleTaskUpdate = (
		field: keyof TaskDetail,
		value: string | boolean | Date,
	) => {
		setTask((prev) => ({ ...prev, [field]: value }));
	};

	// Handle subtask toggle
	const handleSubtaskToggle = (subtaskId: string, completed: boolean) => {
		setTask((prev) => ({
			...prev,
			subtasks: prev.subtasks.map((subtask) =>
				subtask.id === subtaskId ? { ...subtask, completed } : subtask,
			),
		}));
	};

	// Handle adding comments
	const handleAddComment = (content: string) => {
		const newComment: Comment = {
			id: Date.now(),
			author: 'Current User',
			content,
			timestamp: new Date().toLocaleString(),
		};

		setTask((prev) => ({
			...prev,
			comments: [...prev.comments, newComment],
		}));
	};

	return (
		<div className="flex h-full flex-col">
			{/* Header */}
			<TaskDetailHeader task={task} />

			<div className="flex flex-1 overflow-hidden">
				{/* Main content */}
				<TaskDetailContent
					task={task}
					onSubtaskToggle={handleSubtaskToggle}
					onAddComment={handleAddComment}
				/>

				{/* Sidebar */}
				<TaskDetailSidebar task={task} onTaskUpdate={handleTaskUpdate} />
			</div>
		</div>
	);
}
