// import { createClient } from '@libsql/client';
// import { workspace } from 'drizzle/schema';
// import { drizzle } from 'drizzle-orm/libsql';

// const client = createClient({
// 	url: process.env.TURSO_DATABASE_URL || 'http://localhost:3001',
// 	authToken: process.env.TURSO_AUTH_TOKEN || '',
// });

// const db = drizzle({ client, schema: { workspace } });
// export default db;

import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.NILEDB_URL);
export default db;

// TODO: Choose a database
// TODO: Run local instances, establish connection
// TODO: Migrate and sync schemas
// TODO: Sync Data
// TODO: Handle edge cases
// TODO: Make such that later, we can add an adapter to support (Postgres <-> SQLite)
