import { useSetAtom } from "jotai";
import { PiFile } from "react-icons/pi";
import { Link } from "react-router";
import { PrdActiveTabIdAtom } from "@/app/(workspace)/prd/store";
import { cn } from "@/lib/utils";

const sections = [
	{
		label: "Features",
		// to: '/prd/features',
	},
	{
		label: "System & Tech Stack",
		// to: '/prd/system-environment-requirements',
	},
	{
		label: "Design & UX Flow",
		// to: '/prd/ux-flow-design-notes',
	},
	{
		label: "User Stories",
		// to: '/prd/user-stories',
	},
];

// TODO: Double Click to Rename a File
// TODO: Register shortcut - CTRL+N / CTRL+SHIFT+O

export default function FilesNavigation() {
	const files = 
	return (
		<nav className="flex flex-col overflow-auto">
			{/* <NoteLink to="/prd/new-note" className="mt-4">
					<PiPlus className="-mt-0.5 mr-2 inline-block size-4" />
					New Note
				</NoteLink> */}

			{sections.map((section) => (
				<div key={section.label} className="contents">
					<div className="mt-6 mb-1 select-none px-5 font-medium text-muted-foreground text-xs first:mt-4">
						{section.label}
					</div>
					<NoteLink tabId="list-of-docs">
						<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
						List of Docs
					</NoteLink>
					<NoteLink tabId="list-of-docs">
						<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
						List of Docs
					</NoteLink>
					<NoteLink tabId="list-of-docs">
						<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
						List of Docs
					</NoteLink>
					<NoteLink tabId="list-of-docs">
						<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
						List of Docs
					</NoteLink>
					<NoteLink tabId="list-of-docs">
						<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
						List of Docs
					</NoteLink>
				</div>
			))}
		</nav>
	);
}

function NoteLink({
	tabId,
	children,
	className,
}: {
	tabId: string;
	className?: string;
	children: React.ReactNode;
}) {
	const setActiveTabId = useSetAtom(PrdActiveTabIdAtom);

	return (
		<Link
			to={`/prd/${tabId}`}
			onClick={() => setActiveTabId(tabId)}
			className={cn(
				"mx-3 rounded-md px-1 py-1.5 text-xs hover:bg-bg-secondary",
				className,
			)}
		>
			{children}
		</Link>
	);
}
