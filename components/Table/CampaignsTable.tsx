'use client'
import './Table.css'
import { formatMilliseconds } from '../../utils/date';
import { useRouter } from 'next/navigation';

type CampaignsTableProps = {
   campaigns: Campaign[];
}

export default function CampaignsTable ({ campaigns }: CampaignsTableProps) {
   const router = useRouter();
   
   return (
      <div className="video-ideas-manage">
         <div className="table-container">
            <table className="video-idea-table">
               <thead>
                  <tr id='head-row'>
                     <th>Name</th>
                     <th style={{textAlign:"center"}}>Sent</th>
                     <th style={{textAlign:"center"}}>Date Created</th>
                  </tr>
               </thead>
               <tbody>
                  {campaigns.map((campaign, index) => (
                     <tr key={index} onClick={() => router.push(`/campaign/${campaign.campaignId}`)}>
                        <td className='name'>{campaign.name}</td>
                        <td style={{textAlign:"center"}}>
                           {campaign.sent ? `Sent on ${formatMilliseconds(parseInt(campaign.dateCreated), true, true)}` : 'Not Sent'}
                        </td>
                        <td style={{textAlign:"center"}}>{formatMilliseconds(parseInt(campaign.dateCreated), true, true)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}