import { motion } from 'motion/react';
import logo from '@/../public/logo.svg';
import { CycleCard } from '@/app/(workspace)/dashboard/components/CycleCard';
import { DeploymentCard } from '@/app/(workspace)/dashboard/components/DeploymentCard';
import { PrdCard } from '@/app/(workspace)/dashboard/components/PrdSummaryCard';
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
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.2 }}
					className="col-span-2 mb-12"
				>
					<img
						src={logo}
						alt="logo"
						className="w-32 rounded-md bg-bg-secondary p-2"
					/>
					<div className="mt-4 text-left font-bold text-2xl text-text-secondary">
						Hey {userName}, welcome back!
					</div>
				</motion.div>

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
							'rounded-md border border-border bg-bg-secondary/50',
							'flex min-h-16 items-center justify-center',
						)}
					>
						<div className="text-text-tertiary">
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
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2 }}
		>
			<div className="px-2 py-1 font-semibold text-text-muted text-xs">
				{title}
			</div>
			{children}
		</motion.div>
	);
}
