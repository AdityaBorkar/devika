import { Grid, List } from 'lucide-react';
import type React from 'react';

export type ViewMode = 'list' | 'board';

interface ViewToggleProps {
	viewMode: ViewMode;
	onChange: (mode: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
	viewMode,
	onChange,
}) => {
	return (
		<div className="flex items-center overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
			<button
				aria-label="List view"
				aria-pressed={viewMode === 'list'}
				className={`flex items-center justify-center p-2 ${
					viewMode === 'list'
						? 'bg-white shadow-sm dark:bg-zinc-700'
						: 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
				}`}
				onClick={() => onChange('list')}
				type="button"
			>
				<List size={16} />
			</button>
			<button
				aria-label="Board view"
				aria-pressed={viewMode === 'board'}
				className={`flex items-center justify-center p-2 ${
					viewMode === 'board'
						? 'bg-white shadow-sm dark:bg-zinc-700'
						: 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
				}`}
				onClick={() => onChange('board')}
				type="button"
			>
				<Grid size={16} />
			</button>
		</div>
	);
};
