import { useAtom } from 'jotai';
import { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import { PiCaretDown, PiChecks, PiEye, PiPencilLine } from 'react-icons/pi';
import { NoteContentAtom } from '@/app/(app)/prd/explorer/[pageId]/store';
import { MDXEditor } from '@/components/editors/PrdEditor';
import { DocumentOutline } from '@/components/editors/PrdEditor/DocumentOutline';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type ViewMode = 'Edit' | 'Review' | 'Read';
// Status: Draft / Proposed -> Approved -> Implemented / Closed

export function PRDExplorerDocPage() {
	const [content, setContent] = useAtom(NoteContentAtom);
	const editorRef = useRef<HTMLDivElement>(null);
	const [viewMode, setViewMode] = useState<ViewMode>('Edit');

	// Function to cycle through view modes
	const cycleViewMode = useCallback(() => {
		const modes: ViewMode[] = ['Edit', 'Review', 'Read'];
		const currentIndex = modes.indexOf(viewMode);
		const nextIndex = (currentIndex + 1) % modes.length;
		setViewMode(modes[nextIndex]);
	}, [viewMode]);

	// Set up keyboard shortcut (Ctrl+/)
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === '/') {
				e.preventDefault();
				cycleViewMode();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [cycleViewMode]);

	// Function to scroll to a heading when clicked in the outline
	const scrollToHeading = (id: string) => {
		if (!editorRef.current) return;

		// Find the editor's iframe (TipTap uses an iframe)
		const editorIframe = editorRef.current.querySelector('iframe');
		if (!editorIframe) return;

		// Access the document within the iframe
		const iframeDoc =
			editorIframe.contentDocument || editorIframe.contentWindow?.document;
		if (!iframeDoc) return;

		// Find the heading element by ID
		const headingElement = iframeDoc.getElementById(id);
		if (!headingElement) return;

		// Scroll the heading into view
		headingElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<main className="*:px-12">
			<div className="flex flex-row items-center gap-2 border-border border-b py-1.5">
				<div>File Name</div>
				<div className="rounded-md bg-zinc-200 px-3 py-1">Timeline</div>
				<div className="grow" />
				<DropdownMenu>
					<DropdownMenuTrigger
						className={cn(
							'w-fit rounded-md bg-zinc-200 px-3 py-1 flex flex-row justify-between items-center gap-2',
						)}
					>
						<span>
							<PiPencilLine className="mr-1.5 inline-block -mt-0.5" />
							{viewMode}
						</span>
						<PiCaretDown />
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-24">
						<DropdownMenuItem
							onClick={() => setViewMode('Edit')}
							className="px-3"
						>
							<PiPencilLine className="mr-1.5" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setViewMode('Review')}
							className="px-3"
						>
							<PiChecks className="mr-1.5" />
							Review
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setViewMode('Read')}
							className="px-3"
						>
							<PiEye className="mr-1.5" />
							Read
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<div className="rounded-md bg-accent-foreground px-3 py-1 text-accent">
					Publish
				</div>
			</div>

			<div className="flex flex-row justify-between px-16 py-8">
				<div className="grow" ref={editorRef}>
					<MDXEditor
						content={content}
						onChange={setContent}
						className="mx-auto min-h-[300px] w-[44rem] border-border border-b pb-8"
					/>
				</div>
				<div className="w-72 border-border border-b p-4">
					<DocumentOutline content={content} onHeadingClick={scrollToHeading} />
				</div>
			</div>
		</main>
	);
}
