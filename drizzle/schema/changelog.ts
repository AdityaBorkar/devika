// export const changelog = sqliteTable("changelog", {
//   version: text("version").primaryKey(),
//   notes: text("notes").notNull(),
//   changes: text("changes").notNull(),
//   closedAt: integer("closed_at", { mode: "timestamp" }),
//   createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
// });
