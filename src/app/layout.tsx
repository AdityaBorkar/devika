import { Provider } from 'jotai';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { Link, Navigate, Outlet } from 'react-router';
import Logo from '@/assets/logo.svg';
import { TextShimmer } from '@/components/animations/TextShimmer';
import { Button } from '@/components/ui/button';
import {
	ServerSyncProvider,
	useServerSync,
} from '@/lib/server-sync/ServerSync';
import { cn } from '@/lib/utils';

import './globals.css';

export default function RootLayout() {
	return (
		<Provider>
			<NuqsAdapter>
				<ServerSyncProvider>
					<ServerSyncConnection />
				</ServerSyncProvider>
			</NuqsAdapter>
		</Provider>
	);
}

function ServerSyncConnection() {
	const { status } = useServerSync();
	if (status.success) return <Outlet />;
	if (status.message === 'INVALID') return <ReinitializeProjectPlaceholder />;
	if (status.message === 'NOT_FOUND') {
		if (location.pathname === '/onboarding') return <Outlet />;
		return <Navigate to="/onboarding" />;
	}
	return <LoadingPlaceholder message={status.message} />;
}

function ReinitializeProjectPlaceholder() {
	return (
		<div className="flex h-screen w-screen select-none flex-col items-center justify-center gap-4">
			<img
				src={Logo}
				alt="Logo"
				className="w-48 opacity-40"
				draggable={false}
			/>
			<div className="max-w-96 border-border border-t px-8 py-4 text-sm">
				<span className="text-center text-rose-700">
					Configuration file is invalid. Kindly manually check the file and fix
					errors, or re-initialize the project.
				</span>

				<Link to="/onboarding" className="mt-4 block">
					<Button variant="default" size="sm" className="mx-auto block">
						Re-initialize Project
					</Button>
				</Link>
			</div>
		</div>
	);
}

function LoadingPlaceholder({ message }: { message: string }) {
	return (
		<div className="flex h-screen w-screen select-none flex-col items-center justify-center gap-4">
			<img
				src={Logo}
				alt="Logo"
				className="w-48 opacity-40"
				draggable={false}
			/>
			<div className="border-border border-t px-8 py-4 text-sm">
				{message ? (
					<span className="text-rose-700">{message}</span>
				) : (
					<TextShimmer
						duration={1.5}
						spread={4}
						className={cn(
							'[--base-color:var(--color-zinc-500)] [--base-gradient-color:var(--color-zinc-300)]',
							// 'dark:[--base-color:var(--color-blue-700)] dark:[--base-gradient-color:var(--color-blue-400)]',
						)}
					>
						Loading Workspace
					</TextShimmer>
				)}
			</div>
		</div>
	);
}
