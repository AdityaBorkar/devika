export function TabButton({
	label,
	value,
	activeTab,
	onTabChange,
}: {
	label: string;
	value: string;
	activeTab: string;
	onTabChange: (value: string) => void;
}) {
	return (
		<button
			className={`rounded-md border px-3 py-1 font-medium text-sm ${
				activeTab === value
					? 'border-border bg-zinc-100 dark:bg-zinc-800'
					: 'border-transparent text-zinc-500 hover:bg-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-400'
			}`}
			onClick={() => onTabChange(value)}
			type="button"
		>
			{label}
		</button>
	);
}
