import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { Letsync } from 'letsync/pglite';

const client = new PGlite('idb://devika-development');
const letsync = new Letsync({
	client,
	orm: drizzle,
	debug: true,
	webWorker: false,
});

const { db, useLiveQuery } = await letsync.connect();
export { db, useLiveQuery };
