import { Link, Outlet } from 'react-router';
import Logo from '@/assets/logo.svg';

export default function AppLayout() {
	return (
		<div>
			<header className="border-border border-b">
				<div className="mx-auto flex max-w-screen-lg items-center justify-between">
					<div>
						<img src={Logo} alt="Logo" className="h-14 py-2" />
					</div>
					<div className="flex items-center gap-8">
						<Link to="/workspaces">Workspaces</Link>
						<Link to="/account">Account</Link>
					</div>
				</div>
			</header>
			<Outlet />
		</div>
	);
}
