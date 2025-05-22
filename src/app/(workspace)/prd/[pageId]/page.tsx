import { useAtomValue } from "jotai";
import { Divider } from "@/app/(workspace)/prd/[pageId]/components/Divider";
import PrdDefaultPage from "@/app/(workspace)/prd/page";
import {
	PrdActiveTabIdAtom,
	PrdLeftTabsAtom,
	PrdRightTabsAtom,
	PrdRightWidthAtom,
} from "@/app/(workspace)/prd/store";
import { SplitScreen } from "./components/SplitScreen";

export function PrdDocPage() {
	return (
		<div className="flex flex-row flex-nowrap">
			<SplitScreen
				fallback={<PrdDefaultPage />}
				atoms={{
					tabs: PrdLeftTabsAtom,
					activeTabId: PrdActiveTabIdAtom,
				}}
			/>
			<RightSplitScreen />
		</div>
	);
}

function RightSplitScreen() {
	const rightWidth = useAtomValue(PrdRightWidthAtom);
	return (
		<>
			<Divider atom={PrdRightWidthAtom} />
			<SplitScreen
				width={rightWidth}
				fallback={null}
				atoms={{
					tabs: PrdRightTabsAtom,
					activeTabId: PrdActiveTabIdAtom,
				}}
			/>
		</>
	);
}
