import type { IconType } from "react-icons/lib";
import {
	PiCheckCircleDuotone,
	PiCheckSquare,
	PiGear,
	PiHouse,
	PiLightbulbFilament,
	PiPlayCircle,
	PiXCircleDuotone,
} from "react-icons/pi";
import { Link, Outlet, redirect, useLocation } from "react-router";
import { ConnectionDialog } from "@/components/ConnectionDialog";
import { Dialog } from "@/components/ui/dialog";
import { DialogProvider, useDialog } from "@/contexts/DialogContext";
import useConfig from "@/hooks/useConfig";
import { cn } from "@/lib/utils";

const NAV_ITEMS_TOP = [
	{ href: "dashboard", icon: PiHouse, label: "Dashboard" },
	{ href: "prd", icon: PiLightbulbFilament, label: "PRD" },
	{ href: "tasks", icon: PiCheckSquare, label: "Tasks" },
	{ href: "cycles", icon: PiPlayCircle, label: "Cycles" },
	// { href: 'workspace', icon: PiCode, label: 'Workspace' },
	// { href: 'versions', icon: PiClockCounterClockwise, label: 'Versions' },
	// { href: 'deployments', icon: PiRocketLaunch, label: 'Deployments' },
];

const NAV_ITEMS_BOTTOM = [
	// { href: "stats", icon: PiChartPieSlice, label: "Stats" },
	{ href: "settings", icon: PiGear, label: "Settings" },
];

export default function AppLayout() {
	const dialog = useDialog();
	const config = useConfig();
	if (!config) redirect("/onboarding");

	const location = useLocation();
	const segment = location.pathname.split("/")[1];

	return (
		<DialogProvider>
			<div className="grid h-screen grid-cols-[3.5rem_auto]">
				<nav className="relative flex flex-col px-1.5 py-1">
					{NAV_ITEMS_TOP.map((item) => (
						<NavItem
							key={item.href}
							{...item}
							isActive={segment === item.href}
						/>
					))}
					<div className="grow" />
					{NAV_ITEMS_BOTTOM.map((item) => (
						<NavItem
							key={item.href}
							{...item}
							isActive={segment === item.href}
						/>
					))}
					<NavItem
						isActive={false}
						label="Client Connection"
						onClick={() => dialog.openDialog(<ConnectionDialog />)}
						data-connection-btn
					>
						<ClientConnection />
					</NavItem>
				</nav>
				<main className="my-2 mr-2 overflow-y-auto rounded-md border border-border bg-bg-primary shadow-md">
					<Outlet />
				</main>
			</div>
			<Dialog />
		</DialogProvider>
	);
}

function NavItem({
	icon: Icon,
	href,
	label,
	onClick,
	children,
	isActive,
	...props
}: {
	isActive: boolean;
	label: string;
	href?: string;
	icon?: IconType;
	children?: React.ReactNode;
	onClick?: () => void;
	[key: string]: any;
}) {
	const cue = null;
	const to = href ?? "#";
	const Component = href ? Link : "div";
	return (
		<Component
			to={to}
			onClick={onClick}
			className={cn(
				"group relative my-1 w-fit select-none rounded-md border border-transparent px-2 py-2 text-sm text-text-muted",
				"transition-all duration-200",
				isActive
					? "border-border bg-bg-secondary text-text-primary"
					: "hover:border-border hover:bg-bg-secondary/80 hover:text-text-primary/80",
			)}
			{...props}
		>
			{cue && (
				<div
					className={cn(
						"absolute top-1.75 right-1.5 size-2 rounded-full",
						cue === "error" && "bg-rose-500/80",
						cue === "warning" && "bg-amber-500/80",
						cue === "info" && "bg-sky-500/80",
						cue === "muted" && "bg-stone-300/80",
					)}
				/>
			)}
			{Icon && <Icon className="mx-auto size-5 stroke-3" />}
			{children}
			<div
				className={cn(
					"invisible absolute text-nowrap top-1.5 left-11 rounded bg-text-tertiary px-2 py-1 font-semibold text-bg-primary text-xs z-50",
					"opacity-0 transition-all duration-200",
					"group-hover:visible group-focus-visible:visible group-hover:opacity-100 group-focus-visible:opacity-100",
				)}
			>
				{label}
			</div>
		</Component>
	);
}

function ClientConnection() {
	const isConnected = false;
	return isConnected ? (
		<PiCheckCircleDuotone className="mx-auto size-5 text-green-600 " />
	) : (
		<PiXCircleDuotone className="mx-auto size-5 text-rose-500 " />
	);
}
