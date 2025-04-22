import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { MOCK_TASKS } from '@/components/tasks/mock-data';
import type { TabType } from '@/components/tasks/TasksHeader';
import { TasksHeader } from '@/components/tasks/TasksHeader';
import { TasksTable } from '@/components/tasks/TasksTable';
import { ToolbarControls } from '@/components/tasks/ToolbarControls';
import type { ViewMode } from '@/components/tasks/ViewToggle';
import { Card } from '@/components/ui/card';

export default function TasksPage() {
	// Tab state
	const [activeTab, setActiveTab] = useState<TabType>('all');
	const [viewMode, setViewMode] = useState<ViewMode>('board');
	const [searchQuery, setSearchQuery] = useState('');

	// Table state
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [showFilterPanel, setShowFilterPanel] = useState(false);

	// Create new task handler (placeholder)
	const handleCreateTask = () => {
		alert('Create new task feature not implemented yet');
	};

	// Filter tasks based on active tab and search query
	const filteredTasks = MOCK_TASKS.filter((task) => {
		// Tab filtering
		if (activeTab === 'active') {
			return task.status === 'Todo' || task.status === 'In Progress';
		}
		if (activeTab === 'backlog') {
			return task.status === 'Todo';
		}
		return true; // 'all' tab
	}).filter((task) => {
		// Search filtering
		if (!searchQuery) return true;
		const query = searchQuery.toLowerCase();
		return (
			task.title.toLowerCase().includes(query) ||
			task.id.toLowerCase().includes(query) ||
			task.assignee.toLowerCase().includes(query)
		);
	});

	return (
		<div className="space-y-4 p-6">
			<h1 className="sr-only">Tasks</h1>

			<Card className="h-[calc(100vh-100px)]">
				<div className="flex h-full flex-col">
					{/* Header with tabs */}
					<TasksHeader
						activeTab={activeTab}
						onCreateTask={handleCreateTask}
						onTabChange={setActiveTab}
					/>

					{/* Toolbar with display options */}
					<ToolbarControls
						onShowFilterPanel={() => setShowFilterPanel(!showFilterPanel)}
						onViewModeChange={setViewMode}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						viewMode={viewMode}
					/>

					{/* Main content area */}
					<div className="flex-grow overflow-hidden">
						{viewMode === 'list' ? (
							<TasksTable
								columnFilters={columnFilters}
								searchQuery={searchQuery}
								setSorting={setSorting}
								sorting={sorting}
								tasks={filteredTasks}
							/>
						) : (
							<KanbanBoard tasks={filteredTasks} />
						)}
					</div>
				</div>
			</Card>
		</div>
	);
}
