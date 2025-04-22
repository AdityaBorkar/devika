import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import OnboardingLayout from '@/app/(app-onboarding)/layout';
import OnboardingPage from '@/app/(app-onboarding)/onboarding/page';
import CycleDetailPage from '@/app/(app)/cycles/[id]/page';
import CyclesPage from '@/app/(app)/cycles/page';
import DashboardPage from '@/app/(app)/dashboard/page';
import PRDPage from '@/app/(app)/prd/page';
import RepositoryProjectPage from '@/app/(app)/repository/[project-name]/page';
import RepositoryPage from '@/app/(app)/repository/page';
import StatsPage from '@/app/(app)/stats/page';
import TaskDetailPage from '@/app/(app)/tasks/[id]/page';
import TasksPage from '@/app/(app)/tasks/page';
import AppLayout from './app/(app)/layout';
import RootLayout from './app/layout';

const app = (
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<RootLayout />}>
					<Route element={<Navigate to="/dashboard" />} path="/" />

					<Route element={<AppLayout />}>
						<Route element={<DashboardPage />} path="dashboard" />
						<Route path="cycles">
							<Route element={<CyclesPage />} index />
							<Route element={<CycleDetailPage />} path=":id" />
						</Route>
						<Route element={<PRDPage />} path="prd" />
						<Route path="tasks">
							<Route element={<TasksPage />} index />
							<Route element={<TaskDetailPage />} path=":id" />
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
