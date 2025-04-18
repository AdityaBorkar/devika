import { serve } from "bun";
import index from "./index.html";

const server = serve({
	routes: { "/*": index },
	websocket: {
		open(ws) {
			console.log("WebSocket opened");
		},
		message(ws, message) {
			console.log("WebSocket message", message);
		},
		close(ws, code, reason) {
			console.log("WebSocket closed", code, reason);
		},
	},

	development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
