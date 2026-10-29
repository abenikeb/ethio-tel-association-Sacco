"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../lib/api";
export default function Login() {
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [busy, setBusy] = useState(false);
	const router = useRouter();
	async function submit(e: FormEvent) {
		e.preventDefault();
		setBusy(true);
		setError("");
		try {
			const r = await api.login(identifier, password);
			if (!["SUPER_ADMIN", "SUPERADMIN", "ADMIN"].includes(r.user.role))
				throw new Error("This account does not have superadmin access.");
			router.replace("/");
		} catch (e: any) {
			setError(e.message);
		} finally {
			setBusy(false);
		}
	}
	return (
		<main
			style={{
				minHeight: "100vh",
				display: "grid",
				placeItems: "center",
				padding: 24,
			}}>
			<form
				className="card"
				style={{ width: "min(420px,100%)" }}
				onSubmit={submit}>
				<div className="brand" style={{ color: "#14213d", padding: 0 }}>
					<span className="mark">ET</span>
					<span>
						<b>ETHIO TEL SACCO</b>
						<small style={{ color: "#70819a" }}>Superadmin console</small>
					</span>
				</div>
				<h1 style={{ fontSize: 24, marginTop: 30 }}>Sign in securely</h1>
				<p style={{ color: "#70819a", fontSize: 13 }}>
					Use your existing administrator credentials.
				</p>
				{error && <div className="error">{error}</div>}
				<label style={{ display: "grid", gap: 7, marginTop: 18, fontSize: 13 }}>
					Email or phone
					<input
						className="input"
						required
						value={identifier}
						onChange={(e) => setIdentifier(e.target.value)}
					/>
				</label>
				<label style={{ display: "grid", gap: 7, marginTop: 14, fontSize: 13 }}>
					Password
					<input
						className="input"
						type="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button
					className="button"
					style={{ width: "100%", marginTop: 20 }}
					disabled={busy}>
					{busy ? "Signing in…" : "Sign in"}
				</button>
			</form>
		</main>
	);
}
