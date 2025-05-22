import type { WritableAtom } from "jotai";

export function Divider({
	atom,
}: {
	atom: WritableAtom<number, [number], void>;
}) {
	return (
		<div className="group relative h-full w-0.5 bg-border">
			<div
				className="-left-0.5 absolute h-full w-1.5 cursor-ew-resize bg-transparent hover:bg-blue-600/80 transition-all duration-300 delay-300"
				onMouseDown={() => {}}
				onMouseUp={() => {}}
			/>
		</div>
	);
}
