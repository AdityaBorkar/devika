'use client';

import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import type { CycleStatus, FilterState, TabType } from '@/components/cycles';
import {
	CreateCycleDialog,
	CyclesHeader,
	CyclesToolbar,
	EnhancedCyclesTable,
	MOCK_CYCLES,
} from '@/components/cycles';
import { Card, CardContent } from '@/components/ui/card';

export default function CyclesPage() {
	// Tab state
	const [activeTab, setActiveTab] = useState<TabType>('all');
	const [searchQuery, setSearchQuery] = useState('');
	const [showFilterPanel, setShowFilterPanel] = useState(false);

	// Table state
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [filterState, setFilterState] = useState<FilterState>({
		status: 'All',
	});

	// Update column filters when status filter changes
	useEffect(() => {
		if (filterState.status !== 'All') {
			setColumnFilters((prev) => {
				// Remove any existing status filter
				const filtered = prev.filter((filter) => filter.id !== 'status');
				// Add the new status filter
				return [...filtered, { id: 'status', value: filterState.status }];
			});
		} else {
			// Remove status filter if 'All' is selected
			setColumnFilters((prev) =>
				prev.filter((filter) => filter.id !== 'status'),
			);
		}
	}, [filterState.status]);

	// Create new cycle handler
	const handleCreateCycle = () => {
		// TODO: Implement create cycle functionality
		alert('Create new cycle feature not implemented yet');
	};

	// Save view handler
	const handleSaveView = () => {
		alert('Save view feature not implemented yet');
	};

	// Filter handler
	const handleFilterChange = (status: CycleStatus | 'All') => {
		setFilterState({ status });
	};

	// Filter cycles based on active tab
	const filteredByTabCycles = MOCK_CYCLES.filter((cycle) => {
		// Tab filtering
		if (activeTab === 'current') {
			return cycle.status === 'In Progress';
		}
		if (activeTab === 'upcoming') {
			return cycle.status === 'Not Started';
		}
		if (activeTab === 'completed') {
			return cycle.status === 'Completed';
		}
		return true; // 'all' tab
	});

	return (
		<div className="min-h-screen bg-zinc-50/50 p-6 dark:bg-zinc-950">
			<h1 className="sr-only">Cycles</h1>

			<Card className="h-[calc(100vh-100px)] overflow-hidden rounded-xl border-zinc-200/80 shadow-sm dark:border-zinc-800/80">
				<div className="flex h-full flex-col bg-white dark:bg-zinc-900">
					{/* Header with tabs */}
					<CyclesHeader
						activeTab={activeTab}
						onCreateCycle={handleCreateCycle}
						onTabChange={setActiveTab}
					/>

					{/* Toolbar with search and filters */}
					<CyclesToolbar
						currentStatus={filterState.status}
						onSaveView={handleSaveView}
						onShowFilterPanel={() => setShowFilterPanel(!showFilterPanel)}
						onStatusChange={handleFilterChange}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>

					{/* Main content area */}
					<div className="flex-grow overflow-hidden">
						<EnhancedCyclesTable
							columnFilters={columnFilters}
							cycles={filteredByTabCycles}
							searchQuery={searchQuery}
							setSorting={setSorting}
							sorting={sorting}
						/>
					</div>
				</div>
			</Card>
		</div>
	);
}
