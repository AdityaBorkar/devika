import path from 'node:path';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './drizzle/schema/*',
	out: './drizzle/migrations',
	dialect: 'sqlite',
	dbCredentials: {
		url: path.resolve(process.cwd(), '.data/dev.db'),
	},
});
