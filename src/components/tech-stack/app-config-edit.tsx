'use client';

import { Edit, Save } from 'lucide-react';
import { useState } from 'react';
import type { AppConfig } from '@/types/tech-stack';

interface AppConfigEditProps {
	config: AppConfig;
	onSave: (id: string, name: string, filePath: string) => void;
}

export function AppConfigEdit({ config, onSave }: AppConfigEditProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(config.name);
	const [filePath, setFilePath] = useState(config.filePath || '');

	const handleSave = () => {
		if (name.trim()) {
			onSave(config.id, name, filePath);
			setIsEditing(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSave();
		} else if (e.key === 'Escape') {
			setIsEditing(false);
			setName(config.name);
			setFilePath(config.filePath || '');
		}
	};

	if (isEditing) {
		return (
			<div className="flex flex-col gap-2 rounded-md border p-2">
				<div className="flex flex-col gap-1">
					<label
						htmlFor={`config-name-${config.id}`}
						className="text-muted-foreground text-xs"
					>
						Name
					</label>
					<input
						id={`config-name-${config.id}`}
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						onKeyDown={handleKeyDown}
						className="rounded-sm border bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label
						htmlFor={`config-path-${config.id}`}
						className="text-muted-foreground text-xs"
					>
						File Path
					</label>
					<input
						id={`config-path-${config.id}`}
						type="text"
						value={filePath}
						onChange={(e) => setFilePath(e.target.value)}
						onKeyDown={handleKeyDown}
						className="rounded-sm border bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
					/>
				</div>
				<div className="mt-1 flex justify-end gap-2">
					<button
						type="button"
						onClick={() => {
							setIsEditing(false);
							setName(config.name);
							setFilePath(config.filePath || '');
						}}
						className="px-2 py-1 text-muted-foreground text-xs hover:text-foreground"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleSave}
						className="flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-primary-foreground text-xs"
					>
						<Save className="h-3 w-3" />
						Save
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="flex items-center gap-2 font-medium text-base">
						{config.name}
						{config.isCommon && (
							<span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs">
								Common
							</span>
						)}
						{config.isLocal && (
							<span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-indigo-800 text-xs dark:bg-indigo-900 dark:text-indigo-300">
								Local
							</span>
						)}
					</h3>
				</div>
				<button
					type="button"
					onClick={() => setIsEditing(true)}
					className="rounded-md p-1 text-muted-foreground hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800"
					title="Edit config"
				>
					<Edit className="h-4 w-4" />
				</button>
			</div>
			{config.filePath && (
				<span className="mt-1 text-muted-foreground text-xs">
					{config.filePath}
				</span>
			)}
			<p className="mt-1 text-muted-foreground text-sm">{config.description}</p>
		</div>
	);
}
