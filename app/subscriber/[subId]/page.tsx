import { dalDbOperation, dalRequireAuth, dalRequireAuthRedirect } from "@/dal/helpers";
import { db } from "@/db";
import { subscribersTable } from "@/db/schemas";
import { sanitiseObject } from "@/utils/sanitise";
import { eq } from "drizzle-orm";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import SubscriberPage from "./SubscriberPage";

type CampaignProps = {
   params: Promise<{
      subId: string;
   }>
}

export async function generateMetadata ({ params }: CampaignProps) {
   await dalRequireAuthRedirect();
   const { subId } = await params;

   const subscriberData = await db.select().from(subscribersTable)
      .where(eq(subscribersTable.subscriberId, subId));

   return {
      title: `${subscriberData[0].phoneNumber} - Subscriber`
   };
}

export default async function page ({ params }: CampaignProps) {
   await dalRequireAuthRedirect();
   const { subId } = await params;

   const subscriberData = await dalRequireAuth(() =>
      dalDbOperation(async () => {
         const res = await db.select().from(subscribersTable)
            .where(eq(subscribersTable.subscriberId, subId));
         return res[0];
      })
   )

   if (subscriberData.success) {
      return <SubscriberPage subscriber={sanitiseObject(subscriberData.data)} />
   } else {
      return <LoadingPage />
   }

}
