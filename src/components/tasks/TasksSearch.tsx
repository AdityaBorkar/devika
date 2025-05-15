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
				className="-translate-y-1/2 absolute top-1/2 left-3 transform text-zinc-400"
				size={16}
			/>
			<input
				className="w-full rounded-md border border-zinc-300 bg-white py-1.5 pr-3 pl-9 text-sm dark:border-zinc-700 dark:bg-zinc-900"
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="Search tasks..."
				type="text"
				value={searchQuery}
			/>
		</div>
	);
};
