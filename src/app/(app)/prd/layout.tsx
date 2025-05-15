import { useMemo, useState } from 'react';
import { PiChat, PiFile, PiPlusMinus } from 'react-icons/pi';
import { Outlet } from 'react-router';
import ChangesNavigation from '@/app/(app)/prd/_components/nav-changes';
import FilesNavigation from '@/app/(app)/prd/_components/nav-files';
import SearchNavigation from '@/app/(app)/prd/_components/nav-search';
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
	// const { version } = useAtomValue(PrdScreenStateAtom);
	const [TabSegment, setTabSegment] = useState('files');
	const Navigation = useMemo(
		() => TABS.find((tab) => tab.segment === TabSegment)?.navigation,
		[TabSegment],
	);

	return (
		<div className="grid h-full w-full grid-cols-[18rem_1fr]">
			<aside className="border-border border-r px-2">
				<div className="my-1.5 grid grid-cols-3 gap-1 rounded-md border border-border bg-zinc-800 p-0.5 font-medium text-xs tracking-tight">
					{TABS.map((tab) => (
						<button
							key={tab.segment}
							type="button"
							className={cn(
								'select-none rounded-md px-1 py-1 text-center',
								tab.segment === TabSegment
									? 'bg-zinc-950'
									: 'hover:bg-zinc-900',
							)}
							onClick={() => setTabSegment(tab.segment)}
						>
							<tab.icon className="-mt-0.5 mr-1 inline-block w-4" />
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

// {/* <div className="my-1 flex flex-row gap-1">
// 	<DropdownMenu>
// 		<DropdownMenuTrigger asChild>
// 			<div className="flex grow flex-row items-center justify-between rounded-md border border-border bg-zinc-800 px-3 py-1.5 font-medium">
// 				{version.name}
// 				<PiCaretDown />
// 			</div>
// 		</DropdownMenuTrigger>
// 		<DropdownMenuContent className="w-full">
// 			<DropdownMenuItem>
// 				<PiPencilLine className="mr-2" />
// 				Rename Version
// 			</DropdownMenuItem>
// 			<DropdownMenuItem>
// 				<PiPlus className="mr-2" />
// 				Create New Version
// 			</DropdownMenuItem>
// 			<DropdownMenuItem>
// 				<PiEye className="mr-2" />
// 				View All Versions
// 			</DropdownMenuItem>
// 		</DropdownMenuContent>
// 	</DropdownMenu>
// </div> */}
