import { ChevronDown, Filter, Search, SlidersHorizontal } from 'lucide-react';
import type React from 'react';
import { type ViewMode, ViewToggle } from './ViewToggle';

interface ToolbarControlsProps {
	viewMode: ViewMode;
	onViewModeChange: (mode: ViewMode) => void;
	onShowFilterPanel: () => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
}

export const ToolbarControls: React.FC<ToolbarControlsProps> = ({
	viewMode,
	onViewModeChange,
	onShowFilterPanel,
	searchQuery,
	setSearchQuery,
}) => {
	return (
		<div className="flex items-center justify-between border-gray-200 border-b px-4 py-2 dark:border-gray-800">
			<div className="flex items-center gap-4">
				<button
					type="button"
					className="flex items-center gap-1 rounded px-2 py-1 text-gray-600 text-sm hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
					onClick={onShowFilterPanel}
				>
					<Filter size={16} />
					<span>Filter</span>
				</button>

				<div className="relative max-w-xs">
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
			</div>

			<div className="flex items-center gap-4">
				<div className="flex flex-col items-end">
					<div className="text-gray-600 text-sm dark:text-gray-300">
						Display
					</div>
					<div className="mt-1 flex gap-2">
						<ViewToggle viewMode={viewMode} onChange={onViewModeChange} />

						<div className="relative">
							<button
								type="button"
								className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800"
							>
								<SlidersHorizontal size={16} />
								<span>Columns</span>
								<ChevronDown size={14} />
							</button>
						</div>

						<div className="relative">
							<button
								type="button"
								className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800"
							>
								<span>No grouping</span>
								<ChevronDown size={14} />
							</button>
						</div>

						<div className="relative">
							<button
								type="button"
								className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800"
							>
								<span>Priority</span>
								<ChevronDown size={14} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
