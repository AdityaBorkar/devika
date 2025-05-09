import { Calendar, Check, Clock, Tag, User } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import type { TaskDetail } from './types';
import { getPriorityColor, getStatusColor } from './utils';

interface TaskDetailContentProps {
	task: TaskDetail;
	onSubtaskToggle?: (subtaskId: string, completed: boolean) => void;
	onAddComment?: (comment: string) => void;
}

export const TaskDetailContent: React.FC<TaskDetailContentProps> = ({
	task,
	onSubtaskToggle = () => {},
	onAddComment = () => {},
}) => {
	const [newComment, setNewComment] = useState('');

	const handleCommentSubmit = () => {
		if (newComment.trim()) {
			onAddComment(newComment);
			setNewComment('');
		}
	};

	return (
		<div className="flex-grow overflow-y-auto border-gray-200 border-r p-6 dark:border-gray-800">
			{/* Status and metadata */}
			<div className="mb-6 flex flex-wrap gap-4">
				<div className="flex items-center gap-2">
					<div
						className={`rounded-full px-3 py-1 text-sm ${getStatusColor(task.status)}`}
					>
						{task.status}
					</div>
				</div>
				<div className="flex items-center gap-2 text-gray-500">
					<Calendar size={14} />
					<span className="text-sm">Created on {task.createdAt}</span>
				</div>
				<div className="flex items-center gap-2 text-gray-500">
					<Clock size={14} />
					<span className="text-sm">Due {task.due}</span>
				</div>
				<div className="flex items-center gap-2 text-gray-500">
					<User size={14} />
					<span className="text-sm">{task.assignee}</span>
				</div>
				<div className="flex items-center gap-2">
					<Tag className={getPriorityColor(task.priority)} size={14} />
					<span
						className={`font-medium text-sm ${getPriorityColor(task.priority)}`}
					>
						{task.priority}
					</span>
				</div>
			</div>

			{/* Description */}
			<div className="mb-8">
				<h2 className="mb-2 font-medium text-gray-500 text-sm">Description</h2>
				<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
					<p className="whitespace-pre-line text-gray-800 text-sm dark:text-gray-200">
						{task.description}
					</p>
				</div>
			</div>

			{/* Subtasks */}
			<div className="mb-8">
				<h2 className="mb-2 font-medium text-gray-500 text-sm">Subtasks</h2>
				<div className="space-y-2">
					{task.subtasks.map((subtask) => (
						<div
							className="flex items-start gap-2 rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-800"
							key={subtask.id}
						>
							<div className="relative mt-0.5 flex items-center">
								<input
									checked={subtask.completed}
									className={`h-4 w-4 appearance-none rounded-sm border ${
										subtask.completed
											? 'border-indigo-600 bg-indigo-600'
											: 'border-gray-300 dark:border-gray-700'
									}`}
									id={`subtask-${subtask.id}`}
									onChange={() =>
										onSubtaskToggle(subtask.id, !subtask.completed)
									}
									type="checkbox"
								/>
								{subtask.completed && (
									<Check
										className="pointer-events-none absolute ml-0.5 text-white"
										size={12}
									/>
								)}
							</div>
							<label
								className={`text-sm ${
									subtask.completed
										? 'text-gray-400 line-through'
										: 'text-gray-800 dark:text-gray-200'
								}`}
								htmlFor={`subtask-${subtask.id}`}
							>
								{subtask.title}
							</label>
						</div>
					))}

					<div className="flex cursor-pointer items-center gap-2 p-2 text-gray-400 hover:text-gray-600">
						<div className="h-4 w-4 rounded-sm border border-gray-300 border-dashed dark:border-gray-700" />
						<span className="text-sm">Add subtask...</span>
					</div>
				</div>
			</div>

			{/* Comments */}
			<div>
				<h2 className="mb-2 font-medium text-gray-500 text-sm">Comments</h2>
				<div className="mb-4 space-y-4">
					{task.comments.map((comment) => (
						<div
							className="rounded-md bg-gray-50 p-3 dark:bg-gray-800"
							key={comment.id}
						>
							<div className="mb-1 flex justify-between">
								<span className="font-medium text-sm">{comment.author}</span>
								<span className="text-gray-500 text-xs">
									{comment.timestamp}
								</span>
							</div>
							<p className="text-gray-800 text-sm dark:text-gray-200">
								{comment.content}
							</p>
						</div>
					))}
				</div>

				{/* New comment form */}
				<div className="mt-4">
					<textarea
						className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700"
						onChange={(e) => setNewComment(e.target.value)}
						placeholder="Add a comment..."
						rows={2}
						value={newComment}
					/>
					<div className="mt-2 flex justify-end">
						<button
							className="rounded-md bg-indigo-600 px-3 py-1.5 font-medium text-sm text-white hover:bg-indigo-700"
							disabled={!newComment.trim()}
							onClick={handleCommentSubmit}
							type="button"
						>
							Comment
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
