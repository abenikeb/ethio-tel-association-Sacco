const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
export type User = {
	id: number;
	name: string;
	email: string;
	role: string;
	phone?: string;
};
async function request<T>(path: string, options: RequestInit = {}) {
	const res = await fetch(`${API_URL}${path}`, {
		...options,
		credentials: "include",
		headers: { "Content-Type": "application/json", ...options.headers },
	});
	if (!res.ok)
		throw new Error(
			(await res.json().catch(() => null))?.error ??
				`Request failed (${res.status})`,
		);
	return res.status === 204 ? (undefined as T) : (res.json() as Promise<T>);
}
const json = (method: string, body?: unknown): RequestInit => ({
	method,
	...(body === undefined ? {} : { body: JSON.stringify(body) }),
});
export const api = {
	session: () => request<{ user: User }>("/auth/session"),
	login: (identifier: string, password: string) =>
		request<{ user: User }>(
			"/auth/login",
			json("POST", { identifier, password }),
		),
	logout: () => request("/auth/logout", json("POST")),
	dashboard: () => request<unknown>("/dashboard"),
	users: () => request<unknown>("/settings/users?limit=100"),
	createUser: (body: unknown) =>
		request<unknown>("/settings/users", json("POST", body)),
	updateUser: (id: number, body: unknown) =>
		request<unknown>(`/settings/users/${id}`, json("PUT", body)),
	roles: () => request<unknown>("/permissions/roles"),
	permissions: () => request<unknown>("/permissions"),
	createRole: (body: unknown) =>
		request<unknown>("/permissions/roles", json("POST", body)),
	updateRole: (id: number, body: unknown) =>
		request<unknown>(`/permissions/roles/${id}`, json("PUT", body)),
	members: (query = "") =>
		request<unknown>(`/members__${query ? `?${query}` : ""}`),
	loans: (query = "") => request<unknown>(`/loans${query ? `?${query}` : ""}`),
	products: () => request<unknown>("/loan-products"),
	withdrawals: () => request<unknown>("/withdrawals"),
	accounting: () => request<unknown>("/accounting"),
	analytics: () => request<unknown>("/analytics"),
	notifications: () => request<unknown>("/notifications"),
	config: () => request<unknown>("/settings/system-config"),
	updateConfig: (body: unknown) =>
		request<unknown>("/settings/system-config", json("PUT", body)),
	audit: () => request<unknown>("/settings/audit-logs?limit=100"),
};
