"use client"
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import Card from "@/components/Card/Card";
import Spacing from "@/components/Spacing/Spacing";
import { formatNumber } from "@/utils/num";
import { SubscriberMetrics } from "@/utils/subscriberMetrics";
import { ChartBar, LogOut, Megaphone, MessageCirclePlus, UsersRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";

type DashboardPageProps = {
	totalSubscribers: Subscriber[];
}

export default function DashboardPage ({ totalSubscribers }: DashboardPageProps) {
	const { data: session } = useSession();
	const router = useRouter();
	const dashboardMetrics = new SubscriberMetrics(totalSubscribers).dashboardMetrics();

	const metricCardStyles: CSSProperties = {
		width: "100%", padding: "15px",
		borderRadius: "13px", maxWidth: "450px"
	}
	
	const quickLinkCardStyles: CSSProperties = {
		width: "fit-content", padding: "8px", borderRadius: "10px",
		cursor: "pointer"
	}
	const quickLinks = [
		{ link: "/subscribers", label: "All Subscribers", icon: UsersRound, color: "#008607" },
		{ link: "/campaigns", label: "Campaigns", icon: Megaphone, color: "#0061bb" },
		{ link: "/sign-up-message", label: "Sign Up Message", icon: MessageCirclePlus, color: "#b35600" },
		{ link: "/insights", label: "Subscriber Insights", icon: ChartBar, color: "#c40079" },
	]

	return (
		<AppWrapper>
			<div className="text-l full bold-600">Urbanaura SMS Marketing</div>
			<div className="text-xs pd-05 grey-4">Welcome {session?.user?.name}</div>
			<Spacing size={2} />
			
			<div className="text-l bold-600 full">SMS Metrics</div>
			<div className="box full dfb wrap gap-10 pd-1">
				<Card styles={metricCardStyles}>
					<div className="text-xxs full grey-4 mt-05">Total Subscribers</div>
					<div className="text-xxl full bold-700 mb-05">
						{formatNumber(dashboardMetrics.all, { showDecimals: false, useCommas: true })}
					</div>
				</Card>
				<Card styles={metricCardStyles}>
					<div className="text-xxs full grey-4 mt-05">Subscribers (Today)</div>
					<div className="text-xxl full bold-700 mb-05">
						{formatNumber(dashboardMetrics.today, { showDecimals: false, useCommas: true })}
					</div>
				</Card>
				<Card styles={metricCardStyles}>
					<div className="text-xxs full grey-4 mt-05">Subscribers (This Month)</div>
					<div className="text-xxl full bold-700 mb-05">
						{formatNumber(dashboardMetrics.thisMonth, { showDecimals: false, useCommas: true })}
					</div>
				</Card>
			</div>
			<Spacing size={2} />
			
			<div className="text-l bold-600 full">Quick Links</div>
			<div className="box full dfb wrap gap-10 pd-1">
				{quickLinks.map(quickLink => (
					<Card 
						key={quickLink.link}
						styles={{
							...quickLinkCardStyles,
							backgroundColor: `${quickLink.color}1f`,
							border: `1px solid ${quickLink.color}`,
							color: quickLink.color
						}}
						cursor onClick={() => router.push(quickLink.link)}
					>
						<div className="box full dfb align-center gap-5">
							<quickLink.icon size={20} />
							<div className="text-xxs">{quickLink.label}</div>
						</div>
					</Card>
				))}
			</div>
			<Spacing size={2} />

			
			<div className="box full dfb wrap gap-10 pd-1">
				<button className="xxxs pd-1 pdx-2 signout" onClick={() => signOut()}><LogOut size={18} /> Log Out</button>
			</div>
		</AppWrapper>
	)
}
