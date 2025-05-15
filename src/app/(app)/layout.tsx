import {
	PiChartPie,
	PiCheckCircleDuotone,
	PiCheckSquare,
	PiFiles,
	PiGear,
	PiHouse,
	PiPlayCircle,
} from 'react-icons/pi';
import { Link, Outlet, redirect, useLocation } from 'react-router';
import useConfig from '@/hooks/useConfig';
import { cn } from '@/lib/utils';

const NAV_ITEMS_TOP = [
	{ href: 'dashboard', icon: PiHouse, label: 'Dashboard' },
	{ href: 'prd', icon: PiFiles, label: 'PRD' },
	{ href: 'tasks', icon: PiCheckSquare, label: 'Tasks' },
	{ href: 'cycles', icon: PiPlayCircle, label: 'Cycles' },
];

const NAV_ITEMS_BOTTOM = [
	{ href: 'stats', icon: PiChartPie, label: 'Stats' },
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
						'my-1 w-full select-none rounded border border-transparent py-2 text-sm text-zinc-500',
						'hover:border-border hover:bg-zinc-900 hover:text-zinc-300',
					)}
				>
					<PiCheckCircleDuotone className="mx-auto size-5 text-green-600 " />
				</div>
			</nav>
			<main className="my-2 mr-2 overflow-y-auto rounded-md border border-border bg-zinc-900 shadow-md">
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
	return (
		<Link
			to={item.href}
			className={cn(
				'my-1 w-full select-none rounded border border-transparent py-2 text-sm text-zinc-500',
				isActive
					? 'border-border bg-zinc-800 text-zinc-100'
					: 'hover:border-border hover:bg-zinc-900 hover:text-zinc-300',
			)}
		>
			<item.icon className="mx-auto size-5 stroke-3" />
		</Link>
	);
}
