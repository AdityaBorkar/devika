'use client';

import { useState } from 'react';
import type {
	Cycle,
	CycleStatus,
	FilterState,
	SortState,
} from '@/components/cycles';
import {
	CreateCycleDialog,
	CyclesTable,
	filterCyclesByStatus,
	MOCK_CYCLES,
	sortCycles,
} from '@/components/cycles';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function CyclesPage() {
	const [filterState, setFilterState] = useState<FilterState>({
		status: 'All',
	});
	const [sortState, setSortState] = useState<SortState>({
		column: 'endDate',
		direction: 'asc',
	});

	// Filter and sort cycles
	const filteredCycles = filterCyclesByStatus(MOCK_CYCLES, filterState.status);
	const sortedAndFilteredCycles = sortCycles(filteredCycles, sortState);

	const handleFilterChange = (status: CycleStatus | 'All') => {
		setFilterState({ status });
	};

	const handleSortChange = (column: string) => {
		setSortState((prev) => ({
			column,
			direction:
				prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
		}));
	};

	const handleCreateCycle = (data: {
		name: string;
		description: string;
		startDate: string;
		endDate: string;
	}) => {
		// In a real app, we would make an API call here
		console.log('Creating new cycle:', data);
		// Then refresh the data
	};

	return (
		<div className="container mx-auto py-6">
			<div className="space-y-6 p-6">
				<div className="flex items-center justify-between">
					{/* Views */}
					<CreateCycleDialog onCycleCreate={handleCreateCycle} />
				</div>

				<div className="flex items-center gap-4">
					{/* Implement Search, Filters, Sort */}
					<div className="flex items-center gap-2">
						<span className="font-medium text-sm">Status:</span>
						<Select
							value={filterState.status}
							onValueChange={(value: string) =>
								handleFilterChange(value as CycleStatus | 'All')
							}
						>
							<SelectTrigger className="w-[150px]">
								<SelectValue placeholder="Select a status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="All">All</SelectItem>
								<SelectItem value="Not Started">Not Started</SelectItem>
								<SelectItem value="In Progress">In Progress</SelectItem>
								<SelectItem value="Completed">Completed</SelectItem>
								<SelectItem value="Cancelled">Cancelled</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="ml-auto text-muted-foreground text-sm">
						Showing {filteredCycles.length} of {MOCK_CYCLES.length} cycles
					</div>
				</div>

				<CyclesTable
					cycles={sortedAndFilteredCycles}
					sortState={sortState}
					onSortChange={handleSortChange}
				/>
			</div>
		</div>
	);
}
