import { PiBoxArrowDown, PiBoxArrowUp } from "react-icons/pi";
import { Link } from "react-router";

export default function WorkspaceSettings() {
	return (
		<div>
			<Link to="/settings/import-profile" className="">
				<PiBoxArrowUp className="-mt-0.5" />
				Import VSC Profile
			</Link>
			<Link to="/settings/export-profile" className="">
				<PiBoxArrowDown className="-mt-0.5" />
				Export VSC Profile
			</Link>
		</div>
	);
}

// Data & Shared Links
