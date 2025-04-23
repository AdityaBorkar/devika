'use client';

import {
	PiArrowUpRight,
	PiBookOpen,
	PiCaretDown,
	PiChartLine,
	PiCode,
	PiFileDoc,
	PiFolder,
	PiGear,
	PiLayout,
	PiListChecks,
	PiNotepad,
	PiQuestion,
	PiRepeatOnce,
	PiRobot,
} from 'react-icons/pi';
import { Link, Outlet, redirect, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
		href: 'agents',
		icon: PiRobot,
		label: 'Agents',
	},
	{
		href: 'memory',
		icon: PiNotepad,
		label: 'Memory',
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
			<aside className="relative bg-card px-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="mt-3 mb-6 w-full justify-between border border-border bg-accent px-4 py-1.5 font-semibold hover:bg-accent/80"
						>
							<div className="flex items-center gap-2">
								<div className="rounded-full bg-background px-1.5 py-1">
									<PiCode className="size-4" />
								</div>
								{config.workspace.name}
							</div>
							<PiCaretDown className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="w-[14rem]">
						<DropdownMenuItem>
							<Link
								to="/settings/workspace"
								className="flex items-center gap-2"
							>
								<PiGear className="size-4" />
								Workspace Settings
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								to="https://devika.adityab.tech/docs"
								className="flex w-full justify-between"
							>
								<div className="flex items-center gap-2">
									<PiBookOpen className="size-4" />
									Documentation
								</div>
								<PiArrowUpRight className="size-4" />
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								to="https://devika.adityab.tech/support"
								className="flex w-full justify-between"
							>
								<div className="flex items-center gap-2">
									<PiQuestion className="size-4" />
									Support
								</div>
								<PiArrowUpRight className="size-4" />
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<nav>
					{NAV_ITEMS.map((item) => {
						return (
							<Button
								asChild
								className="!justify-start !px-4 !py-5 w-full"
								key={item.href}
								variant={segment === item.href ? 'secondary' : 'ghost'}
							>
								<Link to={item.href}>
									<item.icon className="size-5" />
									{item.label}
								</Link>
							</Button>
						);
					})}
				</nav>

				<div className="absolute right-4 bottom-2 left-4 rounded-lg border border-border px-4 py-2 text-center text-sm shadow-sm tracking-tighter">
					Coming Soon: Teams & Cloud
				</div>
			</aside>
			<main className="mx-2 my-2 overflow-y-auto rounded-md border border-border shadow-md">
				<Outlet />
			</main>
		</div>
	);
}
