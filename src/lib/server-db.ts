import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from 'letsync/drizzle';

import { Pool } from 'pg';

const client = new Pool({
	host: 'localhost',
	port: 5432,
	user: '00000000-0000-0000-0000-000000000000',
	password: 'password',
	database: 'test',
});
const db = drizzle({ client, schema });
export default db;
