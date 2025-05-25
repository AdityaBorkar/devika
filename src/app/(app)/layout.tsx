import { Link, Outlet } from 'react-router';
import Logo from '@/../public/logo.svg';

export default function AppLayout() {
	return (
		<div>
			<header className="border-border border-b">
				<div className="mx-auto flex max-w-screen-lg items-center justify-between py-4">
					<div>
						<img src={Logo} alt="Logo" className="h-6" />
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
