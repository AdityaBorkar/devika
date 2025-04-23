import { useAtomValue } from 'jotai';
import { PiCaretDown } from 'react-icons/pi';
import { Link, Outlet, useLocation } from 'react-router';
import PRDExplorerNavigation from '@/app/(app)/prd/explorer/navigation';
import PRDSearchNavigation from '@/app/(app)/prd/search/navigation';
import { PrdScreenStateAtom } from '@/app/(app)/prd/store';
import PRDVersioningNavigation from '@/app/(app)/prd/versioning/navigation';
import { cn } from '@/lib/utils';

const TABS = [
	{
		label: 'Search',
		segment: 'search',
		navigation: PRDSearchNavigation,
	},
	{
		label: 'Explorer',
		segment: 'explorer',
		navigation: PRDExplorerNavigation,
	},
	{
		label: 'Versioning',
		segment: 'versioning',
		navigation: PRDVersioningNavigation,
	},
];

export default function PRDLayout() {
	const { versioning } = useAtomValue(PrdScreenStateAtom);

	const location = useLocation();
	const segment = location.pathname.split('/')[2];

	const Navigation = TABS.find((tab) => tab.segment === segment)?.navigation;
	if (!Navigation) throw new Error(`Navigation for ${segment} not found`);

	return (
		<div className="grid h-full grid-cols-[18rem_1fr]">
			<aside className="border-border border-r px-2">
				<div className="my-1 flex flex-row items-center justify-between rounded-md border border-border px-3 py-1.5 font-medium">
					{versioning.name}
					<PiCaretDown />
				</div>

				<div className="mt-2 grid grid-cols-3 gap-1 rounded-md border border-border bg-zinc-200 p-0.5 font-medium text-xs tracking-tight">
					{TABS.map((tab) => (
						<Link
							key={tab.segment}
							to={`/prd/${tab.segment}`}
							className={cn(
								'rounded-md px-3 py-1 text-center',
								tab.segment === segment ? 'bg-zinc-50' : 'hover:bg-zinc-100',
							)}
						>
							{tab.label}
						</Link>
					))}
				</div>

				{Navigation && <Navigation />}
			</aside>
			<Outlet />
		</div>
	);
}
