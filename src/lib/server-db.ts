import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({
	url: process.env.TURSO_DATABASE_URL || 'http://localhost:3001',
	authToken: process.env.TURSO_AUTH_TOKEN || '',
});

const db = drizzle(client);
export default db;
