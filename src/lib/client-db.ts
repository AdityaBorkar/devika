import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { Letsync } from '@/lib/db-sync/init';

async function initDatabase() {
	// TODO: Run in Web Worker

	const client = new PGlite('idb://devika-development');
	const db = drizzle({ client });

	const syncManager = new Letsync({ client });
	syncManager.connect();

	// TODO: Extend exports to support:
	// version - upgrade(version: string), checkForUpdate(), get()
	// sync - sync(version: string), syncAll()
	// live - subscribe((db) => db.operations)

	return { db };
}

const { db } = await initDatabase();

export default db;
