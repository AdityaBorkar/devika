import { PiFile, PiPlus } from 'react-icons/pi';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';

const sections = [
	{
		label: 'Features',
		// to: '/prd/explorer/features',
	},
	{
		label: 'System & Tech Stack',
		// to: '/prd/explorer/system-environment-requirements',
	},
	{
		label: 'Design & UX Flow',
		// to: '/prd/explorer/ux-flow-design-notes',
	},
	{
		label: 'User Stories',
		// to: '/prd/explorer/user-stories',
	},
];

export default function PRDExplorerNavigation() {
	return (
		<div>
			<nav className="flex flex-col h-full overflow-auto">
				{/* TOP: Progressive Blur */}
				{/* TODO: Register shortcut - CTRL+N */}
				<NoteLink to="/prd/explorer/new-note" className="mt-4">
					<PiPlus className="-mt-0.5 mr-2 inline-block size-4" />
					New Note
				</NoteLink>

				{sections.map((section) => (
					<div key={section.label} className="contents">
						<div className="mt-6 mb-1 px-4 font-medium text-muted-foreground text-xs">
							{section.label}
						</div>
						<NoteLink to="/prd/explorer/list-of-docs">
							<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
							List of Docs
						</NoteLink>
						<NoteLink to="/prd/explorer/list-of-docs">
							<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
							List of Docs
						</NoteLink>
						<NoteLink to="/prd/explorer/list-of-docs">
							<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
							List of Docs
						</NoteLink>
						<NoteLink to="/prd/explorer/list-of-docs">
							<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
							List of Docs
						</NoteLink>
						<NoteLink to="/prd/explorer/list-of-docs">
							<PiFile className="-mt-0.5 mr-1.5 ml-1 inline-block size-4" />
							List of Docs
						</NoteLink>
					</div>
				))}
			</nav>
		</div>
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
			className={cn('rounded-md px-4 py-1 hover:bg-zinc-200', className)}
			to={to}
		>
			{children}
		</Link>
	);
}
