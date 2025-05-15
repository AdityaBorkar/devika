import { PiTag } from 'react-icons/pi';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';

export default function PrdSummaryCard({ version }: { version: any }) {
	return (
		<Link
			to="/prd"
			className="grid grid-cols-[1.5rem_auto] rounded-md border border-border px-2 py-2.5 text-sm"
		>
			<div
				className={cn(
					'relative mx-auto mt-1 inline-block size-3 rounded-full bg-green-600',
					version.status === 'live' && 'bg-green-600',
					version.status === 'review' && 'bg-yellow-600',
					version.status === 'draft' && 'bg-gray-600',
				)}
			/>
			<div>
				<div className="font-medium text-sm">{version.name}</div>
				<div className="inline-block text-xs text-zinc-400">
					<PiTag className="mr-1 inline-block" />
					{version.version}
				</div>
			</div>
		</Link>
	);
}
