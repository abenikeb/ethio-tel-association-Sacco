import ProtectedModule from "../modules";
import { api } from "../../lib/api";
export default function Page() {
	return (
		<ProtectedModule
			title="Roles & permissions"
			description="Review dynamic authorization assignments."
			resource="roles"
			columns={["id", "name", "description", "permissions"]}
		/>
	);
}
