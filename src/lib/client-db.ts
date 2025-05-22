import { createClient } from "@libsql/client";

const client = createClient({
	url: "file:./dev-client.db",
	authToken: "",
	syncUrl: "http://localhost:3001",
	syncInterval: 60,
});
