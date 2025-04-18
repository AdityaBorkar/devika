'use client';

import { Book, FileSymlink, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { DocSource } from '@/types/tech-stack';

interface DocUrlDialogProps {
	isOpen: boolean;
	packageId: string;
	initialUrl: string;
	onClose: () => void;
	onSave: (packageId: string, url: string) => void;
}

export function DocUrlDialog({
	isOpen,
	packageId,
	initialUrl,
	onClose,
	onSave,
}: DocUrlDialogProps) {
	const [url, setUrl] = useState(initialUrl);
	const [isLocal, setIsLocal] = useState(false);
	const [docSource, setDocSource] = useState<DocSource>('url');

	useEffect(() => {
		setUrl(initialUrl);
	}, [initialUrl]);

	const handleSave = () => {
		if (url.trim()) {
			onSave(packageId, url);
			onClose();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSave();
		} else if (e.key === 'Escape') {
			onClose();
		}
	};

	const handleSourceChange = (source: DocSource) => {
		setDocSource(source);
		setIsLocal(source !== 'url');

		// Clear or adjust the URL based on new source type
		if (source === 'url' && isLocal) {
			setUrl('https://');
		} else if (source === 'path' && !isLocal) {
			setUrl('/');
		} else if (source === 'jsdoc' && !isLocal) {
			setUrl('/');
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-lg dark:border-gray-700 dark:bg-gray-900">
				<div className="mb-4 flex items-center justify-between">
					<h3 className="font-medium text-lg">Edit Documentation Source</h3>
					<button
						type="button"
						onClick={onClose}
						className="rounded-md p-1 text-muted-foreground hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				<div className="space-y-5">
					<div className="flex flex-col gap-3">
						<span className="font-medium text-sm">Documentation Type</span>
						<div className="flex overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
							<button
								type="button"
								className={`flex flex-1 items-center justify-center gap-2 px-4 py-2 text-sm ${docSource === 'url' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
								onClick={() => handleSourceChange('url')}
							>
								External URL
							</button>
							<button
								type="button"
								className={`flex flex-1 items-center justify-center gap-2 px-4 py-2 text-sm ${docSource === 'path' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
								onClick={() => handleSourceChange('path')}
							>
								<FileSymlink className="h-4 w-4" />
								File Path
							</button>
							<button
								type="button"
								className={`flex flex-1 items-center justify-center gap-2 px-4 py-2 text-sm ${docSource === 'jsdoc' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
								onClick={() => handleSourceChange('jsdoc')}
							>
								<Book className="h-4 w-4" />
								JSDoc
							</button>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="doc-url" className="font-medium text-sm">
							{docSource === 'url'
								? 'Documentation URL'
								: docSource === 'path'
									? 'File Path'
									: 'JSDoc Directory'}
						</label>
						<input
							id="doc-url"
							type={docSource === 'url' ? 'url' : 'text'}
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							onKeyDown={handleKeyDown}
							className="w-full rounded-md border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder={
								docSource === 'url'
									? 'https://example.com/docs'
									: docSource === 'path'
										? '/path/to/README.md'
										: '/path/to/directory'
							}
						/>
						<p className="text-muted-foreground text-xs">
							{docSource === 'url'
								? 'Link to external documentation website'
								: docSource === 'path'
									? 'Path to documentation file (README.md)'
									: 'Path to directory containing JSDoc comments'}
						</p>
					</div>

					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={onClose}
							className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={handleSave}
							className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm hover:bg-primary/90"
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
