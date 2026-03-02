'use client'
import './Table.css'
import { formatMilliseconds } from '../../utils/date';

type SubscribersTableProps = {
   subscribers: Subscriber[];
}

export default function SubscribersTable ({ subscribers }: SubscribersTableProps) {
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
                     <tr key={index}>
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