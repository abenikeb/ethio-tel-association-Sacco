"use client";
import { useEffect, useState } from "react";
import { api, type User } from "../../lib/api";
import { Shell } from "../../components/shell";
export default function Page() {
	const [user, setUser] = useState<User | null>(null);
	const [config, setConfig] = useState<any>(null);
	const [error, setError] = useState("");
	useEffect(() => {
		api
			.session()
			.then((r) => setUser(r.user))
			.catch(() => location.replace("/login"));
		api
			.config()
			.then(setConfig)
			.catch((e) => setError(e.message));
	}, []);
	if (!user) return <div className="loading">Loading secure session…</div>;
	return (
		<Shell user={user} title="System settings">
			<div className="section-head">
				<div>
					<h2>Institution configuration</h2>
					<p style={{ color: "#70819a", fontSize: 13 }}>
						Only settings exposed by the existing backend are shown.
					</p>
				</div>
			</div>
			{error && <div className="error">{error}</div>}
			<pre
				className="card"
				style={{ whiteSpace: "pre-wrap", overflow: "auto" }}>
				{config ? JSON.stringify(config, null, 2) : "Loading configuration…"}
			</pre>
		</Shell>
	);
}
