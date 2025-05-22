import { createClient } from "@libsql/client";

const client = createClient({
	url: "http://localhost:3001",
	authToken: "",
	// syncUrl: "http://localhost:3001",
	syncInterval: 5,
});
// client.sync();
export default client;

// const db = drizzle({ client });

// export default db;
