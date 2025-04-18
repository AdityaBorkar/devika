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
		<div className="border-gray-200 border-b dark:border-gray-800">
			<div className="flex items-center justify-between px-4 py-2">
				<div className="flex space-x-1">
					<button
						type="button"
						className={`rounded-md px-3 py-1.5 text-sm ${
							activeTab === 'all'
								? 'bg-gray-100 font-medium dark:bg-gray-800'
								: 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
						}`}
						onClick={() => onTabChange('all')}
					>
						All Issues
					</button>
					<button
						type="button"
						className={`rounded-md px-3 py-1.5 text-sm ${
							activeTab === 'active'
								? 'bg-gray-100 font-medium dark:bg-gray-800'
								: 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
						}`}
						onClick={() => onTabChange('active')}
					>
						Active
					</button>
					<button
						type="button"
						className={`rounded-md px-3 py-1.5 text-sm ${
							activeTab === 'backlog'
								? 'bg-gray-100 font-medium dark:bg-gray-800'
								: 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
						}`}
						onClick={() => onTabChange('backlog')}
					>
						Backlog
					</button>
				</div>

				<div className="flex items-center space-x-2">
					<button
						type="button"
						className="rounded-full p-1.5 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
						aria-label="Notifications"
					>
						<Bell size={18} />
					</button>
					<HeaderActions onCreateTask={onCreateTask} />
				</div>
			</div>
		</div>
	);
};
