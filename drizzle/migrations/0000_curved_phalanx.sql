CREATE TABLE "workspace" (
	"workspace_id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"ide" text NOT NULL,
	"tdd" boolean NOT NULL,
	CONSTRAINT "workspace_slug_unique" UNIQUE("slug")
);
