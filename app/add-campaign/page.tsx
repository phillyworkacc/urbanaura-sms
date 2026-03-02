import { dalRequireAuthRedirect } from "@/dal/helpers";
import AddCampaignForm from "./AddCampaignForm";

export default async function page () {
   await dalRequireAuthRedirect();
   return <AddCampaignForm />
}