import { cn } from '@/lib/utils';

export function viewAtoms() {}

export function ViewLayout({
	wrapperClass,
}: {
	wrapperClass?: string;
}) {
	return (
		<div className={cn('flex h-full flex-col ', wrapperClass)}>
            			<TasksHeader activeTab={activeTab} onTabChange={setActiveTab} />

onShowFilterPanel={() => setShowFilterPanel(!showFilterPanel)}
onViewModeChange={setViewMode}
searchQuery={searchQuery}
setSearchQuery={setSearchQuery}
viewMode={viewMode}
/>

{/* Main content area */}
<div className="grow overflow-hidden">
<ViewOutput />
</div>
        </div>
	);
}

function ViewOutput() {
	// Derived data from atoms
	const [filteredTasks] = useAtom(filteredTasksAtom);
	const [todoTasks] = useAtom(todoTasksAtom);
	const [inProgressTasks] = useAtom(inProgressTasksAtom);
	const [doneTasks] = useAtom(doneTasksAtom);
	const [viewMode] = useAtom(viewModeAtom);
	const [sorting, setSorting] = useAtom(sortingAtom);
	const [columnFilters, setColumnFilters] = useAtom(columnFiltersAtom);
	const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
	if (viewMode === 'list')
		return (
			<TasksTable
				columnFilters={columnFilters}
				searchQuery={searchQuery}
				setSorting={setSorting}
				sorting={sorting}
				tasks={filteredTasks}
			/>
		);
	return (
		<div className="flex h-full flex-row gap-4 overflow-x-auto py-4 *:w-1/4">
			<KanbanColumn title="Todo" tasks={todoTasks} />
			<KanbanColumn title="In Progress" tasks={inProgressTasks} />
			<KanbanColumn title="Done" tasks={doneTasks} />
		</div>
	);
}
