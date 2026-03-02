import { dalDbOperation, dalRequireAuth, dalRequireAuthRedirect } from "@/dal/helpers";
import { db } from "@/db";
import { campaignsTable } from "@/db/schemas";
import { sanitiseObject } from "@/utils/sanitise";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import CampaignsPage from "./CampaignsPage";
import { desc } from "drizzle-orm";

export default async function page () {
   await dalRequireAuthRedirect();

   const campaignsData = await dalRequireAuth(() =>
      dalDbOperation(async () => {
         const res = await db.select().from(campaignsTable).orderBy(desc(campaignsTable.dateCreated));
         return res;
      })
   )

   if (campaignsData.success) {
      return <CampaignsPage campaigns={sanitiseObject(campaignsData.data)} />
   } else {
      return <LoadingPage />
   }

}