import { defineConfig } from "drizzle-kit";
import path from "path";

export default defineConfig({
	schema: "./drizzle/schema/*",
	out: "./drizzle/migrations",
	dialect: "sqlite",
	dbCredentials: {
		url: path.resolve(process.cwd(), ".data/dev.db"),
	},
});
