"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	LayoutDashboard,
	Users,
	GitBranch,
	ShieldCheck,
	UserRound,
	Landmark,
	CreditCard,
	PiggyBank,
	ArrowDownToLine,
	ReceiptText,
	Settings,
	FileClock,
	LogOut,
} from "lucide-react";
import { api, type User } from "../lib/api";
const nav = [
	{ href: "/", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/users", label: "Users", icon: Users },
	{ href: "/branches", label: "Branches", icon: GitBranch },
	{ href: "/roles", label: "Roles & permissions", icon: ShieldCheck },
	{ href: "/members", label: "Members", icon: UserRound },
	{ href: "/loans", label: "Loans", icon: CreditCard },
	{ href: "/savings", label: "Savings", icon: PiggyBank },
	{ href: "/withdrawals", label: "Withdrawals", icon: ArrowDownToLine },
	{ href: "/accounting", label: "Accounting", icon: Landmark },
	{ href: "/reports", label: "Reports", icon: ReceiptText },
	{ href: "/audit", label: "Audit log", icon: FileClock },
	{ href: "/settings", label: "System settings", icon: Settings },
];
export function Shell({
	user,
	children,
	title,
}: {
	user: User;
	children: React.ReactNode;
	title: string;
}) {
	const path = usePathname();
	const router = useRouter();
	return (
		<div className="app">
			<aside className="sidebar">
				<Link href="/" className="brand">
					<span className="mark">ET</span>
					<span>
						<b>ETHIO TEL SACCO</b>
						<small>Superadmin console</small>
					</span>
				</Link>
				<nav className="nav">
					{nav.map(({ href, label, icon: Icon }) => (
						<Link
							className={path === href ? "active" : ""}
							href={href}
							key={href}>
							<Icon size={16} />
							<span>{label}</span>
						</Link>
					))}
				</nav>
				<div className="user">
					<b>{user.name}</b>
					<small>{user.role?.replaceAll("_", " ")}</small>
					<button
						className="signout"
						onClick={async () => {
							await api.logout();
							router.replace("/login");
						}}>
						<LogOut size={14} /> Sign out
					</button>
				</div>
			</aside>
			<main className="main">
				<header className="topbar">
					<div>
						<h1>{title}</h1>
						<p>Institution-wide operations and controls</p>
					</div>
					<span className="badge">Secure session</span>
				</header>
				<div className="content">{children}</div>
			</main>
		</div>
	);
}
