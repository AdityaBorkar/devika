import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import ChatPage from '@/app/(app)/chat/page';
import CycleDetailPage from '@/app/(app)/cycles/[id]/page';
import CyclesViewPage from '@/app/(app)/cycles/page';
import DashboardPage from '@/app/(app)/dashboard/page';
import DeploymentsPage from '@/app/(app)/deployments/page';
import HomePage from '@/app/(app)/page';
import { PrdDocPage } from '@/app/(app)/prd/[pageId]/page';
import PrdLayout from '@/app/(app)/prd/layout';
import PrdDefaultPage from '@/app/(app)/prd/page';
import AIModelsSettings from '@/app/(app)/settings/ai-models/page';
import ConnectedAppsSettings from '@/app/(app)/settings/connected-apps/page';
import SettingsLayout from '@/app/(app)/settings/layout';
import SettingsDefaultPage from '@/app/(app)/settings/page';
import RepoSettings from '@/app/(app)/settings/repo/page';
import WorkspaceSettings from '@/app/(app)/settings/workspace/page';
import StatsPage from '@/app/(app)/stats/page';
import TaskPage from '@/app/(app)/tasks/[id]/page';
import TaskViewPage from '@/app/(app)/tasks/page';
import VersionsPage from '@/app/(app)/versions/page';
import OnboardingLayout from '@/app/(onboarding)/layout';
import OnboardingPage from '@/app/(onboarding)/onboarding/page';
import { Error404 } from '@/app/not-found';
import AppLayout from './app/(app)/layout';
import AccountSettings from './app/(app)/settings/account/page';
import RootLayout from './app/layout';

const app = (
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<RootLayout />}>
					<Route path="/" element={<HomePage />} />

					<Route element={<AppLayout />}>
						<Route path="dashboard" element={<DashboardPage />} />
						<Route path="chat" element={<ChatPage />} />
						<Route path="cycles">
							<Route index element={<CyclesViewPage />} />
							<Route path=":cycleId" element={<CycleDetailPage />} />
						</Route>
						<Route path="prd" element={<PrdLayout />}>
							<Route index element={<PrdDefaultPage />} />
							<Route path=":pageId" element={<PrdDocPage />} />
						</Route>
						<Route path="tasks">
							<Route index element={<TaskViewPage />} />
							<Route path=":taskId" element={<TaskPage />} />
						</Route>
						<Route path="versions" element={<VersionsPage />} />
						<Route path="deployments" element={<DeploymentsPage />} />
						<Route path="stats" element={<StatsPage />} />
						<Route path="settings" element={<SettingsLayout />}>
							<Route index element={<SettingsDefaultPage />} />
							{/* <Route path="repo" element={<RepoSettings />} /> */}
							<Route path="account" element={<AccountSettings />} />
							<Route path="workspace" element={<WorkspaceSettings />} />
							<Route path="ai-models" element={<AIModelsSettings />} />
							<Route
								path="connected-apps"
								element={<ConnectedAppsSettings />}
							/>
						</Route>
					</Route>

					<Route element={<OnboardingLayout />}>
						<Route path="onboarding" element={<OnboardingPage />} />
					</Route>

					<Route path="*" element={<Error404 />} />
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
