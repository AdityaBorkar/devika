import { defineConfig } from "drizzle-kit";
import path from "path";

export default defineConfig({
	schema: "./drizzle/schema/*",
	out: "./drizzle/migrations",
	driver: "better-sqlite",
	dbCredentials: {
		url: path.resolve(process.cwd(), ".data/dev.db"),
	},
});
