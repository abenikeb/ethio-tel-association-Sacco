const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
	const response = await fetch(`${API_URL}${path}`, {
		...options,
		credentials: "include",
		headers: { "Content-Type": "application/json", ...options.headers },
	});
	if (!response.ok)
		throw new Error(
			(await response.json().catch(() => null))?.error ??
				`Request failed (${response.status})`,
		);
	return response.status === 204 ? (undefined as T) : response.json();
}
const json = (method: string, body?: unknown): RequestInit => ({
	method,
	...(body === undefined ? {} : { body: JSON.stringify(body) }),
});
export type AdminUser = {
	id: number;
	name: string;
	email: string;
	role: string;
	phone?: string;
};
export type DashboardData = Record<string, unknown>;
export const adminApi = {
	login: (identifier: string, password: string) =>
		request<{ user: AdminUser }>(
			"/auth/login",
			json("POST", { identifier, password }),
		),
	session: () => request<{ user: AdminUser }>("/auth/session"),
	logout: () => request("/auth/logout", json("POST")),
	dashboard: () => request<DashboardData>("/dashboard"),
	members: (query = "") =>
		request<unknown>(`/members__${query ? `?${query}` : ""}`),
	member: (id: number) => request<unknown>(`/members/${id}`),
	updateMember: (id: number, body: unknown) =>
		request<unknown>(`/members/${id}`, json("PUT", body)),
	deleteMember: (id: number) =>
		request<unknown>(`/members/${id}`, json("DELETE")),
	loans: (query = "") => request<unknown>(`/loans${query ? `?${query}` : ""}`),
	pendingLoans: () => request<unknown>("/loans/pending"),
	approvalHistory: () =>
		request<unknown>("/loans/approval-history?pageSize=100"),
	products: () => request<unknown>("/loan-products"),
	createProduct: (formData: unknown) =>
		request<unknown>("/loan-products", json("POST", { formData })),
	updateProduct: (id: number, formData: unknown) =>
		request<unknown>(`/loan-products/${id}`, json("PUT", { formData })),
	deleteProduct: (id: number) =>
		request<unknown>(`/loan-products/${id}`, json("DELETE")),
	users: () => request<unknown>("/settings/users?limit=100"),
	createUser: (body: unknown) =>
		request<unknown>("/settings/users", json("POST", body)),
	updateUser: (id: number, body: unknown) =>
		request<unknown>(`/settings/users/${id}`, json("PUT", body)),
	deleteUser: (id: number) =>
		request<unknown>(`/settings/users/${id}`, json("DELETE")),
	roles: () => request<unknown>("/permissions/roles"),
	permissions: () => request<unknown>("/permissions"),
	createRole: (body: unknown) =>
		request<unknown>("/permissions/roles", json("POST", body)),
	updateRole: (id: number, body: unknown) =>
		request<unknown>(`/permissions/roles/${id}`, json("PUT", body)),
	deleteRole: (id: number) =>
		request<unknown>(`/permissions/roles/${id}`, json("DELETE")),
	assignRole: (userId: number, roleId: number) =>
		request<unknown>(
			`/permissions/users/${userId}/role/${roleId}`,
			json("POST"),
		),
	auditLogs: () => request<unknown>("/settings/audit-logs?limit=100"),
	activity: () => request<unknown>("/settings/user-activity-summary"),
	config: () => request<Record<string, unknown>>("/settings/system-config"),
	updateConfig: (body: unknown) =>
		request<unknown>("/settings/system-config", json("PUT", body)),
	accounting: () => request<unknown>("/accounting"),
	analytics: () => request<unknown>("/analytics"),
	withdrawals: () => request<unknown>("/withdrawals"),
	notifications: () => request<unknown>("/notifications"),
};
