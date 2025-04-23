export default function CycleSummaryCard() {
	return (
		<div className="w-fit rounded-xl border border-border px-6 py-4 text-sm">
			<div className="font-medium text-base">
				<div className="-mb-0.5 relative mx-2 inline-block size-4 animate-pulse rounded-full bg-green-600" />
				Cycle: Name
			</div>
			<div className="rounded-lg border border-border px-2 py-1 text-sm">
				Project Version - 1.0.0
			</div>
			<div>PIE CHART</div>
			<div className="min-w-32 rounded-lg border border-border px-2 py-1 text-sm">
				<div className="font-semibold">Tasks</div>
				<div>Total: 10</div>
				<div>In Progress: 1</div>
				<div>Completed: 8</div>
			</div>

			<div>Resume Work</div>
		</div>
	);
}
