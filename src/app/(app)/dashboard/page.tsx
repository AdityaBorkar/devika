import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardPage() {
	return (
		<div className="space-y-6 p-6">
			<h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>

			<Tabs className="space-y-4" defaultValue="overview">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
					<TabsTrigger value="reports">Reports</TabsTrigger>
				</TabsList>

				<TabsContent className="space-y-4" value="analytics">
					<Card>
						<CardHeader>
							<CardTitle>Analytics Dashboard</CardTitle>
							<CardDescription>Project performance metrics</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Analytics content goes here...</p>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent className="space-y-4" value="reports">
					<Card>
						<CardHeader>
							<CardTitle>Reports</CardTitle>
							<CardDescription>Project reports and exports</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Reports content goes here...</p>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
