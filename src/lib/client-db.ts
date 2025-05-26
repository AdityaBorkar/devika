// import { PGlite } from '@/external/pglite';
import { PGlite } from '@electric-sql/pglite';
// import { PGlite } from 'https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js';

import { workspace } from 'drizzle/schema';
import { drizzle } from 'drizzle-orm/pglite';

const client = new PGlite('idb://devika-development');

await client.query("select 'Hello world' as message;").then(console.log);
await client.query('select version();').then(console.log);

const db = drizzle({ client, schema: { workspace } });

// TODO: Migrate Database

// TODO: Run in Web Worker
// 1. Bundler Works fine
// 2. There's an issue with the Bun Dev Server

export default db;

// 4939679
