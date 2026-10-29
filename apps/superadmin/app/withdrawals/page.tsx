import ProtectedModule from "../modules";
import { api } from "../../lib/api";
export default function Page() {
	return (
		<ProtectedModule
			title="Withdrawals"
			description="Review withdrawal requests without bypassing approval hierarchy."
			resource="withdrawals"
			columns={["id", "memberId", "amount", "status", "createdAt"]}
		/>
	);
}
