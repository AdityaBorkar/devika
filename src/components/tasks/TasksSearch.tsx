import { Search } from 'lucide-react';
import type React from 'react';

interface TasksSearchProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const TasksSearch: React.FC<TasksSearchProps> = ({
	searchQuery,
	setSearchQuery,
}) => {
	return (
		<div className="relative max-w-md flex-grow">
			<Search
				size={16}
				className="-translate-y-1/2 absolute top-1/2 left-3 transform text-gray-400"
			/>
			<input
				type="text"
				placeholder="Search tasks..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="w-full rounded-md border border-gray-300 bg-white py-1.5 pr-3 pl-9 text-sm dark:border-gray-700 dark:bg-gray-900"
			/>
		</div>
	);
};
