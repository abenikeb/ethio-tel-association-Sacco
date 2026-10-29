import ProtectedModule from "../modules";
import { api } from "../../lib/api";
export default function Page() {
	return (
		<ProtectedModule
			title="Financial reports"
			description="Portfolio and performance analytics."
			resource="reports"
			columns={["id", "name", "value", "period", "status"]}
		/>
	);
}
