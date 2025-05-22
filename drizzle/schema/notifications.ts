// export const notifications = sqliteTable("notifications", {
//   notificationId: text("notification_id").primaryKey().$defaultFn(() => createId()),
//   workspaceId: text("workspace_id").notNull().references(() => workspace.workspaceId, { onDelete: "cascade" }),
//   createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
// });
