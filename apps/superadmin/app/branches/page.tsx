import ProtectedModule from "../modules";
export default function Page() {
	return (
		<ProtectedModule
			title="Branches"
			description="Branch management is not exposed by the current backend yet."
			resource="branches"
			columns={["id", "name", "status", "manager"]}
		/>
	);
}
