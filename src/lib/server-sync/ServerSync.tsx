import { useSetAtom } from 'jotai';
import { createContext, use, useEffect, useMemo, useState } from 'react';
import { ContextAtom } from '@/lib/server-sync/stores';

const logger = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	log: (...args: any[]) => {
		console.log('[ENGINE]', ...args);
	},
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	error: (...args: any[]) => {
		console.error('[ENGINE]', ...args);
	},
};

type Context = {
	status: {
		success: boolean;
		message: string;
	};
	socket: WebSocket;
};

const StatusContext = createContext<Context>({
	status: { success: false, message: '' },
	socket: null as unknown as WebSocket,
});

export function useServerSync() {
	const context = use(StatusContext);
	return context;
}

export function ServerSyncProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const setContextValue = useSetAtom(ContextAtom);
	const [status, setStatus] = useState<Context['status']>({
		success: false,
		message: '',
	});

	const socket = useMemo(() => {
		const socket = new WebSocket('ws://localhost:3000/api/server');
		socket.addEventListener('open', () => {
			// logger.log('Connected to Server');
			const params = { command: 'START', data: {} };
			socket.send(JSON.stringify(params));
		});
		socket.addEventListener('message', (event) => {
			logger.log('[CLIENT] Received', event.data);
			const data = JSON.parse(event.data);
			const { command, result } = data;

			if (command === 'START') {
				const { success, errors } = result;
				setStatus({ success, message: errors });
				return;
			}

			if (command === 'SET-DATA') {
				const { path, data } = result;
				setContextValue((ctx) => ({ ...ctx, [path]: data }));
				return;
			}

			// if (command === 'STOP') {
			// 	setStatus({ success: false, message: 'Server Stopped' });
			// 	return;
			// }
		});
		return socket;
	}, [setContextValue]);

	useEffect(() => {
		return () => {
			setStatus({ success: false, message: 'Disconnected from Server' });
			if (socket.readyState === WebSocket.OPEN) socket.close();
		};
	}, [socket]);

	return (
		<StatusContext.Provider value={{ status, socket }}>
			{children}
		</StatusContext.Provider>
	);
}
