import path from "node:path";
import type { Env } from "bun";
import type { PrismaConfig } from "prisma";

export default {
	earlyAccess: true,
	schema: path.join("prisma"),
} satisfies PrismaConfig<Env>;
