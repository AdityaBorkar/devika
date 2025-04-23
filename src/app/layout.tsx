import { Provider } from 'jotai';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { Outlet } from 'react-router';

import './globals.css';

export default function RootLayout() {
	return (
		<Provider>
			<NuqsAdapter>
				<Outlet />
			</NuqsAdapter>
		</Provider>
	);
}
