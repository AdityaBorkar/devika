// export const user = sqliteTable("user", {
//   userId: text("user_id").primaryKey().$defaultFn(() => createId()),
//   name: text("name").notNull(),
//   email: text("email").notNull().unique(),
//   avatarUrl: text("avatar_url"),
//   createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
//   // workspaceConnections handled in relationships
// });
