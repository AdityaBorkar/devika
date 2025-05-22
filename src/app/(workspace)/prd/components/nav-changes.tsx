import type { IconType } from 'react-icons/lib';
import { PiCheckCircle, PiFileDashed, PiFlag } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function ChangesNavigation() {
	return (
		<div className="px-4 py-2">
			<div className="">
				<Textarea>Notes</Textarea>
				<Button
					className="my-2 block w-full"
					disabled
					title="Kindly approve draft changes and complete review to proceed."
				>
					Publish
				</Button>
			</div>
			<div>
				<GroupLabel
					icon={PiFileDashed}
					label="Draft Changes"
					count={10}
					className="text-amber-800"
				/>
				<div className="px-4 text-muted-foreground text-sm">No changes</div>
				{/* <div>List</div> */}
			</div>
			<div>
				<GroupLabel
					icon={PiFlag}
					label="Review Pending"
					count={10}
					className="text-purple-800"
				/>
				<div className="px-4 text-muted-foreground text-sm">No changes</div>
				{/* <div>List</div> */}
			</div>
			<div>
				<GroupLabel
					icon={PiCheckCircle}
					label="Approved"
					count={10}
					className="text-green-800"
				/>
				<div className="px-4 text-muted-foreground text-sm">No changes</div>
				{/* <div>List</div> */}
			</div>
		</div>
	);
}

function GroupLabel({
	icon: Icon,
	label,
	count,
	className,
}: {
	icon: IconType;
	label: string;
	count: number;
	className?: string;
}) {
	return (
		<div
			className={cn(
				'mt-6 mb-1 flex flex-row items-center justify-between px-4 font-medium text-xs',
				className,
			)}
		>
			<div>
				<Icon className="-mt-0.5 mr-1 inline-block size-4" />
				{label}
			</div>
			<div>{count}</div>
		</div>
	);
}
