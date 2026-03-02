import { dalDbOperation, dalRequireAuth, dalRequireAuthRedirect } from "@/dal/helpers";
import { db } from "@/db";
import { campaignsTable } from "@/db/schemas";
import { sanitiseObject } from "@/utils/sanitise";
import { eq } from "drizzle-orm";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import CampaignPage from "./CampaignPage";

type CampaignProps = {
   params: Promise<{
      campaignId: string;
   }>
}

export async function generateMetadata ({ params }: CampaignProps) {
   await dalRequireAuthRedirect();
   const { campaignId } = await params;

   const campaignData = await db.select().from(campaignsTable)
      .where(eq(campaignsTable.campaignId, campaignId));

   return {
      title: `${campaignData[0].name} - Client Conversations`
   };
}

export default async function page ({ params }: CampaignProps) {
   await dalRequireAuthRedirect();
   const { campaignId } = await params;

   const campaignData = await dalRequireAuth(() =>
      dalDbOperation(async () => {
         const res = await db.select().from(campaignsTable)
            .where(eq(campaignsTable.campaignId, campaignId));
         return res[0];
      })
   )

   if (campaignData.success) {
      return <CampaignPage campaign={sanitiseObject(campaignData.data)} />
   } else {
      return <LoadingPage />
   }

}
