// import { createClient } from '@libsql/client-wasm';
// import { drizzle } from 'drizzle-orm/libsql/wasm';

// const client = createClient({ url: 'file:local.db' });
// const db = drizzle(client);

// export default db;

import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';

const client = new PGlite();

await client.query("select 'Hello world' as message;");
await client.query('select version();');

const db = drizzle(client);
export default db;
