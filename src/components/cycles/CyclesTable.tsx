'use client';

import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import type { Cycle, SortState } from './types';
import { formatDate } from './utils';

interface CyclesTableProps {
	cycles: Cycle[];
	sortState: SortState;
	onSortChange: (column: string) => void;
}

export function CyclesTable({
	cycles,
	sortState,
	onSortChange,
}: CyclesTableProps) {
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Not Started':
				return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
			case 'In Progress':
				return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
			case 'Completed':
				return 'bg-green-100 text-green-800 hover:bg-green-200';
			case 'Cancelled':
				return 'bg-red-100 text-red-800 hover:bg-red-200';
			default:
				return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
		}
	};

	const getSortIcon = (columnName: string) => {
		if (sortState.column !== columnName) {
			return <ArrowUpDown className="ml-2 h-4 w-4" />;
		}
		return sortState.direction === 'asc' ? (
			<ChevronUp className="ml-2 h-4 w-4" />
		) : (
			<ChevronDown className="ml-2 h-4 w-4" />
		);
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							className="cursor-pointer"
							onClick={() => onSortChange('name')}
						>
							<span className="flex items-center">
								Name {getSortIcon('name')}
							</span>
						</TableHead>
						<TableHead
							className="cursor-pointer"
							onClick={() => onSortChange('startDate')}
						>
							<span className="flex items-center">
								Start Date {getSortIcon('startDate')}
							</span>
						</TableHead>
						<TableHead
							className="cursor-pointer"
							onClick={() => onSortChange('endDate')}
						>
							<span className="flex items-center">
								End Date {getSortIcon('endDate')}
							</span>
						</TableHead>
						<TableHead
							className="cursor-pointer"
							onClick={() => onSortChange('status')}
						>
							<span className="flex items-center">
								Status {getSortIcon('status')}
							</span>
						</TableHead>
						<TableHead>Tasks</TableHead>
						<TableHead>Progress</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{cycles.length === 0 ? (
						<TableRow>
							<TableCell className="h-24 text-center" colSpan={6}>
								No cycles found.
							</TableCell>
						</TableRow>
					) : (
						cycles.map((cycle) => (
							<TableRow
								className="cursor-pointer hover:bg-muted/50"
								key={cycle.id}
							>
								<TableCell>
									<Link
										className="text-primary hover:underline"
										to={`/tasks/${cycle.id}`}
									>
										{cycle.name}
									</Link>
								</TableCell>
								<TableCell>{formatDate(cycle.startDate)}</TableCell>
								<TableCell>{formatDate(cycle.endDate)}</TableCell>
								<TableCell>
									<Badge className={getStatusColor(cycle.status)}>
										{cycle.status}
									</Badge>
								</TableCell>
								<TableCell>{cycle.tasks.length}</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<div className="h-2 w-full rounded-full bg-gray-200">
											<div
												className="h-2 rounded-full bg-primary"
												style={{ width: `${cycle.progress.percentComplete}%` }}
											/>
										</div>
										<span className="font-medium text-xs">
											{cycle.progress.percentComplete}%
										</span>
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
