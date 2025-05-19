import type { WritableAtom } from 'jotai';

export function Divider({
	atom,
}: {
	atom: WritableAtom<number, [number], void>;
}) {
	return (
		<div className="group relative h-full w-0.5 bg-border">
			<div
				className="-left-1 absolute h-full w-2.5 cursor-ew-resize bg-transparent hover:bg-bg-tertiary/80"
				onMouseDown={() => {}}
				onMouseUp={() => {}}
			/>
		</div>
	);
}
