import ProtectedModule from "../modules";
import { api } from "../../lib/api";
export default function Page() {
	return (
		<ProtectedModule
			title="Accounting"
			description="Authoritative accounting records and ledger activity."
			resource="accounting"
			columns={["id", "account", "debit", "credit", "createdAt"]}
		/>
	);
}
