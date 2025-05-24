import { workspace } from 'drizzle/schema';
import db from '@/lib/client-db';

export default function WorkspacesPage() {
	const workspaces = db.select().from(workspace);
	console.log({ workspaces });
	return <div>{/* Project Name, GitHub, isRunning, IDE, LOGO */}</div>;
}
