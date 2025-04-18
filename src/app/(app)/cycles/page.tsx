'use client';

import { Suspense, useState } from 'react';
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';
import { Card } from '@/components/ui/card';

export default function CyclesPage() {
	return (
		<div className="space-y-4 p-6">
			<h1 className="font-bold text-2xl">Cycles</h1>

			<Card className="h-[calc(100vh-100px)]">
				<Suspense
					fallback={<div className="p-8 text-center">Loading cycles...</div>}
				>
					{/* <CyclesClient /> */}
				</Suspense>
			</Card>
		</div>
	);
}
