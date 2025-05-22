// export const prd = sqliteTable("prd", {
//   prdId: text("prd_id").primaryKey().$defaultFn(() => createId()),
//   version: text("version").notNull(),
//   name: text("name").notNull(),
//   createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
//   closedAt: integer("closed_at", { mode: "timestamp" }),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
// });

// export const prdChanges = sqliteTable("prd_changes", {
//   prdChangeId: text("prd_change_id").primaryKey().$defaultFn(() => createId()),
//   prdId: text("prd_id").notNull(),
//   notes: text("notes").notNull(),
//   changes: text("changes").notNull(),
//   createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
//   approvedAt: integer("approved_at", { mode: "timestamp" }),
// });

// export const prdFile = sqliteTable("prd_file", {
//   fileId: text("file_id").primaryKey().$defaultFn(() => createId()),
//   prdId: text("prd_id").notNull(),
//   title: text("title").notNull(),
//   bucket: text("bucket").notNull(),
//   createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
// });

// export const prdChat = sqliteTable("prd_chat", {
//   chatId: text("chat_id").primaryKey().$defaultFn(() => createId()),
//   prdId: text("prd_id").notNull(),
//   title: text("title").notNull(),
//   bucket: text("bucket").notNull(),
//   createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
// });
