import { createId } from '@paralleldrive/cuid2';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const workspace = pgTable('workspace', {
	workspaceId: text('workspace_id')
		.primaryKey()
		.$defaultFn(() => createId()),
	createdAt: timestamp('created_at').$defaultFn(() => new Date()),
	slug: text('slug').notNull().unique(),
	name: text('name').notNull(),
	ide: text('ide').notNull(), // array: "cursor", "github-copilot", "augment", "windsurf", "continue", "roo-code", "cline"
	tdd: boolean('tdd').notNull(),
	// createdBy: text("created_by"),
	// relations handled in separate functions
});

// export const workspaceState = sqliteTable('workspace_state', {
// 	workspaceId: text('workspace_id')
// 		.primaryKey()
// 		.references(() => workspace.workspaceId, { onDelete: 'cascade' }),
// 	currentPrdId: text('current_prd_id'),
// 	// current_prd: relation handled separately
// 	// current_task: relation handled separately
// 	// current_cycle: relation handled separately
// 	// next_task: relation handled separately
// 	// next_cycle: relation handled separately
// });

// export const workspaceConnection = sqliteTable('workspace_connection', {
// 	connectionId: text('connection_id')
// 		.primaryKey()
// 		.$defaultFn(() => createId()),
// 	workspaceId: text('workspace_id')
// 		.notNull()
// 		.references(() => workspace.workspaceId, { onDelete: 'cascade' }),
// 	isActive: integer('is_active', { mode: 'boolean' }).default(true),
// 	closedAt: integer('closed_at', { mode: 'timestamp' }),
// 	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
// 		() => new Date(),
// 	),
// 	screenState: text('screen_state'),
// 	// State: section, prd changes, etc.
// });
