import { useSetAtom } from "jotai";
import { createContext, use, useEffect, useMemo, useState } from "react";
import { logger } from "@/lib/server-sync/logger";
import { ContextAtom } from "@/lib/server-sync/stores";

type Context = {
	status: {
		success: boolean;
		message: string;
	};
	socket: WebSocket;
};

const defaultStatus = { success: true, message: "" }; // ! `true`

const StatusContext = createContext<Context>({
	status: defaultStatus,
	socket: null as unknown as WebSocket,
});

export function useClientSync() {
	const context = use(StatusContext);
	return context;
}

export function ClientSyncProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const setContextValue = useSetAtom(ContextAtom);
	const [status, setStatus] = useState<Context["status"]>(defaultStatus);

	const socket = useMemo(() => {
		const socket = new WebSocket("ws://localhost:3210/api/server");
		socket.addEventListener("open", () => {
			// TODO: PERFORM USER AUTHENTICATION
			logger.log("Connected to Server");
			const params = { command: "START", data: {} };
			socket.send(JSON.stringify(params));
		});
		// socket.addEventListener("message", (event) => {
		// 	logger.log("[CLIENT] Received", event.data);
		// 	const data = JSON.parse(event.data);
		// 	const { command, result } = data;

		// 	if (command === "START") {
		// 		const { success, errors } = result;
		// 		setStatus({ success, message: errors });
		// 		return;
		// 	}

		// 	if (command === "SET-DATA") {
		// 		const { path, data } = result;
		// 		setContextValue((ctx) => ({ ...ctx, [path]: data }));
		// 		return;
		// 	}

		// 	// if (command === 'STOP') {
		// 	// 	setStatus({ success: false, message: 'Server Stopped' });
		// 	// 	return;
		// 	// }
		// });
		return socket;
	}, [setContextValue]);

	useEffect(() => {
		return () => {
			// setStatus({ success: false, message: "Disconnected from Server" });
			if (socket.readyState === WebSocket.OPEN) socket.close();
		};
	}, [socket]);

	return (
		<StatusContext.Provider value={{ status, socket }}>
			{children}
		</StatusContext.Provider>
	);
}
