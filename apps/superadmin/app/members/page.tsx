import ProtectedModule from "../modules";
import { api } from "../../lib/api";
export default function Page() {
	return (
		<ProtectedModule
			title="Members"
			description="Institution-wide member records and profiles."
			resource="members"
			columns={["id", "memberId", "name", "email", "phone", "status"]}
		/>
	);
}
