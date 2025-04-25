import { useAtom } from 'jotai';
import { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import { PiCaretDown, PiChecks, PiEye, PiPencilLine } from 'react-icons/pi';
import { NoteContentAtom } from '@/app/(app)/prd/[pageId]/store';
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

// TODO: Setup server and Websockets and SSE
// TODO: Work solely on PRD and in this repo itself.
// Support for undo-redo
// Status: Draft / Proposed -> Approved -> Implemented / Closed
// AI shall ask questions for specific sections. You must answer the questions.

export function PrdDocPage() {
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
				// animation of "active" state
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
				<div className="grow" />
				<div className="flex flex-row items-center gap-2">
					<pre className="text-muted-foreground text-xs">CTRL + /</pre>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger
						className={cn(
							'flex w-fit flex-row items-center justify-between font-medium gap-2 rounded-md bg-zinc-200 border px-3 py-1',
							viewMode === 'Edit' &&
								'bg-amber-200 border-amber-400 text-amber-800',
							viewMode === 'Review' &&
								'bg-purple-200 border-purple-400 text-purple-800',
							viewMode === 'Read' &&
								'bg-zinc-200 border-zinc-400 text-zinc-800',
						)}
					>
						{/* TODO: Animate SVG Morph + Number Counter Effect */}
						<span>
							<PiPencilLine className="-mt-0.5 mr-1.5 inline-block" />
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
					<div className="rounded-md bg-zinc-200 px-3 py-1">Timeline</div>
					<div className="rounded-md bg-zinc-200 px-3 py-1">Review Pending</div>
					<DocumentOutline content={content} onHeadingClick={scrollToHeading} />
				</div>
			</div>
		</main>
	);
}
