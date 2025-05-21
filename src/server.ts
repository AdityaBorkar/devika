import { serve } from "bun";
import { POST } from "@/api/actions/workspace/route";
import frontend from "./frontend.html";

const server = serve({
	development: process.env.NODE_ENV !== "production" && {
		hmr: true,
		console: true,
	},
	routes: {
		"/*": frontend,
		"/api/actions/workspace": {
			POST,
		},
	},
});

console.log(`🚀 Server running at ${server.url}`);
