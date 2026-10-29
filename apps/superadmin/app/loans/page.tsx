import ProtectedModule from "../modules";
import { api } from "../../lib/api";
export default function Page() {
	return (
		<ProtectedModule
			title="Loans"
			description="Portfolio visibility and approval operations."
			resource="loans"
			columns={["id", "memberId", "amount", "status", "createdAt"]}
		/>
	);
}
