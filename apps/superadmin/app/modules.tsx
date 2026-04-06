"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shell } from "../components/shell";
import { ModulePage } from "../components/module-page";
import { api, type User } from "../lib/api";
const loads: Record<string, () => Promise<unknown>> = {
	users: api.users,
	members: api.members,
	loans: api.loans,
	savings: api.accounting,
	withdrawals: api.withdrawals,
	accounting: api.accounting,
	reports: api.analytics,
	audit: api.audit,
	roles: api.roles,
	branches: async () => [],
};
export default function ProtectedModule({
	title,
	description,
	resource,
	columns,
}: {
	title: string;
	description: string;
	resource: string;
	columns: string[];
}) {
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();
	useEffect(() => {
		api
			.session()
			.then((r) => {
				if (!["SUPER_ADMIN", "SUPERADMIN", "ADMIN"].includes(r.user.role))
					throw new Error();
				setUser(r.user);
			})
			.catch(() => router.replace("/login"));
	}, [router]);
	if (!user) return <div className="loading">Checking secure session…</div>;
	return (
		<ModulePage
			user={user}
			title={title}
			description={description}
			load={loads[resource] ?? (async () => [])}
			columns={columns}
		/>
	);
}
