'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import ListView from "@/components/ListView/ListView";
import Spacing from "@/components/Spacing/Spacing";
import CampaignsTable from "@/components/Table/CampaignsTable";
import { CirclePlus, Megaphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CampaignsPageProps = {
	campaigns: Campaign[];
}

export default function CampaignsPage ({ campaigns }: CampaignsPageProps) {
   const router = useRouter();
   const [searchCampaigns, setSearchCampaigns] = useState("");

   return (
      <AppWrapper>
         <div className="text-xs pd-05 grey-4">Urbanaura SMS Marketing</div>
         <div className="text-l full bold-600">Campaigns</div>
         <Spacing />
         <div className="box full dfb align-center">
            <button className="xxxs pd-1 pdx-15 outline-black tiny-shadow" onClick={() => router.push('/add-campaign')}>
               <CirclePlus size={17} /> Add Campaign
            </button>
         </div>
         <Spacing />
         {campaigns.length > 0 ? (<>
            <div className="box full mb-2">
               <input 
                  type="text" 
                  className="xxs pd-11 pdx-15"
                  placeholder="Search Campaigns"
                  style={{ width: "100%", maxWidth: "400px" }}
                  value={searchCampaigns}
                  onChange={(e) => setSearchCampaigns(e.target.value)}
               />
            </div>
            <CampaignsTable
               campaigns={campaigns.filter(campaign => (
                  campaign.name.toLowerCase().includes(searchCampaigns.toLowerCase()) ||
                  campaign.message.toLowerCase().includes(searchCampaigns.toLowerCase())
               ))}
            />
         </>) : (<>
            <div className="text-xxs pd-1 grey-4 full">No Campaigns</div>
         </>)}
      </AppWrapper>
   )
}
