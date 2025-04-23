import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import ChatPage from '@/app/(app)/chat/page';
import CycleDetailPage from '@/app/(app)/cycles/[id]/page';
import CyclesPage from '@/app/(app)/cycles/page';
import DashboardPage from '@/app/(app)/dashboard/page';
import HomePage from '@/app/(app)/page';
import { PRDExplorerDocPage } from '@/app/(app)/prd/explorer/[pageId]/page';
import PRDExplorerPage from '@/app/(app)/prd/explorer/page';
import PRDLayout from '@/app/(app)/prd/layout';
import PRDPage from '@/app/(app)/prd/page';
import PRDSearchPage from '@/app/(app)/prd/search/page';
import PRDVersioningPage from '@/app/(app)/prd/versioning/page';
import RepositoryProjectPage from '@/app/(app)/repository/[project-name]/page';
import RepositoryPage from '@/app/(app)/repository/page';
import StatsPage from '@/app/(app)/stats/page';
import TaskDetailPage from '@/app/(app)/tasks/[id]/page';
import TasksPage from '@/app/(app)/tasks/page';
import OnboardingLayout from '@/app/(onboarding)/layout';
import OnboardingPage from '@/app/(onboarding)/onboarding/page';
import AppLayout from './app/(app)/layout';
import RootLayout from './app/layout';

const app = (
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<RootLayout />}>
					<Route element={<HomePage />} path="/" />

					<Route element={<AppLayout />}>
						<Route element={<DashboardPage />} path="dashboard" />
						<Route element={<ChatPage />} path="chat" />
						<Route path="cycles">
							<Route element={<CyclesPage />} index />
							<Route element={<CycleDetailPage />} path=":cycleId" />
						</Route>
						<Route path="prd" element={<PRDLayout />}>
							<Route element={<PRDPage />} index />
							<Route path="explorer">
								<Route element={<PRDExplorerPage />} index />
								<Route element={<PRDExplorerDocPage />} path=":pageId" />
							</Route>
							<Route path="search" element={<PRDSearchPage />} />
							<Route path="versioning" element={<PRDVersioningPage />} />
						</Route>
						<Route path="tasks">
							<Route element={<TasksPage />} index />
							<Route element={<TaskDetailPage />} path=":taskId" />
						</Route>
						<Route path="repository">
							<Route element={<RepositoryPage />} index />
							<Route element={<RepositoryProjectPage />} path=":projectName" />
						</Route>
						<Route element={<StatsPage />} path="stats" />
					</Route>

					<Route element={<OnboardingLayout />}>
						<Route element={<OnboardingPage />} path="onboarding" />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);

const elem = document.getElementById('root');
if (!elem) throw new Error('Root element not found');

if (import.meta.hot) {
	const root = createRoot(elem);
	// With hot module reloading, `import.meta.hot.data` is persisted.
	import.meta.hot.data.root = root;
	root.render(app);
} else {
	// The hot module reloading API is not available in production.
	createRoot(elem).render(app);
}
