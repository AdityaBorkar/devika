'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

type NavItem = {
	label: string;
	href: string;
	icon: React.ElementType;
};

export default function NavLayout({
	children,
	navItems,
	prefix = '',
	header,
}: {
	children: React.ReactNode;
	navItems: NavItem[];
	prefix?: string;
	header?: React.ReactNode;
}) {
	const currentPath = usePathname();
	return (
		<div className="flex h-full">
			<aside className="flex w-64 flex-col border-r bg-card p-4">
				<nav className="flex-1 space-y-1">
					<div className="mb-6">{header}</div>
					{navItems.map((item) => {
						const fullHref = `${prefix}${item.href}`;
						return (
							<Button
								key={item.href}
								variant={currentPath === fullHref ? 'default' : 'ghost'}
								className="!px-4 !py-5 w-full justify-start"
								asChild
							>
								<Link href={fullHref}>
									<item.icon className="size-5" />
									{item.label}
								</Link>
							</Button>
						);
					})}
				</nav>
			</aside>
			<main className="flex-1 overflow-y-auto">{children}</main>
		</div>
	);
}
