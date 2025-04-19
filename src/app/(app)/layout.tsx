'use client';

import {
	PiChartLine,
	PiCode,
	PiFileDoc,
	PiFolder,
	PiLayout,
	PiListChecks,
	PiRepeatOnce,
} from 'react-icons/pi';
import { Link, Outlet, redirect, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import useConfig from '@/hooks/useConfig';

const NAV_ITEMS = [
	{
		href: 'dashboard',
		icon: PiLayout,
		label: 'Dashboard',
	},
	{
		href: 'prd',
		icon: PiFileDoc,
		label: 'PRD',
	},
	{
		href: 'tasks',
		icon: PiListChecks,
		label: 'Tasks',
	},
	{
		href: 'cycles',
		icon: PiRepeatOnce,
		label: 'Cycles',
	},
	{
		href: 'repository',
		icon: PiFolder,
		label: 'Repository',
	},
	{
		href: 'stats',
		icon: PiChartLine,
		label: 'Stats',
	},
];

export default function AppLayout() {
	const config = useConfig();
	if (!config) redirect('/onboarding');

	const location = useLocation();
	const segment = location.pathname.split('/')[1];

	return (
		<div className="grid h-screen grid-cols-[16rem_auto]">
			<aside className="border-r bg-card px-4 py-2">
				<div className="mb-6 flex items-center gap-2 rounded-lg bg-zinc-200 px-4 py-1.5 font-mono font-semibold text-foreground">
					<PiCode className="size-5" />
					{config.workspace.name}
				</div>

				<nav className="">
					{NAV_ITEMS.map((item) => {
						return (
							<Button
								asChild
								className="!px-4 !py-5 w-full justify-start"
								key={item.href}
								variant={segment === item.href ? 'default' : 'ghost'}
							>
								<Link to={item.href}>
									<item.icon className="size-5" />
									{item.label}
								</Link>
							</Button>
						);
					})}
				</nav>
			</aside>
			<main className="overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
}
