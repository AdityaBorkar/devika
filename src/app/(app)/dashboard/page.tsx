import logo from '@/../public/logo.svg';
import CycleSummaryCard from '@/app/(app)/dashboard/_sections/CycleSummaryCard';
import PrdSummaryCard from '@/app/(app)/dashboard/_sections/PrdSummaryCard';

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

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<div className="-mt-[5%] w-[24rem]">
				<img
					src={logo}
					alt="logo"
					className="w-32 rounded-md bg-neutral-800 p-2"
				/>
				<div className="mt-4 mb-12 text-left font-bold text-2xl text-zinc-300">
					Hey {userName}, welcome back!
				</div>

				<div className="space-y-6">
					<div>
						<div className="px-2 py-1 font-semibold text-xs text-zinc-500">
							Ongoing PRD
						</div>
						<PrdSummaryCard version={prdVersion} />
					</div>

					<div>
						<div className="px-2 py-1 font-semibold text-xs text-zinc-500">
							Ongoing Cycle
						</div>
						<CycleSummaryCard cycle={ongoingCycle} />
					</div>

					<div>
						<div className="px-2 py-1 font-semibold text-xs text-zinc-500">
							Next Cycle
						</div>
						<CycleSummaryCard cycle={nextCycle} />
					</div>
				</div>
			</div>
		</div>
	);
}

// <div className="space-y-6">
// 	<LinkCard
// 		to="/prd"
// 		icon={PiFiles}
// 		className="from-purple-900 to-pink-800"
// 	>
// 		PRD
// 	</LinkCard>
// 	<LinkCard
// 		to="/tasks"
// 		icon={PiCheckSquare}
// 		className="from-blue-900 to-cyan-800"
// 	>
// 		Tasks
// 	</LinkCard>
// 	<LinkCard
// 		to="/cycles"
// 		icon={PiPlayCircle}
// 		className="from-green-900 to-emerald-800"
// 	>
// 		Cycles
// 	</LinkCard>
// </div>
// function LinkCard({
// 	to,
// 	children,
// 	className,
// 	icon: Icon,
// }: {
// 	to: string;
// 	icon: React.ElementType;
// 	className?: string;
// 	children: React.ReactNode;
// }) {
// 	return (
// 		<Link
// 			to={to}
// 			className={cn(
// 				'flex h-24 flex-col items-start justify-end gap-2 rounded-md bg-gradient-to-tr px-4 py-3 font-semibold',
// 				'brightness-90 hover:brightness-110',
// 				className,
// 			)}
// 		>
// 			<Icon className="size-6" />
// 			{children}
// 		</Link>
// 	);
// }
