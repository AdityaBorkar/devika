import { motion } from "motion/react";
import type { IconType } from "react-icons";
import {
	PiArrowUpRight,
	PiChatCircleText,
	PiCirclesThree,
	PiCube,
	PiDesktop,
	PiDiscordLogo,
	PiHeadset,
	PiNotebook,
	PiNotepad,
	PiUser,
} from "react-icons/pi";
import { Link, Outlet } from "react-router";
import { cn } from "@/lib/utils";

export default function SettingsLayout() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.2 }}
			className="grid h-full grid-cols-[12rem_auto]"
		>
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
					<NavLink href="/settings/support" icon={PiHeadset}>
						Support
					</NavLink>
				</div>
				<div className="flex flex-col gap-1">
					<NavLink href="/docs" icon={PiNotebook} external>
						Documentation
					</NavLink>
					<NavLink href="/release-notes" icon={PiNotepad} external>
						Release Notes
					</NavLink>
					<NavLink href="/discord" icon={PiDiscordLogo} external>
						Community
					</NavLink>
					<NavLink href="/feedback" icon={PiChatCircleText} external>
						Feedback
					</NavLink>
				</div>
			</nav>
			<Outlet />
		</motion.div>
	);
}

function NavLink({
	icon: Icon,
	children,
	href,
	external = false,
}: {
	children: React.ReactNode;
	icon: IconType;
	href: string;
	external?: boolean;
}) {
	return (
		<Link
			to={href}
			target={external ? "_blank" : undefined}
			className={cn(
				"rounded gap-2 flex flex-row items-center  px-4 py-2 text-left text-text-secondary text-xs hover:bg-bg-tertiary",
				external && "cursor-pointer *:cursor-pointer",
			)}
		>
			<Icon className="size-4" />
			{children}
			{external && <PiArrowUpRight className="ml-auto size-4" />}
		</Link>
	);
}
