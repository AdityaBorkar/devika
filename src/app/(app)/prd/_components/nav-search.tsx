import { Input } from '@/components/ui/input';

export default function SearchNavigation() {
	return (
		<div className="py-2">
			{/* TODO: VS Code Search UI */}
			<Input placeholder="Search" disabled />
			<div className="py-8 text-center text-muted-foreground text-sm">
				This feature is under development.
			</div>
		</div>
	);
}
