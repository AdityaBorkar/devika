import { Provider as JotaiProvider } from "jotai";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Link, Navigate, Outlet, useLocation } from "react-router";
import Logo from "@/../public/logo.svg";
import { TextShimmer } from "@/components/animations/TextShimmer";
import { Button } from "@/components/ui/button";
import {
	ServerSyncProvider,
	useServerSync,
} from "@/lib/server-sync/ServerSync";

import "./globals.css";
import { useEffect } from "react";
import { DialogProvider } from "@/contexts/DialogContext";

export default function RootLayout() {
	useEffect(() => {
		document.addEventListener("contextmenu", (e) => e.preventDefault());
	}, []);
	return (
		<NuqsAdapter>
			<JotaiProvider>
				<DialogProvider>
					<ServerSyncProvider>
						<Children />
					</ServerSyncProvider>
				</DialogProvider>
			</JotaiProvider>
		</NuqsAdapter>
	);
}

function Children() {
	const {
		status: { success, message },
	} = useServerSync();
	const location = useLocation();

	if (success || location.pathname === "/onboarding") return <Outlet />;
	if (message === "INVALID") return <ReinitializeProjectPlaceholder />;
	if (message === "NOT_FOUND") return <Navigate to="/onboarding" />;
	return <LoadingPlaceholder message={message} />;
}

function ReinitializeProjectPlaceholder() {
	return (
		<div className="flex h-screen w-screen select-none flex-col items-center justify-center gap-4">
			<img src={Logo} alt="Logo" className="w-48" draggable={false} />
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
			<img src={Logo} alt="Logo" className="w-48" draggable={false} />
			<div className="border-border border-t px-8 py-4 text-sm">
				{message ? (
					<span className="text-rose-500">{message}</span>
				) : (
					<TextShimmer
						duration={2}
						spread={2}
						className="[--base-color:var(--color-text-tertiary)] [--base-gradient-color:var(--color-text-primary)]"
					>
						Loading Workspace
					</TextShimmer>
				)}
			</div>
		</div>
	);
}
