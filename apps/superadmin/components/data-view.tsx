"use client";
import { useEffect, useState } from "react";
export function DataView({
	load,
	columns,
	title,
}: {
	load: () => Promise<unknown>;
	columns: string[];
	title: string;
}) {
	const [data, setData] = useState<unknown>(null);
	const [error, setError] = useState("");
	useEffect(() => {
		load()
			.then(setData)
			.catch((e) => setError(e.message));
	}, [load]);
	if (error) return <div className="error">{error}</div>;
	if (!data)
		return <div className="loading">Loading {title.toLowerCase()}…</div>;
	const rows = Array.isArray(data)
		? data
		: data && typeof data === "object" && Array.isArray((data as any).data)
			? (data as any).data
			: data && typeof data === "object" && Array.isArray((data as any).items)
				? (data as any).items
				: [];
	return (
		<div className="table-wrap">
			<table className="table">
				<thead>
					<tr>
						{columns.map((c) => (
							<th key={c}>{c}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.length ? (
						rows.slice(0, 100).map((row: any, i: number) => (
							<tr key={row.id ?? i}>
								{columns.map((c) => (
									<td key={c}>
										{String(row[c] ?? row[c.toLowerCase()] ?? "—")}
									</td>
								))}
							</tr>
						))
					) : (
						<tr>
							<td colSpan={columns.length}>No records available.</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
