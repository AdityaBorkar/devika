// export const cycle = sqliteTable("cycle", {
//   cycleId: text("cycle_id").primaryKey().$defaultFn(() => createId()),
//   taskId: text("task_id").notNull(),
//   createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
//   // task relationship handled in separate relations
//   // Workspace relationship handled separately
// });
