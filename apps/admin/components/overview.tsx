"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { adminApi } from "../lib/api";
export function Overview() {
	const [data, setData] = useState<any>({}),
		[error, setError] = useState("");
	useEffect(() => {
		adminApi
			.dashboard()
			.then(setData)
			.catch((e) => setError(e.message));
	}, []);
	return (
		<>
			<header className="topbar">
				<div>
					<h1>Overview</h1>
					<p>Secure operational control center.</p>
				</div>
			</header>
			<main className="main">
				{error && <div className="error">{error}</div>}
				<div className="metrics">
					{[
						["Members", "members", "/members"],
						["Loans", "loans", "/loans"],
						["Staff", "users", "/staff"],
					].map(([label, key, href]) => (
						<Link className="card metric" href={href} key={key}>
							<span>{label}</span>
							<strong>
								{Array.isArray(data[key])
									? data[key].length
									: String(data[key] ?? 0)}
							</strong>
						</Link>
					))}
				</div>
				<section className="card">
					<h2>Administration workspace</h2>
					<p>
						Use the dedicated workspaces to manage members, credit operations,
						products, staff access, governance, finance, and system
						configuration.
					</p>
				</section>
			</main>
		</>
	);
}
