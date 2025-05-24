import path from 'node:path';
import { Database } from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

// Initialize the database
export function createDb() {
	const sqlite = new Database(path.resolve(process.cwd(), '.data/dev.db'));
	return drizzle(sqlite, { schema });
}

// Export an instance for direct use
export const db = createDb();
