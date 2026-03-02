import { dalDbOperation, dalRequireAuth, dalRequireAuthRedirect } from "@/dal/helpers";
import { db } from "@/db";
import { automationsTable } from "@/db/schemas";
import { sanitiseObject } from "@/utils/sanitise";
import SignUpMessage from "./SignUpMessage";
import LoadingPage from "@/components/LoadingPage/LoadingPage";

export default async function page () {
   await dalRequireAuthRedirect();

   const welcomeSMSMessageData = await dalRequireAuth(() =>
      dalDbOperation(async () => {
         const res = await db.select().from(automationsTable).limit(1);
         return res[0];
      })
   )
   
   if (welcomeSMSMessageData.success) {
      return <SignUpMessage currentMessage={sanitiseObject(welcomeSMSMessageData.data).welcomeText} />
   } else {
      return <LoadingPage />
   }
}
