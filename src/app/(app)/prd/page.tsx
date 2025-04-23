import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router';
import { PrdScreenStateAtom } from './store';

export default function PRDPage() {
	const { tab, explorer } = useAtomValue(PrdScreenStateAtom);
	return (
		<Navigate
			to={
				tab === 'explorer' ? `/prd/explorer/${explorer.pageId}` : `/prd/${tab}`
			}
		/>
	);
}
