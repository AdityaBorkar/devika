import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router';
import { PrdScreenStateAtom } from '../store';

export default function PRDExplorerPage() {
	const ScreenState = useAtomValue(PrdScreenStateAtom);
	return <Navigate to={ScreenState.explorer.pageId || 'new'} />;
}
