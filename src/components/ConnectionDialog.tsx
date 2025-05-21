import { PiCheckCircle, PiXCircle } from "react-icons/pi";
import { useDialog } from "@/contexts/DialogContext";
import { cn } from "@/lib/utils";

type ConnectionStatusProps = {
	title: string;
	isConnected: boolean;
	details?: string;
};

function ConnectionStatus({
	title,
	isConnected,
	details,
}: ConnectionStatusProps) {
	return (
		<div className="flex items-center justify-between mb-3 p-3 rounded-md border border-border">
			<div>
				<h3 className="font-medium">{title}</h3>
				{details && <p className="text-xs text-text-muted">{details}</p>}
			</div>
			<div className="flex items-center">
				<span
					className={cn(
						"mr-2 text-sm",
						isConnected ? "text-green-600" : "text-rose-500",
					)}
				>
					{isConnected ? "Connected" : "Disconnected"}
				</span>
				{isConnected ? (
					<PiCheckCircle className="size-5 text-green-600" />
				) : (
					<PiXCircle className="size-5 text-rose-500" />
				)}
			</div>
		</div>
	);
}

export function ConnectionDialog() {
	const { closeDialog } = useDialog();

	// These would come from a real state or API in a production app
	const connections = {
		ide: { isConnected: true, details: "VSCode Extension v1.2.3" },
		cloud: { isConnected: false, details: "Not authenticated" },
		integrations: { isConnected: true, details: "GitHub, Jira" },
		extension: {
			isConnected: false,
			details: "Chrome extension not installed",
		},
	};

	return (
		<div className="space-y-4 border border-border rounded-md p-4 bg-background">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Connection Status</h2>
				<button
					onClick={closeDialog}
					className="text-text-muted hover:text-text-primary rounded-full p-1"
				>
					✕
				</button>
			</div>

			<p className="text-text-muted mb-4">
				View the status of your connections (Alt+C to toggle)
			</p>

			<ConnectionStatus
				title="IDE Integration"
				isConnected={connections.ide.isConnected}
				details={connections.ide.details}
			/>
			<ConnectionStatus
				title="Cloud Service"
				isConnected={connections.cloud.isConnected}
				details={connections.cloud.details}
			/>
			<ConnectionStatus
				title="External Integrations"
				isConnected={connections.integrations.isConnected}
				details={connections.integrations.details}
			/>
			<ConnectionStatus
				title="Browser Extension"
				isConnected={connections.extension.isConnected}
				details={connections.extension.details}
			/>

			<div className="mt-4 pt-4 border-t border-border">
				<button className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
					Refresh Connections
				</button>
			</div>
		</div>
	);
}
