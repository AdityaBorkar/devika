import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import type React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { CycleStatus } from './types';

interface CyclesToolbarProps {
	onShowFilterPanel: () => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	onSaveView: () => void;
	currentStatus: CycleStatus | 'All';
	onStatusChange: (status: CycleStatus | 'All') => void;
}

export const CyclesToolbar: React.FC<CyclesToolbarProps> = ({
	onShowFilterPanel,
	searchQuery,
	setSearchQuery,
	onSaveView,
	currentStatus,
	onStatusChange,
}) => {
	return (
		<div className="flex items-center justify-between border-zinc-200 border-b bg-zinc-50/50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/20">
			<div className="flex items-center gap-3">
				<Button
					className="flex items-center gap-1 border border-zinc-200 bg-white text-xs text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800/80"
					onClick={onShowFilterPanel}
					size="sm"
					variant="outline"
				>
					<Filter size={14} className="text-zinc-500 dark:text-zinc-400" />
					<span>Filter</span>
				</Button>

				<div className="relative max-w-xs">
					<Search
						className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 transform text-zinc-400"
						size={14}
					/>
					<Input
						className="h-8 border-zinc-200 bg-white pl-9 text-sm focus-visible:ring-primary/20 dark:border-zinc-700 dark:bg-zinc-800"
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search cycles..."
						type="text"
						value={searchQuery}
					/>
				</div>

				<Select
					defaultValue={currentStatus}
					onValueChange={(value) =>
						onStatusChange(value as CycleStatus | 'All')
					}
					value={currentStatus}
				>
					<SelectTrigger className="h-8 w-[160px] border-zinc-200 bg-white text-sm focus:ring-primary/20 dark:border-zinc-700 dark:bg-zinc-800">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All Statuses</SelectItem>
						<SelectItem value="Not Started">Not Started</SelectItem>
						<SelectItem value="In Progress">In Progress</SelectItem>
						<SelectItem value="Completed">Completed</SelectItem>
						<SelectItem value="Cancelled">Cancelled</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="flex items-center gap-2">
				<Button
					className="border border-zinc-200 bg-white text-xs text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800/80"
					onClick={onSaveView}
					size="sm"
					variant="outline"
				>
					Save View
				</Button>

				<Button
					className="flex items-center gap-1 border border-zinc-200 bg-white text-xs text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800/80"
					size="sm"
					variant="outline"
				>
					<SlidersHorizontal
						size={14}
						className="text-zinc-500 dark:text-zinc-400"
					/>
					<span>Display</span>
				</Button>
			</div>
		</div>
	);
};
