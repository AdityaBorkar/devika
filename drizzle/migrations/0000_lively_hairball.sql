CREATE TABLE `workspace` (
	`workspace_id` text PRIMARY KEY NOT NULL,
	`created_at` integer,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`ide` text NOT NULL,
	`tdd` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `workspace_slug_unique` ON `workspace` (`slug`);--> statement-breakpoint
CREATE TABLE `workspace_connection` (
	`connection_id` text PRIMARY KEY NOT NULL,
	`workspace_id` text NOT NULL,
	`is_active` integer DEFAULT true,
	`closed_at` integer,
	`created_at` integer,
	`screen_state` text,
	FOREIGN KEY (`workspace_id`) REFERENCES `workspace`(`workspace_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `workspace_state` (
	`workspace_id` text PRIMARY KEY NOT NULL,
	`current_prd_id` text,
	FOREIGN KEY (`workspace_id`) REFERENCES `workspace`(`workspace_id`) ON UPDATE no action ON DELETE cascade
);
