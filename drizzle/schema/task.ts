// export const task = sqliteTable("task", {
//   taskId: text("task_id").primaryKey().$defaultFn(() => createId()),
//   isRunning: integer("is_running", { mode: "boolean" }).default(false),
//   workspaceId: text("workspace_id").notNull().references(() => workspace.workspaceId, { onDelete: "cascade" }),
//   createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
//   // Cycle relationship handled separately
//   // dependentOn relationship handled separately
//   // subTasks relationship handled separately
// });
