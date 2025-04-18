import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import AppLayout from "./app/(app)/layout";
import RootLayout from "./app/layout";

const elem = document.getElementById("root")!;
const app = (
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<RootLayout />}>
					<Route path="/" element={<HomePage />} />
					{/* <Route element={<AppLayout />}>
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Route> */}

					{/* <Route path="concerts">
					<Route index element={<ConcertsHome />} />
					<Route path=":city" element={<City />} />
					<Route path="trending" element={<Trending />} />
          </Route> */}
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
