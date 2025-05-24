import { PiCheckCircle, PiXCircle } from 'react-icons/pi';
import { useDialog } from '@/contexts/DialogContext';
import { cn } from '@/lib/utils';

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
		<div className="mb-3 flex items-center justify-between rounded-md border border-border p-3">
			<div>
				<h3 className="font-medium">{title}</h3>
				{details && <p className="text-text-muted text-xs">{details}</p>}
			</div>
			<div className="flex items-center">
				<span
					className={cn(
						'mr-2 text-sm',
						isConnected ? 'text-green-600' : 'text-rose-500',
					)}
				>
					{isConnected ? 'Connected' : 'Disconnected'}
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
		ide: { isConnected: true, details: 'VSCode Extension v1.2.3' },
		cloud: { isConnected: false, details: 'Not authenticated' },
		integrations: { isConnected: true, details: 'GitHub, Jira' },
		extension: {
			isConnected: false,
			details: 'Chrome extension not installed',
		},
	};

	return (
		<div className="space-y-4 rounded-md border border-border bg-background p-4">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="font-semibold text-xl">Connection Status</h2>
				<button
					onClick={closeDialog}
					className="rounded-full p-1 text-text-muted hover:text-text-primary"
				>
					✕
				</button>
			</div>

			<p className="mb-4 text-text-muted">
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

			<div className="mt-4 border-border border-t pt-4">
				<button className="w-full rounded-md bg-primary py-2 text-primary-foreground hover:bg-primary/90">
					Refresh Connections
				</button>
			</div>
		</div>
	);
}
