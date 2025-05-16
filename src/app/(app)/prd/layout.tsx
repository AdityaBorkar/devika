import { useAtomValue } from 'jotai';
import { useMemo, useState } from 'react';
import {
	PiCaretDown,
	PiChat,
	PiEye,
	PiFile,
	PiPencilLine,
	PiPlus,
	PiPlusMinus,
	PiTag,
} from 'react-icons/pi';
import { Outlet } from 'react-router';
import ChangesNavigation from '@/app/(app)/prd/_components/nav-changes';
import FilesNavigation from '@/app/(app)/prd/_components/nav-files';
import SearchNavigation from '@/app/(app)/prd/_components/nav-search';
import { PrdScreenStateAtom } from '@/app/(app)/prd/store';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const TABS = [
	{
		label: 'Chats',
		icon: PiChat,
		segment: 'search',
		navigation: SearchNavigation,
	},
	{
		label: 'Files',
		icon: PiFile,
		segment: 'files',
		navigation: FilesNavigation,
	},
	{
		label: 'Changes',
		icon: PiPlusMinus,
		segment: 'changes',
		navigation: ChangesNavigation,
	},
];

export default function PrdLayout() {
	const { version } = useAtomValue(PrdScreenStateAtom);
	const [TabSegment, setTabSegment] = useState('files');
	const Navigation = useMemo(
		() => TABS.find((tab) => tab.segment === TabSegment)?.navigation,
		[TabSegment],
	);

	return (
		<div className="grid h-full w-full grid-cols-[18rem_1fr]">
			<aside className="border-border border-r ">
				<div className="border-border border-b">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="flex w-full flex-row items-center gap-2 px-4 pt-2 pb-1.5 font-medium text-zinc-400 hover:bg-zinc-800">
								<PiTag />
								{version.name}
								<span className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
									12.x.x
								</span>
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

				<div className="mx-4 my-2 grid grid-cols-3 gap-1 rounded-md border border-border bg-zinc-800 p-0.5 font-medium text-xs tracking-tight">
					{TABS.map((tab) => (
						<button
							key={tab.segment}
							type="button"
							className={cn(
								'select-none rounded-md px-1 py-1.5 text-center',
								tab.segment === TabSegment
									? 'bg-zinc-950'
									: 'hover:bg-zinc-900',
							)}
							onClick={() => setTabSegment(tab.segment)}
						>
							<tab.icon className="-mt-1 mr-1 inline-block size-4 w-auto" />
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
