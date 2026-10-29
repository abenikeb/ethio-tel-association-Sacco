import ProtectedModule from "../modules";
import { api } from "../../lib/api";
export default function Page() {
	return (
		<ProtectedModule
			title="Audit log"
			description="Protected administrative activity history."
			resource="audit"
			columns={["id", "action", "actor", "entity", "createdAt"]}
		/>
	);
}
