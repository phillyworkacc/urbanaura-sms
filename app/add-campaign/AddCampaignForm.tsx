"use client"
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import Spacing from "@/components/Spacing/Spacing";
import { Megaphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createCampaign } from "../actions/campaign";
import { useRouter } from "next/navigation";

export default function AddCampaignForm() {
   const [name, setName] = useState("");
   const [message, setMessage] = useState("");
   const router = useRouter();

   const submitAddCampaignForm = async (callback: Function) => {
      if (name.trim() == "") {
         toast.error("Please enter a name for the campaign");
         callback();
         return;
      }
      if (message.trim() == "") {
         toast.error("Please enter a message for the campaign");
         callback();
         return;
      }
      const campaignId = await createCampaign(name, message);
      if (campaignId) {
         toast.success("Created Campaign");
         router.push(`/campaign/${campaignId}`);
      } else {
         toast.error("Failed to create campaign");
         callback();
      }
   }

   return (
      <AppWrapper>
         <div className="text-xs pd-05 grey-4">Urbanaura SMS Marketing</div>
         <div className="text-l full bold-600">Create Campaign</div>
         <Spacing />
         <div className="box full dfb column">
            <div className="text-s bold-500 full">Campaign Name</div>
            <div className="text-xxxs grey-5 pd-05 mb-05 full">This is the name of the campaign, only you can see this</div>
            <input
               type="text" 
               className="xxs pd-15 pdx-2 full radius-15 h-35"
               placeholder="Campaign Name"
               value={name}
               onChange={e => setName(e.target.value)}
            />
         </div>
         <Spacing size={2} />
         <div className="box full dfb column">
            <div className="text-s bold-500 full">Campaign Message</div>
            <div className="text-xxxs grey-5 pd-05 mb-05 full">This is the message that goes out to all the subscribers</div>
            <textarea 
               className="xxs pd-15 pdx-2 full radius-15 h-35"
               placeholder="Campaign Message"
               value={message}
               onChange={e => setMessage(e.target.value)}
            />
         </div>
         <Spacing />
         <div className="box full pd-05">
            <AwaitButton 
               className="xxs pd-12 pdx-3"
               onClick={submitAddCampaignForm}
            ><Megaphone size={17} /> Create Campaign</AwaitButton>
         </div>
      </AppWrapper>
   )
}
