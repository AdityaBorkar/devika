'use client';

interface ProgressProps {
	percent: number;
	tasksStatus: {
		todo: number;
		inProgress: number;
		done: number;
		blocked: number;
	};
}

export function Progress({ percent, tasksStatus }: ProgressProps) {
	const total =
		tasksStatus.todo +
		tasksStatus.inProgress +
		tasksStatus.done +
		tasksStatus.blocked;

	const getPercentage = (value: number) => {
		return total > 0 ? (value / total) * 100 : 0;
	};

	return (
		<div className="space-y-1">
			<div className="flex items-center justify-between text-xs">
				<span className="font-medium">{percent}% complete</span>
				<span className="text-gray-500">
					{tasksStatus.done}/{total} tasks
				</span>
			</div>

			<div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
				{/* Stacked bars for different task statuses */}
				<div className="flex h-full">
					{/* Done tasks (green) */}
					{tasksStatus.done > 0 && (
						<div
							className="h-full bg-green-500"
							style={{ width: `${getPercentage(tasksStatus.done)}%` }}
						/>
					)}

					{/* In Progress tasks (blue) */}
					{tasksStatus.inProgress > 0 && (
						<div
							className="h-full bg-blue-500"
							style={{ width: `${getPercentage(tasksStatus.inProgress)}%` }}
						/>
					)}

					{/* Blocked tasks (red) */}
					{tasksStatus.blocked > 0 && (
						<div
							className="h-full bg-red-500"
							style={{ width: `${getPercentage(tasksStatus.blocked)}%` }}
						/>
					)}

					{/* Todo tasks (light gray, rendered by the background) */}
				</div>
			</div>

			{/* Legend */}
			<div className="flex gap-4 text-gray-600 text-xs">
				{tasksStatus.done > 0 && (
					<div className="flex items-center gap-1">
						<div className="h-2 w-2 rounded-full bg-green-500" />
						<span>Done ({tasksStatus.done})</span>
					</div>
				)}

				{tasksStatus.inProgress > 0 && (
					<div className="flex items-center gap-1">
						<div className="h-2 w-2 rounded-full bg-blue-500" />
						<span>In Progress ({tasksStatus.inProgress})</span>
					</div>
				)}

				{tasksStatus.blocked > 0 && (
					<div className="flex items-center gap-1">
						<div className="h-2 w-2 rounded-full bg-red-500" />
						<span>Blocked ({tasksStatus.blocked})</span>
					</div>
				)}

				{tasksStatus.todo > 0 && (
					<div className="flex items-center gap-1">
						<div className="h-2 w-2 rounded-full bg-gray-300" />
						<span>Todo ({tasksStatus.todo})</span>
					</div>
				)}
			</div>
		</div>
	);
}
