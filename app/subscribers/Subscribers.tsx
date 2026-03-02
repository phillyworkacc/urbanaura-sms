"use client"
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import Spacing from "@/components/Spacing/Spacing";
import SubscribersTable from "@/components/Table/SubscribersTable";

type SubscribersPageProps = {
	totalSubscribers: Subscriber[];
}

export default function SubscribersPage ({ totalSubscribers }: SubscribersPageProps) {
   return (
      <AppWrapper>
         <div className="text-xs pd-05 grey-4">Urbanaura SMS Marketing</div>
         <div className="text-l full bold-600">All Subscribers</div>
         <Spacing />
         <SubscribersTable subscribers={totalSubscribers} />
      </AppWrapper>
   )
}
