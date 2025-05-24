import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({
	url: 'http://localhost:3001',
	authToken: '',
	// syncUrl: "http://localhost:3001",
	syncInterval: 5,
});

// client.sync();

const db = drizzle({ client });
export default db;
