import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { Letsync } from 'letsync/pglite';

async function initDatabase() {
	// TODO: Run in Web Worker

	const client = new PGlite('idb://devika-development');
	const db = drizzle({ client });

	const syncManager = new Letsync({ client, debug: true });
	await syncManager.connect();

	return { db };
}

const { db } = await initDatabase();
export default db;
