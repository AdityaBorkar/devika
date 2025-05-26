import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './drizzle/schema/*',
	out: './drizzle/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		host: 'localhost',
		port: 5432,
		user: '00000000-0000-0000-0000-000000000000',
		password: 'password',
		database: 'test',
		ssl: 'allow',
	},
});
