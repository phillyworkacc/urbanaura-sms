"use client"
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import Card from "@/components/Card/Card";
import Spacing from "@/components/Spacing/Spacing";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { deleteCampaign, updateCampaign } from "@/app/actions/campaign";
import { formatMilliseconds } from "@/utils/date";
import { Play, Trash2 } from "lucide-react";
import { CSSProperties, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/Modal/ModalContext";
import { wait } from "@/utils/wait";
import { sendCampaign } from "@/app/actions/twilio";

type CampaignPageProps = {
   campaign: Campaign;
}

export default function CampaignPage({ campaign }: CampaignPageProps) {
   const [message, setMessage] = useState(campaign.message);
   const router = useRouter();
   const { showModal, close } = useModal();
   const cardStyles: CSSProperties = {
      width: "100%", padding: "15px",
      borderRadius: "13px", maxWidth: "550px"
   }

   const saveCampaignBtn = async (callback: Function) => {
      if (message.trim() == "") {
         toast.error("Please enter a message for this campaign");
         callback();
         return;
      }
      const updated = await updateCampaign(campaign.campaignId, message);
      if (updated) {
         toast.success("Saved!");
      } else {
         toast.error("Failed to save message");
      }
      callback();
   }

   const deleteCampaignBtn = async (callback: Function) => {
      const deleted = await deleteCampaign(campaign.campaignId);
      if (deleted) {
         router.push("/campaigns");
      } else {
         toast.error("Failed to delete campaign");
         callback();
      }
   }

   const sendCampaignButton = async (callback: Function) => {
      showModal({
         content: <>
            <div className="text-ml full bold-600 mb-1 text-center">Sending Campaign</div>
            <div className="text-xxs pd-1 grey-5 text-center">
               Please do not leave this page while the campaign messages are being sent to the subscribers.
            </div>
         </>
      })
      const sentCampaign = await sendCampaign(campaign.campaignId);
      close();
      if (sentCampaign) {
         toast.success("Sent Campaigns to all subscribers");
      } else {
         toast.error("Failed to send campaign to all subscribers");
      }
      callback();
   }

   return (
      <AppWrapper>
         <Breadcrumb
            pages={[
               { label: "Campaigns", href: "/campaigns" },
               { label: campaign.name, href: "" },
            ]}
         />
         <Spacing />
         <div className="text-xs pd-05 grey-4">Urbanaura SMS Marketing</div>
         <div className="text-l full bold-600">{campaign.name}</div>
         <div className="text-xxs grey-5 pd-1">
            {campaign.sent 
               ? `Sent ${formatMilliseconds(parseInt(campaign.sentOn), false, false)}`
               : <>
                  <AwaitButton 
                     className="xxxs pd-1 pdx-15" 
                     onClick={sendCampaignButton}
                  ><Play size={16} /> Send</AwaitButton>
               </>
            }
         </div>
         <Spacing />

         {(campaign.sent) ? (<>
            <Card styles={cardStyles}>
               <div className="text-xxxs grey-4 full mb-05">Campaign Message</div>
               <div className="text-xs full">{campaign.message}</div>
            </Card>
         </>) : (<>
            <div className="box full">
               <textarea 
                  className="xxs pd-15 pdx-2 full radius-15 h-35"
                  placeholder="Welcome Message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
               />
            </div>
            <div className="box full pd-05">
               <AwaitButton 
                  className="xxs pd-12 pdx-3"
                  onClick={saveCampaignBtn}
               >Save Message</AwaitButton>
            </div>
         </>)}
         <Spacing size={2} />

         <div className="text-sm bold-500 full">Delete Campaign</div>
         <div className="text-xxs grey-5 full">This is a permanent action and cannot be reversed</div>
         <div className="box full pd-1">
            <AwaitButton
               className="xxxs pd-1 pdx-2 delete"
               onClick={deleteCampaignBtn}
            >
               <Trash2 size={17} /> Delete Campaign
            </AwaitButton>
         </div>
      </AppWrapper>
   )
}
