import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import OnboardingLayout from '@/app/(app-onboarding)/layout';
import OnboardingPage from '@/app/(app-onboarding)/onboarding/page';
import CyclesPage from '@/app/(app)/cycles/page';
import DashboardPage from '@/app/(app)/dashboard/page';
import HomePage from '@/app/(app)/page';
import PRDPage from '@/app/(app)/prd/page';
import RepositoryPage from '@/app/(app)/repository/page';
import StatsPage from '@/app/(app)/stats/page';
import TaskDetailPage from '@/app/(app)/tasks/[id]/page';
import TasksPage from '@/app/(app)/tasks/page';
import AppLayout from './app/(app)/layout';
import RootLayout from './app/layout';

const elem = document.getElementById('root');
const app = (
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<RootLayout />}>
					<Route path="/" element={<HomePage />} />

					<Route element={<AppLayout />}>
						<Route path="dashboard" element={<DashboardPage />} />
						<Route path="cycles">
							<Route index element={<CyclesPage />} />
							<Route path=":cycleId" element={<CycleDetailPage />} />
						</Route>
						<Route path="prd" element={<PRDPage />} />
						<Route path="tasks">
							<Route index element={<TasksPage />} />
							<Route path=":taskId" element={<TaskDetailPage />} />
						</Route>
						<Route path="repository">
							<Route index element={<RepositoryPage />} />
							<Route path=":repositoryId" element={<RepositoryDetailPage />} />
						</Route>
						<Route path="stats" element={<StatsPage />} />
					</Route>

					<Route element={<OnboardingLayout />}>
						<Route path="onboarding" element={<OnboardingPage />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);

if (import.meta.hot) {
	const root = createRoot(elem);
	// With hot module reloading, `import.meta.hot.data` is persisted.
	import.meta.hot.data.root = root;
	root.render(app);
} else {
	// The hot module reloading API is not available in production.
	createRoot(elem).render(app);
}
