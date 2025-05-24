import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import LogoutPage from '@/app/(app)/logout/page';
import ChatPage from '@/app/(workspace)/chat/page';
import CycleDetailPage from '@/app/(workspace)/cycles/[id]/page';
import CyclesViewPage from '@/app/(workspace)/cycles/page';
import DashboardPage from '@/app/(workspace)/dashboard/page';
import DeploymentsPage from '@/app/(workspace)/deployments/page';
import EditorPage from '@/app/(workspace)/editor/page';
import { PrdDocPage } from '@/app/(workspace)/prd/[pageId]/page';
import PrdLayout from '@/app/(workspace)/prd/layout';
import PrdDefaultPage from '@/app/(workspace)/prd/page';
import AIModelsSettings from '@/app/(workspace)/settings/ai-models/page';
import ConnectedAppsSettings from '@/app/(workspace)/settings/connected-apps/page';
import SettingsLayout from '@/app/(workspace)/settings/layout';
import SettingsDefaultPage from '@/app/(workspace)/settings/page';
import SupportSettings from '@/app/(workspace)/settings/support/page';
import WorkspaceSettings from '@/app/(workspace)/settings/workspace/page';
import StatsPage from '@/app/(workspace)/stats/page';
import TaskPage from '@/app/(workspace)/tasks/[id]/page';
import TaskViewPage from '@/app/(workspace)/tasks/page';
import VersionsPage from '@/app/(workspace)/versions/page';
import OnboardingPage from '@/app/new/page';
import { Error404 } from '@/app/not-found';
import HomePage from '@/app/page';
import PrivacyPage from '@/app/privacy/page';
import TermsPage from '@/app/terms/page';
import Loading from '@/components/Loading';
import AppLayout from './app/(app)/layout';
import WorkspacesPage from './app/(app)/workspaces/page';
import WorkspaceLayout from './app/(workspace)/layout';
import AccountSettings from './app/(workspace)/settings/account/page';
import RootLayout from './app/layout';

const app = (
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<RootLayout />}>
					<Route path="/privacy" element={<PrivacyPage />} />
					<Route path="/terms" element={<TermsPage />} />
					<Route path="*" element={<Error404 />} />
				</Route>
				<Route element={<RootLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="logout" element={<LogoutPage />} />

					<Route element={<AppLayout />}>
						<Route path="workspaces" element={<WorkspacesPage />} />
						<Route path="account" element={<AccountSettings />} />
					</Route>

					<Route path="new" element={<OnboardingPage />} />
					<Route
						path="/:userSlug/:workspaceSlug"
						element={
							<Suspense fallback={<Loading />}>
								<WorkspaceLayout />
							</Suspense>
						}
					>
						<Route path="dashboard" element={<DashboardPage />} />
						<Route path="chat" element={<ChatPage />} />
						<Route path="cycles">
							<Route index element={<CyclesViewPage />} />
							<Route path=":cycleId" element={<CycleDetailPage />} />
						</Route>
						<Route path="prd" element={<PrdLayout />}>
							<Route index element={<PrdDefaultPage />} />
							<Route
								path=":pageId"
								element={
									<Suspense fallback={<Loading />}>
										<PrdDocPage />
									</Suspense>
								}
							/>
						</Route>
						<Route path="tasks">
							<Route index element={<TaskViewPage />} />
							<Route path=":taskId" element={<TaskPage />} />
						</Route>
						<Route path="workspace" element={<EditorPage />} />
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
							<Route path="support" element={<SupportSettings />} />
						</Route>
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
