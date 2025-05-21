import prisma from "@/lib/db";

export async function POST(req: Request) {
	const { name, tdd, ide } = await req.json();
	const workspace = await prisma.workspace.create({
		data: { name, tdd, ide },
	});
	return new Response(
		JSON.stringify({
			success: true,
			data: workspace,
		}),
	);
}
