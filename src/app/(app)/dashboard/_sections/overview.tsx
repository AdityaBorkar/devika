import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Overview() {
	return (
		<TabsContent className="space-y-4" value="overview">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Total Tasks</CardTitle>
						<CardDescription>Task count across project</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">24</div>
						<p className="text-muted-foreground text-xs">+10% from last week</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Completed</CardTitle>
						<CardDescription>Finished tasks</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">12</div>
						<p className="text-muted-foreground text-xs">50% completion rate</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle>In Progress</CardTitle>
						<CardDescription>Active development</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">8</div>
						<p className="text-muted-foreground text-xs">4 high priority</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
					<CardDescription>Latest project updates</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Activity timeline goes here...</p>
				</CardContent>
			</Card>
		</TabsContent>
	);
}
