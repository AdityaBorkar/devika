'use client';

import {
	Book,
	Edit,
	ExternalLink,
	FileSymlink,
	FolderDot,
	Shield,
	ShieldAlert,
	XCircle,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Package } from '@/types/tech-stack';

interface PackageCardProps {
	pkg: Package;
	onEditDocs: (id: string, currentUrl: string) => void;
}

export function PackageCard({ pkg, onEditDocs }: PackageCardProps) {
	const {
		name,
		version,
		docsUrl,
		lastScrapedDate,
		isUpdateAvailable,
		description,
		logoUrl,
		isUnused,
		hasSecurityAlert,
		isLocal,
		docSource,
	} = pkg;

	return (
		<div
			className={cn(
				'relative w-full rounded-lg border bg-white p-5 transition-all hover:border-primary/30 hover:shadow-sm dark:bg-gray-900',
				isLocal
					? 'border-indigo-200 dark:border-indigo-800'
					: 'border-gray-200 dark:border-gray-800',
			)}
		>
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-3">
					{logoUrl && (
						<div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-gray-50 p-1 dark:bg-gray-800">
							<img
								src={logoUrl}
								alt={name}
								width={40}
								height={40}
								className="object-contain"
							/>
						</div>
					)}
					<div>
						<div className="flex items-center gap-2">
							<h3 className="font-medium text-lg">{name}</h3>
							{isLocal && (
								<span className="rounded-full bg-indigo-100 px-2 py-0.5 text-indigo-800 text-xs dark:bg-indigo-900 dark:text-indigo-300">
									Local
								</span>
							)}
						</div>
						{description && (
							<p className="mt-1 text-muted-foreground text-sm">
								{description}
							</p>
						)}
					</div>
				</div>

				<div className="flex items-center gap-2">
					<a
						href={docsUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-md p-1 text-muted-foreground hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800"
						title={`View ${isLocal ? 'local documentation' : 'external documentation'}`}
					>
						{isLocal ? (
							docSource === 'path' ? (
								<FileSymlink className="h-4 w-4" />
							) : (
								<Book className="h-4 w-4" />
							)
						) : (
							<ExternalLink className="h-4 w-4" />
						)}
					</a>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onEditDocs(pkg.id, docsUrl);
						}}
						className="rounded-md p-1 text-muted-foreground hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800"
						title="Edit documentation link"
					>
						<Edit className="h-4 w-4" />
					</button>
				</div>
			</div>

			<div className="mt-5 flex flex-col gap-3">
				<div className="flex flex-wrap items-center gap-2">
					<span className="rounded-full bg-secondary px-2 py-1 text-xs">
						v{version}
					</span>
					{isLocal && docSource && (
						<span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
							{docSource === 'path' ? (
								<FolderDot className="h-3 w-3" />
							) : (
								<Book className="h-3 w-3" />
							)}
							{docSource === 'path' ? 'Path' : 'JSDoc'}
						</span>
					)}
					{isUpdateAvailable && (
						<span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-500 text-xs">
							<XCircle className="h-3 w-3" />
							Update
						</span>
					)}
					{isUnused && (
						<span className="flex items-center gap-1 rounded-full bg-slate-500/10 px-2 py-0.5 text-slate-500 text-xs">
							<Shield className="h-3 w-3" />
							Unused
						</span>
					)}
					{hasSecurityAlert && (
						<span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-red-500 text-xs">
							<ShieldAlert className="h-3 w-3" />
							Security
						</span>
					)}
				</div>

				<div className="flex items-center justify-between border-gray-200 border-t border-dashed pt-2 text-muted-foreground text-xs dark:border-gray-800">
					<span>Last updated: {lastScrapedDate}</span>
					{isLocal && (
						<span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
							{docsUrl}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
