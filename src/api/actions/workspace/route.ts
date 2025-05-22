import prisma from "@/lib/db";

export async function POST(req: Request) {
	const user = { slug: "adityaborkar" };

	const { name, tdd, ide: IDE } = await req.json();
	const ide = IDE.sort((a: string, b: string) => a.localeCompare(b)).join(",");
	const slug = `${user.slug}/${name.toLowerCase().trim().replace(/ /g, "-")}`;
	const data = { name, tdd, ide, slug };
	const workspace = await prisma.workspace.create({ data });
	return new Response(JSON.stringify({ success: true, data: workspace }));
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const slug = searchParams.get("slug");
	if (!slug)
		return new Response(
			JSON.stringify({ success: false, error: "Slug is required" }),
		);

	const workspace = await prisma.workspace.findUnique({ where: { slug } });
	if (!workspace)
		return new Response(
			JSON.stringify({ success: false, error: "Workspace not found" }),
		);

	return new Response(JSON.stringify({ success: true, data: workspace }));
}
