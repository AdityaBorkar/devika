import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql"; // TODO: change to "/node"

const client = createClient({
	url: process.env.TURSO_DATABASE_URL || "",
	authToken: process.env.TURSO_AUTH_TOKEN || "",
});

const db = drizzle({ client });

export default db;
