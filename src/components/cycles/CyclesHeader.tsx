'use client';

import { ArrowDownIcon, ArrowUpIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { CycleStatus, FilterState, SortState } from './types';

interface CyclesHeaderProps {
	totalCycles: number;
	filteredCycles: number;
	filterState: FilterState;
	sortState: SortState;
	onFilterChange: (status: CycleStatus | 'All') => void;
	onSortChange: (column: string) => void;
	onCreateCycle: () => void;
}

export function CyclesHeader({
	totalCycles,
	filteredCycles,
	filterState,
	sortState,
	onFilterChange,
	onSortChange,
	onCreateCycle,
}: CyclesHeaderProps) {
	const statusOptions: Array<{ value: CycleStatus | 'All'; label: string }> = [
		{ value: 'All', label: 'All Statuses' },
		{ value: 'Not Started', label: 'Not Started' },
		{ value: 'In Progress', label: 'In Progress' },
		{ value: 'Completed', label: 'Completed' },
		{ value: 'Cancelled', label: 'Cancelled' },
	];

	const sortOptions = [
		{ value: 'name', label: 'Name' },
		{ value: 'startDate', label: 'Start Date' },
		{ value: 'endDate', label: 'End Date' },
		{ value: 'status', label: 'Status' },
		{ value: 'progress', label: 'Progress' },
	];

	return (
		<div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
			<div>
				<h1 className="font-semibold text-2xl">Cycles / Sprints</h1>
				<p className="text-gray-500 text-sm">
					Showing {filteredCycles} of {totalCycles} cycles
				</p>
			</div>

			<div className="flex items-center space-x-2">
				<div className="flex items-center space-x-2">
					<Select
						value={filterState.status}
						onValueChange={(value) =>
							onFilterChange(value as CycleStatus | 'All')
						}
					>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							{statusOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select
						value={sortState.column}
						onValueChange={(value) => onSortChange(value)}
					>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							{sortOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Button
						variant="ghost"
						size="icon"
						onClick={() => onSortChange(sortState.column)}
						className="h-9 w-9"
					>
						{sortState.direction === 'asc' ? (
							<ArrowUpIcon className="h-4 w-4" />
						) : (
							<ArrowDownIcon className="h-4 w-4" />
						)}
					</Button>
				</div>

				<Button onClick={onCreateCycle}>
					<PlusIcon className="mr-2 h-4 w-4" />
					New Cycle
				</Button>
			</div>
		</div>
	);
}
