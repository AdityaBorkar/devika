import { useState } from 'react';
import { useParams } from 'react-router';
import { Divider } from '@/app/(app)/prd/[pageId]/Divider';
import PrdDefaultPage from '@/app/(app)/prd/page';
import { SplitScreen } from './SplitScreen';

type TabType = {
	id: string;
	name: string;
	type: 'doc' | 'chat';
};

export function PrdDocPage() {
	const { pageId } = useParams();
	const [activeTabId, setActiveTabId] = useState(pageId);
	const leftTabs = [
		{ id: 'list-of-docs', name: 'List of Docs', type: 'doc' },
		{ id: 'list-of-docs-2', name: 'List of Docs 2', type: 'doc' },
	] as TabType[];
	const rightTabs = [] as TabType[];
	const rightTabCount = rightTabs.length;

	if (!activeTabId) return <PrdDefaultPage />;
	return (
		<div className="flex flex-row flex-nowrap">
			<SplitScreen
				tabs={leftTabs}
				activeTabId={activeTabId}
				setActiveTabId={setActiveTabId}
			/>
			{rightTabCount > 0 && <Divider />}
			{rightTabCount > 0 && (
				<SplitScreen
					tabs={rightTabs}
					activeTabId={activeTabId}
					setActiveTabId={setActiveTabId}
				/>
			)}
		</div>
	);
}
