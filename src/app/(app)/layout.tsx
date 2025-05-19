import {
	PiChartBar,
	PiChartPie,
	PiChartPieSlice,
	PiCheckCircleDuotone,
	PiCheckSquare,
	PiClockCounterClockwise,
	PiCode,
	PiFiles,
	PiGear,
	PiHeartbeat,
	PiHouse,
	PiLightbulbFilament,
	PiPlayCircle,
	PiRocketLaunch,
} from 'react-icons/pi';
import { Link, Outlet, redirect, useLocation } from 'react-router';
import useConfig from '@/hooks/useConfig';
import { cn } from '@/lib/utils';

const NAV_ITEMS_TOP = [
	{ href: 'dashboard', icon: PiHouse, label: 'Dashboard' },
	{ href: 'prd', icon: PiLightbulbFilament, label: 'PRD' },
	{ href: 'tasks', icon: PiCheckSquare, label: 'Tasks' },
	{ href: 'cycles', icon: PiPlayCircle, label: 'Cycles' },
	{ href: 'workspace', icon: PiCode, label: 'Workspace' },
	{ href: 'versions', icon: PiClockCounterClockwise, label: 'Versions' },
	{ href: 'deployments', icon: PiRocketLaunch, label: 'Deployments' },
];

const NAV_ITEMS_BOTTOM = [
	{ href: 'stats', icon: PiChartPieSlice, label: 'Stats' },
	{ href: 'settings', icon: PiGear, label: 'Settings' },
];

export default function AppLayout() {
	const config = useConfig();
	if (!config) redirect('/onboarding');

	const location = useLocation();
	const segment = location.pathname.split('/')[1];

	return (
		<div className="grid h-screen grid-cols-[3.5rem_auto]">
			<nav className="relative flex flex-col px-1.5 py-1">
				{NAV_ITEMS_TOP.map((item) => (
					<NavItem
						key={item.href}
						item={item}
						isActive={segment === item.href}
					/>
				))}
				<div className="grow" />
				{NAV_ITEMS_BOTTOM.map((item) => (
					<NavItem
						key={item.href}
						item={item}
						isActive={segment === item.href}
					/>
				))}
				<div
					// TODO: Open Dialog and Show Connection between IDE, Cloud, Integrations and Chrome Extension
					className={cn(
						'relative my-1 w-fit select-none rounded-md border border-transparent px-2 py-2 text-sm text-text-tertiary',
						'hover:border-border hover:bg-bg-secondary hover:text-text-secondary',
					)}
				>
					<PiCheckCircleDuotone className="mx-auto size-5 text-green-600 " />
				</div>
			</nav>
			<main className="my-2 mr-2 overflow-y-auto rounded-md border border-border bg-bg-primary shadow-md">
				<Outlet />
			</main>
		</div>
	);
}

function NavItem({
	item,
	isActive,
}: {
	item: (typeof NAV_ITEMS_TOP)[number];
	isActive: boolean;
}) {
	const cue = null;
	return (
		<Link
			to={item.href}
			className={cn(
				'group relative my-1 w-fit select-none rounded-md border border-transparent px-2 py-2 text-sm text-text-muted',
				isActive
					? 'border-border bg-bg-secondary text-text-primary'
					: 'hover:border-border hover:bg-bg-secondary/80 hover:text-text-primary/80',
			)}
		>
			{cue && (
				<div
					className={cn(
						'absolute top-1.75 right-1.5 size-2 rounded-full',
						cue === 'error' && 'bg-rose-500/80',
						cue === 'warning' && 'bg-amber-500/80',
						cue === 'info' && 'bg-sky-500/80',
						cue === 'muted' && 'bg-stone-300/80',
					)}
				/>
			)}
			<item.icon className="mx-auto size-5 stroke-3" />
			<div className="invisible absolute top-1.5 left-11 rounded bg-text-tertiary px-2 py-1 font-semibold text-bg-primary text-xs group-hover:visible group-focus-visible:visible">
				{item.label}
			</div>
		</Link>
	);
}
