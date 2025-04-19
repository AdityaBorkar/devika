import { Provider } from 'jotai';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { Outlet } from 'react-router';

import './globals.css';

// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
// 	variable: "--font-geist-sans",
// 	subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
// 	variable: "--font-geist-mono",
// 	subsets: ["latin"],
// });

export default function RootLayout() {
	return (
		<Provider>
			<NuqsAdapter>
				<Outlet />
			</NuqsAdapter>
		</Provider>
	);
}
