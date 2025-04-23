import CycleSummaryCard from '@/app/(app)/dashboard/_sections/CycleSummaryCard';

export default function DashboardPage() {
	return (
		<div className="space-y-6 p-6">
			<h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>

			<div className="flex flex-row gap-8">
				<CycleSummaryCard />
			</div>

			<div>Updates - Show all while you were not the one who updated</div>

			<div>GitHub Repo & Commits</div>
		</div>
	);
}
