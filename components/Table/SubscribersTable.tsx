'use client'
import './Table.css'
import { formatMilliseconds } from '../../utils/date';
import { useRouter } from 'next/navigation';

type SubscribersTableProps = {
   subscribers: Subscriber[];
}

export default function SubscribersTable ({ subscribers }: SubscribersTableProps) {
   const router = useRouter();
   
   return (
      <div className="video-ideas-manage">
         <div className="table-container">
            <table className="video-idea-table">
               <thead>
                  <tr id='head-row'>
                     <th>Phone Number</th>
                     <th style={{textAlign:"center"}}>Join Date</th>
                  </tr>
               </thead>
               <tbody>
                  {subscribers.map((subscriber, index) => (
                     <tr key={index} onClick={() => router.push(`/subscriber/${subscriber.subscriberId}`)}>
                        <td className='name'>{subscriber.phoneNumber}</td>
                        <td style={{textAlign:"center"}}>{formatMilliseconds(parseInt(subscriber.dateJoined), true, true)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}