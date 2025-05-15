export default function RepositoryStylingFallback() {
	return (
		<div className="space-y-6 p-6">
			<div className="h-8 w-1/3 animate-pulse rounded-md bg-zinc-200" />

			<div className="space-y-4">
				<div className="h-6 w-1/4 animate-pulse rounded-md bg-zinc-200" />
				<div className="h-64 w-full animate-pulse rounded-md bg-zinc-100" />
			</div>

			<div className="space-y-4">
				<div className="flex justify-between">
					<div className="h-6 w-1/4 animate-pulse rounded-md bg-zinc-200" />
					<div className="h-10 w-1/3 animate-pulse rounded-md bg-zinc-200" />
				</div>
				<div className="h-64 w-full animate-pulse rounded-md bg-zinc-100" />
				<div className="h-64 w-full animate-pulse rounded-md bg-zinc-100" />
			</div>
		</div>
	);
}
