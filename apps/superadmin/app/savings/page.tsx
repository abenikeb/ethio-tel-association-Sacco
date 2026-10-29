import ProtectedModule from "../modules";
import { api } from "../../lib/api";
export default function Page() {
	return (
		<ProtectedModule
			title="Savings & contributions"
			description="Savings records are surfaced through accounting and dashboard services."
			resource="savings"
			columns={["id", "memberId", "amount", "type", "createdAt"]}
		/>
	);
}
