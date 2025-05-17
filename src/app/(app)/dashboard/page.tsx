import logo from '@/../public/logo.svg';
import { CycleCard } from '@/app/(app)/dashboard/_sections/CycleCard';
import { DeploymentCard } from '@/app/(app)/dashboard/_sections/DeploymentCard';
import { PrdCard } from '@/app/(app)/dashboard/_sections/PrdSummaryCard';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
	const userName = 'Aditya';
	const ongoingCycle = {
		status: 'live',
		running: false,
		name: 'Implement Notifications',
		prd: {
			ongoing: false,
			name: 'PRD Name',
		},
	};
	const nextCycle = {
		status: 'draft',
		running: false,
		name: 'Implement Light Theme',
		prd: {
			ongoing: false,
			name: 'PRD Name',
		},
	};
	const prdVersion = {
		status: 'live',
		name: 'Improve Developer Experience',
		version: '3.x.x',
	};
	const ProductionVersion = {
		status: 'live',
		version: '3.10.2',
	};

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<div className="-mt-[5%] grid w-[44rem] grid-cols-2 gap-x-16">
				<div className="col-span-2 mb-12">
					<img
						src={logo}
						alt="logo"
						className="w-32 rounded-md bg-zinc-800 p-2"
					/>
					<div className="mt-4 text-left font-bold text-2xl text-zinc-300">
						Hey {userName}, welcome back!
					</div>
				</div>

				<div className="space-y-6">
					<Card title="Production Deployment">
						<DeploymentCard version={ProductionVersion} />
					</Card>

					<Card title="Ongoing PRD">
						<PrdCard version={prdVersion} />
					</Card>

					<Card title="Ongoing Cycle">
						<CycleCard cycle={ongoingCycle} />
					</Card>

					<Card title="Next Cycle">
						<CycleCard cycle={nextCycle} />
					</Card>
				</div>
				<Card title="Notifications">
					<div
						className={cn(
							'rounded-md border border-border bg-zinc-800/50',
							'flex min-h-16 items-center justify-center',
						)}
					>
						<div className="text-zinc-400">
							Everything's calm (before `git push`)
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}

function Card({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div>
			<div className="px-2 py-1 font-semibold text-xs text-zinc-500">
				{title}
			</div>
			{children}
		</div>
	);
}
