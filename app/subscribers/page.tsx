import { dalDbOperation, dalRequireAuth, dalRequireAuthRedirect } from "@/dal/helpers";
import { db } from "@/db";
import { subscribersTable } from "@/db/schemas";
import { sanitiseObject } from "@/utils/sanitise";
import SubscribersPage from "./Subscribers";
import LoadingPage from "@/components/LoadingPage/LoadingPage";

export default async function page () {
   await dalRequireAuthRedirect();

   const subscribersData = await dalRequireAuth(() =>
      dalDbOperation(async () => {
         const res = await db.select().from(subscribersTable);
         return res;
      })
   )

   if (subscribersData.success) {
      return <SubscribersPage totalSubscribers={sanitiseObject(subscribersData.data)} />
   } else {
      return <LoadingPage />
   }

}
