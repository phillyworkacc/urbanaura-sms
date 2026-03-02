import { dalRequireAuthRedirect } from "@/dal/helpers";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import Link from "next/link";

export default async function page () {
	await dalRequireAuthRedirect();

	return <AppWrapper>
		<div className="text-xxl bold-600 full pd-1 mb-1">
			Page Not Found
		</div>
		<Link href={'/'} className="text-xxxs fit">
			<button className="xxxs pd-13 pdx-3">Go to Dashboard</button>
		</Link>
	</AppWrapper>
}
