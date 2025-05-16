import { PiFile, PiX } from 'react-icons/pi';
import { ChatUI } from '@/app/(app)/prd/[pageId]/ChatUI';
import { EditorUI } from '@/app/(app)/prd/[pageId]/EditorUI';
import { cn } from '@/lib/utils';

export function SplitScreen({
	tabs,
	activeTabId,
	setActiveTabId,
}: {
	tabs: any[];
	activeTabId: string;
	setActiveTabId: (tabId: string) => void;
}) {
	const tab = tabs.find((tab) => tab.id === activeTabId);
	if (!tab) throw new Error(`Tab ${activeTabId} not found`);

	// TODO: Manage Tabs and Active Tab

	// Context Menu:
	// Split Left
	// Split Right
	// Open in New Tab
	// Export
	// Share
	// Close
	// Delete

	return (
		<div className="flex h-full w-full flex-col">
			<nav className="flex flex-row items-center gap-0.5 border-border border-b p-1">
				<div className="flex flex-row items-center gap-0.5">
					{tabs.map((tab) => (
						<button
							type="button"
							key={tab.id}
							className={cn(
								'group relative block rounded-md border border-transparent px-2 py-1.5 font-medium text-xs text-zinc-400',
								tab.id === activeTabId
									? [
											'border-border bg-zinc-800 text-zinc-100',
											'after:-bottom-1.5 after:absolute after:right-0 after:w-full after:border-zinc-400 after:border-b',
										]
									: 'hover:bg-zinc-800',
							)}
							onClick={() => setActiveTabId(tab.id)}
						>
							<PiFile className="-mt-0.5 mr-1 inline-block size-4" />
							{tab.name}
							<PiX className="-mt-0.5 ml-1 inline-block w-4 stroke-3 opacity-0 group-hover:opacity-100" />
						</button>
					))}
				</div>
			</nav>
			<div className="relative grow overflow-auto px-8 py-8 ">
				{tab.type === 'doc' ? <EditorUI /> : <ChatUI />}
			</div>
		</div>
	);
}
