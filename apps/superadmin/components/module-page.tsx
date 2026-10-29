"use client";
import { useCallback, useState } from "react";
import { DataView } from "./data-view";
import type { User } from "../lib/api";
import { Shell } from "./shell";
export function ModulePage({
	user,
	title,
	description,
	load,
	columns,
}: {
	user: User;
	title: string;
	description: string;
	load: () => Promise<unknown>;
	columns: string[];
}) {
	const [query, setQuery] = useState("");
	const [refresh, setRefresh] = useState(0);
	const loader = useCallback(() => load(), [load, refresh]);
	return (
		<Shell user={user} title={title}>
			<div className="section-head">
				<div>
					<h2>{description}</h2>
					<p style={{ color: "#70819a", fontSize: 13 }}>
						Authoritative records from the protected backend.
					</p>
				</div>
				<button
					className="button secondary"
					onClick={() => setRefresh((x) => x + 1)}>
					Refresh
				</button>
			</div>
			<div className="toolbar" style={{ marginBottom: 14 }}>
				<input
					className="input"
					placeholder="Search records"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>
			<DataView key={refresh} load={loader} columns={columns} title={title} />
		</Shell>
	);
}
