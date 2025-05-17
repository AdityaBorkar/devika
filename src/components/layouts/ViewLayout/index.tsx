import {
	ChevronDown,
	Filter,
	Plus,
	Search,
	SlidersHorizontal,
} from 'lucide-react';
import { useQueryState } from 'nuqs';
import { PiFunnelSimple, PiPlus } from 'react-icons/pi';
import { KanbanColumn } from '@/components/layouts/ViewLayout/KanbanColumn';
import { ListTable } from '@/components/layouts/ViewLayout/ListTable';
import { TabButton } from '@/components/layouts/ViewLayout/TabButton';
import { cn } from '@/lib/utils';

export interface ViewTab {
	label: string;
	value: string;
	display: 'list' | 'kanban';
}
interface ViewLayoutProps {
	wrapperClass?: string;
	viewTabs: ViewTab[];
	defaultViewTab: string;
	components: {
		card: React.ComponentType<{ data: unknown }>;
		list: React.ComponentType<{ data: unknown }>;
	};
}

export function ViewLayout({
	wrapperClass,
	viewTabs,
	components,
	defaultViewTab,
}: ViewLayoutProps) {
	const [activeTab, setActiveTab] = useQueryState('view', {
		defaultValue: defaultViewTab,
	});

	const display = {
		type: 'board',
		columns: [
			{ title: 'Todo', filter: (item) => item.status === 'todo' },
			{ title: 'In Progress', filter: (item) => item.status === 'inProgress' },
			{ title: 'Done', filter: (item) => item.status === 'done' },
		],
	};

	return (
		<div
			className={cn(
				'flex h-full flex-col divide-y divide-border/50 ',
				wrapperClass,
			)}
		>
			<div className="flex items-center gap-1 px-4 py-0.5">
				{viewTabs.map((tab) => (
					<TabButton
						key={tab.value}
						label={tab.label}
						value={tab.value}
						activeTab={activeTab}
						onTabChange={setActiveTab}
					/>
				))}
				<div className="grow" />
				<button
					className="flex items-center rounded-md bg-indigo-600 px-3 py-1.5 font-medium text-sm text-white hover:bg-indigo-700"
					// onClick={onCreateTask}
					type="button"
				>
					<PiPlus className="mr-1" size={16} />
					New Task
				</button>
			</div>

			<div className="flex items-center justify-between py-1 dark:border-zinc-800">
				<div className="flex items-center gap-4">
					<button
						className="flex items-center gap-1 rounded px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
						// onClick={onShowFilterPanel}
						type="button"
					>
						<PiFunnelSimple className="-mt-0.5 size-4" />
						<span>Filter</span>
					</button>
					<div className="relative max-w-xs">
						<Search
							className="-tranzinc-y-1/2 absolute top-1/2 left-3 transform text-zinc-400"
							size={16}
						/>
						<input
							className="w-full rounded-md border border-zinc-300 bg-white py-1.5 pr-3 pl-9 text-sm dark:border-zinc-700 dark:bg-zinc-900"
							placeholder="Search tasks..."
							type="text"
						/>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<DisplayPopover />
				</div>
			</div>

			<div className="grow overflow-hidden">
				{display.type === 'list' ? (
					<ListTable
						columnFilters={columnFilters}
						searchQuery={searchQuery}
						setSorting={setSorting}
						sorting={sorting}
						tasks={filteredTasks}
						component={components.list}
					/>
				) : (
					<div className="flex h-full flex-row gap-8 overflow-x-auto py-2 *:w-1/4">
						{display.columns.map((column) => (
							<KanbanColumn
								key={column.id}
								component={components.card}
								{...column}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

function DisplayPopover() {
	return <div>Display</div>;
}
