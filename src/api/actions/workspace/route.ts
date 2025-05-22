import { workspace } from "drizzle/schema/workspace";
import { eq } from "drizzle-orm";
import db from "@/lib/server-db";

export async function POST(req: Request) {
	const user = { slug: "adityaborkar" };

	const { name, tdd, ide: IDE } = await req.json();
	const ide = IDE.sort((a: string, b: string) => a.localeCompare(b)).join(",");
	const slug = `${user.slug}/${name.toLowerCase().trim().replace(/ /g, "-")}`;
	const data = { name, tdd, ide, slug };
	const ws = await db.insert(workspace).values(data);
	return new Response(JSON.stringify({ success: true, data: ws }));
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const slug = searchParams.get("slug");
	if (!slug)
		return new Response(
			JSON.stringify({ success: false, error: "Slug is required" }),
		);

	const [ws] = await db
		.select()
		.from(workspace)
		.where(eq(workspace.slug, slug));
	if (!ws)
		return new Response(
			JSON.stringify({ success: false, error: "Workspace not found" }),
		);

	return new Response(JSON.stringify({ success: true, data: ws }));
}
