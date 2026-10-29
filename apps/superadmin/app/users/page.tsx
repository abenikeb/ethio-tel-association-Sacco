import ProtectedModule from "../modules";
import { api } from "../../lib/api";
export default function Page() {
	return (
		<ProtectedModule
			title="Users"
			description="Manage institution users and staff access."
			resource="users"
			columns={["id", "name", "email", "role", "phone"]}
		/>
	);
}
