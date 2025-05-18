import { PiFile, PiPlus } from 'react-icons/pi';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';

const sections = [
	{
		label: 'Features',
		// to: '/prd/features',
	},
	{
		label: 'System & Tech Stack',
		// to: '/prd/system-environment-requirements',
	},
	{
		label: 'Design & UX Flow',
		// to: '/prd/ux-flow-design-notes',
	},
	{
		label: 'User Stories',
		// to: '/prd/user-stories',
	},
];

// TODO: Double Click to Rename a File
// TODO: Register shortcut - CTRL+N / CTRL+SHIFT+O

export default function FilesNavigation() {
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
					<NoteLink to="/prd/list-of-docs">
						<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
						List of Docs
					</NoteLink>
					<NoteLink to="/prd/list-of-docs">
						<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
						List of Docs
					</NoteLink>
					<NoteLink to="/prd/list-of-docs">
						<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
						List of Docs
					</NoteLink>
					<NoteLink to="/prd/list-of-docs">
						<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
						List of Docs
					</NoteLink>
					<NoteLink to="/prd/list-of-docs">
						<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
						List of Docs
					</NoteLink>
				</div>
			))}
		</nav>
	);
}

function NoteLink({
	to,
	children,
	className,
}: {
	to: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			className={cn(
				'mx-3 rounded-md px-1 py-1.5 text-xs hover:bg-bg-secondary',
				className,
			)}
			to={to}
		>
			{children}
		</Link>
	);
}
