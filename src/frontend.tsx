import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import ChatPage from '@/app/(app)/chat/page';
import CycleDetailPage from '@/app/(app)/cycles/[id]/page';
import CyclesPage from '@/app/(app)/cycles/page';
import DashboardPage from '@/app/(app)/dashboard/page';
import HomePage from '@/app/(app)/page';
import { PrdDocPage } from '@/app/(app)/prd/[pageId]/page';
import PrdLayout from '@/app/(app)/prd/layout';
import PrdDefaultPage from '@/app/(app)/prd/page';
import StatsPage from '@/app/(app)/stats/page';
import TaskDetailPage from '@/app/(app)/tasks/[id]/page';
import TasksPage from '@/app/(app)/tasks/page';
import OnboardingLayout from '@/app/(onboarding)/layout';
import OnboardingPage from '@/app/(onboarding)/onboarding/page';
import SettingsLayout from '@/app/settings/layout';
import SettingsDefaultPage from '@/app/settings/page';
import RepoSettings from '@/app/settings/repo/page';
import WorkspaceSettings from '@/app/settings/workspace/page';
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
						<Route path="prd" element={<PrdLayout />}>
							<Route element={<PrdDefaultPage />} index />
							<Route element={<PrdDocPage />} path=":pageId" />
						</Route>
						<Route path="tasks">
							<Route element={<TasksPage />} index />
							<Route element={<TaskDetailPage />} path=":taskId" />
						</Route>
						<Route element={<StatsPage />} path="stats" />
					</Route>

					<Route path="settings" element={<SettingsLayout />}>
						<Route element={<SettingsDefaultPage />} index />
						<Route element={<RepoSettings />} path="repo" />
						<Route element={<WorkspaceSettings />} path="workspace" />
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
