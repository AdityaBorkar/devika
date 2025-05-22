import { Provider as JotaiProvider } from "jotai";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import Logo from "@/../public/logo.svg";
import { TextShimmer } from "@/components/animations/TextShimmer";
import { DialogProvider } from "@/contexts/DialogContext";
import {
	ClientSyncProvider,
	useClientSync,
} from "@/lib/server-sync/ServerSync";

import "./globals.css";

export default function RootLayout() {
	useEffect(() => {
		document.addEventListener("contextmenu", (e) => e.preventDefault());
	}, []);
	return (
		<NuqsAdapter>
			<JotaiProvider>
				<DialogProvider>
					<ClientSyncProvider>
						<Children />
					</ClientSyncProvider>
				</DialogProvider>
			</JotaiProvider>
		</NuqsAdapter>
	);
}

function Children() {
	const {
		status: { success, message },
	} = useClientSync();
	const location = useLocation();

	if (success || location.pathname === "/new") return <Outlet />;
	// if (message === "INVALID") return <ReinitializeProjectPlaceholder />;
	if (message === "NOT_FOUND") return <Navigate to="/new" />;
	return <LoadingPlaceholder message={message} />;
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

// function ReinitializeProjectPlaceholder() {
// 	return (
// 		<div className="flex h-screen w-screen select-none flex-col items-center justify-center gap-4">
// 			<img src={Logo} alt="Logo" className="w-48" draggable={false} />
// 			<div className="max-w-96 border-border border-t px-8 py-4 text-sm">
// 				<span className="text-center text-rose-700">
// 					Configuration file is invalid. Kindly manually check the file and fix
// 					errors, or re-initialize the project.
// 				</span>

// 				<Link to="/new" className="mt-4 block">
// 					<Button variant="default" size="sm" className="mx-auto block">
// 						Re-initialize Project
// 					</Button>
// 				</Link>
// 			</div>
// 		</div>
// 	);
// }
