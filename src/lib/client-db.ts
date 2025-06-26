import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';

export const client = new PGlite('idb://devika-development');

export const db = drizzle(client);

// const letsync = new Letsync({
// 	client,
// 	orm: drizzle,
// 	debug: true,
// 	webWorker: false,
// });
// const { db, useLiveQuery } = await letsync.connect();
// export { db, useLiveQuery };
