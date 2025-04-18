'use client';

import { CycleCard } from '@/components/cycles/CycleCard';
import { CycleDetailPanel } from '@/components/cycles/CycleDetailPanel';
import { CyclesHeader } from '@/components/cycles/CyclesHeader';
import { MOCK_CYCLES } from '@/components/cycles/mock-data';
import type {
	CycleStatus,
	FilterState,
	SortState,
} from '@/components/cycles/types';
import { filterCyclesByStatus, sortCycles } from '@/components/cycles/utils';

export function CyclesClient() {
	const [selectedCycleId, setSelectedCycleId] = useState<string | null>(null);
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

	const selectedCycle = MOCK_CYCLES.find(
		(cycle) => cycle.id === selectedCycleId,
	);

	// Prepare data for the status distribution chart
	const statusCounts = MOCK_CYCLES.reduce(
		(acc, cycle) => {
			acc[cycle.status] = (acc[cycle.status] || 0) + 1;
			return acc;
		},
		{} as Record<CycleStatus, number>,
	);

	const statusChartData = Object.entries(statusCounts).map(
		([status, count]) => ({
			name: status,
			value: count,
		}),
	);

	const STATUS_COLORS = {
		Completed: '#10b981',
		'In Progress': '#3b82f6',
		'Not Started': '#6b7280',
		Cancelled: '#ef4444',
	};

	return (
		<div className="h-full">
			{selectedCycle ? (
				<CycleDetailPanel
					cycle={selectedCycle}
					onClose={() => setSelectedCycleId(null)}
				/>
			) : (
				<div className="space-y-6 p-6">
					<CyclesHeader
						totalCycles={MOCK_CYCLES.length}
						filteredCycles={filteredCycles.length}
						filterState={filterState}
						sortState={sortState}
						onFilterChange={handleFilterChange}
						onSortChange={handleSortChange}
						onCreateCycle={() => {}}
					/>

					<div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
						{/* Main cycles grid */}
						<div className="space-y-4 lg:col-span-3">
							<h2 className="font-medium text-lg">
								Cycles ({filteredCycles.length})
							</h2>

							{sortedAndFilteredCycles.length > 0 ? (
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
									{sortedAndFilteredCycles.map((cycle) => (
										<CycleCard
											key={cycle.id}
											cycle={cycle}
											onSelect={setSelectedCycleId}
										/>
									))}
								</div>
							) : (
								<div className="rounded-lg border bg-gray-50 py-12 text-center">
									<h3 className="font-medium text-gray-800 text-lg">
										No cycles found
									</h3>
									<p className="mt-2 text-gray-500">
										Try changing your filters or create a new cycle
									</p>
								</div>
							)}
						</div>

						{/* Status distribution chart */}
						<div className="rounded-lg border p-4 lg:col-span-1">
							<h2 className="mb-3 font-medium text-lg">Status Distribution</h2>

							<div className="h-64">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={statusChartData}
											cx="50%"
											cy="50%"
											innerRadius={60}
											outerRadius={80}
											paddingAngle={5}
											dataKey="value"
											label={({ name, percent }) =>
												`${name} (${(percent * 100).toFixed(0)}%)`
											}
										>
											{statusChartData.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={
														STATUS_COLORS[
															entry.name as keyof typeof STATUS_COLORS
														]
													}
												/>
											))}
										</Pie>
										<Tooltip
											formatter={(value) => [
												`${value} Cycle${value !== 1 ? 's' : ''}`,
												'Count',
											]}
										/>
										<Legend verticalAlign="bottom" height={36} />
									</PieChart>
								</ResponsiveContainer>
							</div>

							{/* Quick stats */}
							<div className="mt-4 grid grid-cols-2 gap-2">
								<div className="rounded-md bg-blue-50 p-2 text-center">
									<div className="font-bold text-2xl text-blue-700">
										{
											MOCK_CYCLES.filter((c) => c.status === 'In Progress')
												.length
										}
									</div>
									<div className="text-blue-700 text-xs">In Progress</div>
								</div>
								<div className="rounded-md bg-green-50 p-2 text-center">
									<div className="font-bold text-2xl text-green-700">
										{MOCK_CYCLES.filter((c) => c.status === 'Completed').length}
									</div>
									<div className="text-green-700 text-xs">Completed</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
