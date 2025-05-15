import { Bell } from 'lucide-react';
import type React from 'react';
import { HeaderActions } from './HeaderActions';

export type TabType = 'all' | 'active' | 'backlog';

interface TasksHeaderProps {
	activeTab: TabType;
	onTabChange: (tab: TabType) => void;
	onCreateTask: () => void;
}

export const TasksHeader: React.FC<TasksHeaderProps> = ({
	activeTab,
	onTabChange,
	onCreateTask,
}) => {
	return (
		<div className="border-zinc-200 border-b dark:border-zinc-800">
			<div className="flex items-center justify-between px-4 py-2">
				<div className="flex space-x-1">
					<button
						className={`rounded-md px-3 py-1.5 text-sm ${
							activeTab === 'all'
								? 'bg-zinc-100 font-medium dark:bg-zinc-800'
								: 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
						}`}
						onClick={() => onTabChange('all')}
						type="button"
					>
						All Issues
					</button>
					<button
						className={`rounded-md px-3 py-1.5 text-sm ${
							activeTab === 'active'
								? 'bg-zinc-100 font-medium dark:bg-zinc-800'
								: 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
						}`}
						onClick={() => onTabChange('active')}
						type="button"
					>
						Active
					</button>
					<button
						className={`rounded-md px-3 py-1.5 text-sm ${
							activeTab === 'backlog'
								? 'bg-zinc-100 font-medium dark:bg-zinc-800'
								: 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
						}`}
						onClick={() => onTabChange('backlog')}
						type="button"
					>
						Backlog
					</button>
				</div>

				<div className="flex items-center space-x-2">
					<button
						aria-label="Notifications"
						className="rounded-full p-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
						type="button"
					>
						<Bell size={18} />
					</button>
					<HeaderActions onCreateTask={onCreateTask} />
				</div>
			</div>
		</div>
	);
};
