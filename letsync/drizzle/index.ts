import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const connection = pgTable('connection', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	userId: text('user_id').notNull(),
	version: integer('version').notNull(),
	lastSyncedAt: timestamp('last_synced_at').notNull(),
	createdAt: timestamp('created_at')
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const schema = pgTable('schema', {
	version: integer().notNull(),
	tag: text().primaryKey().notNull(),
	schema: text('schema').notNull(),
	createdAt: timestamp('created_at')
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const cache = pgTable('cache', {
	// TODO: Convert every "X" number of records to a Cache/CDN
	hash: text('id').primaryKey(),
	url: text('url').notNull(),
	toPointer: text('to_pointer').notNull(),
	fromPointer: text('from_pointer').notNull(),
	createdAt: timestamp('created_at')
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});

// CDC Records
// cdc: pgTable('cdc', {
// 	hash: text('id').primaryKey(),
// 	createdAt: timestamp('created_at')
// 		.$defaultFn(() => /* @__PURE__ */ new Date())
// 		.notNull(),
// }),
