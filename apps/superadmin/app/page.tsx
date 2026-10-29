"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shell } from "../components/shell";
import { api, type User } from "../lib/api";
export default function Page() {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState("");
	const router = useRouter();
	useEffect(() => {
		api
			.session()
			.then((r) => {
				if (!["SUPER_ADMIN", "SUPERADMIN", "ADMIN"].includes(r.user.role))
					throw new Error("Superadmin access is required");
				setUser(r.user);
			})
			.catch((e) => {
				setError(e.message);
				router.replace("/login");
			});
	}, [router]);
	if (error || !user)
		return <div className="loading">Checking secure session…</div>;
	return (
		<Shell user={user} title="Institution dashboard">
			<Dashboard />
		</Shell>
	);
}
function Dashboard() {
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState("");
	useEffect(() => {
		api
			.dashboard()
			.then(setData)
			.catch((e) => setError(e.message));
	}, []);
	const value = (...keys: string[]) => {
		let x = data;
		for (const k of keys) x = x?.[k];
		return x ?? "—";
	};
	return (
		<>
			<div className="grid">
				<div className="card">
					<h3>Total members</h3>
					<div className="metric">{value("totalMembers", "membersCount")}</div>
				</div>
				<div className="card">
					<h3>Outstanding loans</h3>
					<div className="metric">
						{value("outstandingLoans", "loanPortfolio")}
					</div>
				</div>
				<div className="card">
					<h3>Total savings</h3>
					<div className="metric">{value("totalSavings", "savings")}</div>
				</div>
				<div className="card">
					<h3>Pending approvals</h3>
					<div className="metric">
						{value("pendingApprovals", "pendingLoans")}
					</div>
				</div>
			</div>
			<section className="section">
				<div className="section-head">
					<h2>Operational health</h2>
					<span className="badge neutral">Live backend data</span>
				</div>
				{error ? (
					<div className="error">{error}</div>
				) : (
					<div className="card">
						<p>
							Use the navigation to review users, members, lending, financial
							activity, permissions, and audit history. Dashboard metrics are
							loaded from the existing backend dashboard service.
						</p>
					</div>
				)}
			</section>
		</>
	);
}
