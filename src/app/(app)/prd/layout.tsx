import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { PiCaretDown, PiEye, PiPencilLine, PiPlus } from 'react-icons/pi';
import { Outlet, useLocation } from 'react-router';
import ChangesNavigation from '@/app/(app)/prd/_components/nav-changes';
import FilesNavigation from '@/app/(app)/prd/_components/nav-files';
import SearchNavigation from '@/app/(app)/prd/_components/nav-search';
import { PrdScreenStateAtom } from '@/app/(app)/prd/store';
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const TABS = [
	{ label: 'Search', segment: 'search', navigation: SearchNavigation },
	{ label: 'Files', segment: 'files', navigation: FilesNavigation },
	{ label: 'Changes', segment: 'changes', navigation: ChangesNavigation },
];

// 1. do all todos
// 2. plan the auto-suggestions and prd-ai generation
// 2. plan the review cycle
// 3. plan the versioning cycling

export default function PrdLayout() {
	const { version } = useAtomValue(PrdScreenStateAtom);

	const location = useLocation();
	const segment = location.pathname.split('/')[2];
	const [TabSegment, setTabSegment] = useState(segment || 'files');

	const Navigation = TABS.find((tab) => tab.segment === TabSegment)?.navigation;
	if (TabSegment && !Navigation)
		throw new Error(`Navigation for ${TabSegment} not found`);

	return (
		<div className="grid h-full grid-cols-[18rem_1fr]">
			<aside className="border-border border-r px-2">
				<div className="my-1 flex flex-row gap-1">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="flex grow flex-row items-center justify-between rounded-md border border-border px-3 py-1.5 font-medium">
								{version.name}
								<PiCaretDown />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-full">
							<DropdownMenuItem>
								<PiPencilLine className="mr-2" />
								Rename Version
							</DropdownMenuItem>
							<DropdownMenuItem>
								<PiPlus className="mr-2" />
								Create New Version
							</DropdownMenuItem>
							<DropdownMenuItem>
								<PiEye className="mr-2" />
								View All Versions
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="mt-2 grid grid-cols-3 gap-1 rounded-md border border-border bg-zinc-200 p-0.5 font-medium text-xs tracking-tight">
					{TABS.map((tab) => (
						<button
							key={tab.segment}
							type="button"
							className={cn(
								'rounded-md px-3 py-1 text-center',
								tab.segment === TabSegment ? 'bg-zinc-50' : 'hover:bg-zinc-100',
							)}
							onClick={() => setTabSegment(tab.segment)}
						>
							{tab.label}
						</button>
					))}
				</div>

				{Navigation && <Navigation />}
			</aside>
			<Outlet />
		</div>
	);
}
