import { useParams } from "react-router";
import { $fetch } from "@/lib/$fetch";

export default async function useWorkspace() {
	const { userSlug, workspaceSlug } = useParams();
	const slug = `${userSlug}/${workspaceSlug}`;
	const workspace = await $fetch("GET", "/api/workspaces", { slug });

	// TODO: Get user & check if authorized.
	// TODO: ESTABLISH-CONNECTION: Sync stores using websockets / SSE.

	return workspace;
}
