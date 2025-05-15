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

	// Context Menu:
	// Split Left
	// Split Right
	// Open in New Tab
	// Export
	// Share
	// Close
	// Delete
	return (
		<div className="w-full">
			<nav className="flex flex-row items-center gap-0.5 border-border border-b p-1">
				<div className="flex flex-row items-center gap-0.5">
					{tabs.map((tab) => (
						<button
							type="button"
							key={tab.id}
							className={cn(
								'group rounded-md px-2 py-2 font-medium text-xs text-zinc-400',
								tab.id === activeTabId
									? 'bg-zinc-700 text-zinc-100'
									: 'hover:bg-zinc-800',
							)}
							onClick={() => setActiveTabId(tab.id)}
						>
							<PiFile className="-mt-0.5 mr-1 inline-block" />
							{tab.name}
							<PiX className="-mt-0.5 ml-1 inline-block w-4 stroke-3 opacity-0 group-hover:opacity-100" />
						</button>
					))}
				</div>
			</nav>
			<div className="flex flex-row justify-between overflow-auto px-16 py-8">
				{tab.type === 'doc' ? <EditorUI /> : <ChatUI />}
			</div>
		</div>
	);
}
