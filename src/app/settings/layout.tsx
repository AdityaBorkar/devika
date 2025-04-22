import { Outlet } from 'react-router';

export default function SettingsLayout() {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="font-bold text-2xl">Settings</h1>
			<Outlet />
		</div>
	);
}
