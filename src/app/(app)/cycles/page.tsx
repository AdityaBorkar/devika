'use client';

import { useAtomValue } from 'jotai';
import { useQueryState } from 'nuqs';
import { useState } from 'react';
import type { CycleStatus, FilterState, SortState } from '@/components/cycles';
import {
	CreateCycleDialog,
	CyclesTable,
	filterCyclesByStatus,
	MOCK_CYCLES,
	sortCycles,
} from '@/components/cycles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CycleAtom } from '@/lib/stores/app';

export default function CyclesPage() {
	const VIEWS = useAtomValue(CycleAtom.Views);
	const [viewId, setViewId] = useQueryState('view', {
		defaultValue: VIEWS[0].id,
	});

	const view = VIEWS.find((v) => v.id === viewId);
	if (!view) throw new Error('View not found');

	const [filterState, setFilterState] = useState<FilterState>(view.filters[0]);
	const [sortState, setSortState] = useState<SortState>(view.sort);
	const [search, setSearch] = useQueryState('search', { defaultValue: '' });

	// TODO: FETCH DATA
	const filteredCycles = filterCyclesByStatus(MOCK_CYCLES, filterState.status);
	const sortedAndFilteredCycles = sortCycles(filteredCycles, sortState);

	// TODO: Make a component of Table Handlers:
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

	return (
		<div className="flex h-screen flex-col gap-2 p-4">
			<div className="flex items-center gap-4">
				{/* Views */}
				<div>View 1</div>
				<div>View 2</div>
				<div>View 3</div>
				{/* <CreateCycleDialog /> */}
			</div>

			<div className="flex gap-4">
				<Input className="grow" placeholder="Filters" />
				<Button variant="outline">Save View</Button>
				<Button variant="outline">Display</Button>
			</div>

			<div className="flex items-center justify-between">
				<Input className="max-w-72" placeholder="Search" />
				<div className="ml-auto text-muted-foreground text-sm">
					Showing {filteredCycles.length} of {MOCK_CYCLES.length} cycles
				</div>
			</div>

			<div className="grow">
				<CyclesTable
					cycles={sortedAndFilteredCycles}
					onSortChange={handleSortChange}
					sortState={sortState}
				/>
			</div>
		</div>
	);
}
