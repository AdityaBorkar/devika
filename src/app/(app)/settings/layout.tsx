import type { IconType } from 'react-icons';
import {
	PiBoxArrowDown,
	PiBoxArrowUp,
	PiCirclesThree,
	PiCommand,
	PiCube,
	PiDesktop,
	PiUser,
} from 'react-icons/pi';
import { Link, Outlet } from 'react-router';

export default function SettingsLayout() {
	return (
		<div className="grid h-full grid-cols-[12rem_auto]">
			<nav className="flex flex-col justify-between border-border border-r px-2 py-2">
				<div className="flex flex-col gap-0.5">
					<NavLink href="/settings/account" icon={PiUser}>
						Account
					</NavLink>
					<NavLink href="/settings/workspace" icon={PiDesktop}>
						Workspace
					</NavLink>
					<NavLink href="/settings/ai-models" icon={PiCirclesThree}>
						AI Models
					</NavLink>
					<NavLink href="/settings/connected-apps" icon={PiCube}>
						Connected Apps
					</NavLink>
				</div>
				<div className="flex flex-col gap-1">
					<NavLink href="/settings/import-profile" icon={PiBoxArrowUp}>
						Import VSCode Profile
					</NavLink>
					<NavLink href="/settings/export-profile" icon={PiBoxArrowDown}>
						Export VSCode Profile
					</NavLink>
				</div>
			</nav>
			<Outlet />
		</div>
	);
}

function NavLink({
	icon: Icon,
	children,
	href,
}: {
	children: React.ReactNode;
	icon: IconType;
	href: string;
}) {
	return (
		<Link
			to={href}
			className="rounded px-2 py-2 text-left text-xs text-zinc-300 hover:bg-zinc-700"
		>
			<Icon className="-mt-0.5 mr-2 inline-block size-4" />
			{children}
		</Link>
	);
}
