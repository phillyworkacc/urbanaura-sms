'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import AwaitButton from "@/components/AwaitButton/AwaitButton"
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import Spacing from "@/components/Spacing/Spacing"
import { useModal } from "@/components/Modal/ModalContext"
import { Trash2 } from "lucide-react"
import { formatMilliseconds } from "@/utils/date"
import { removeSubscriber } from "@/app/actions/subscriber"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function SubscriberPage ({ subscriber }: { subscriber: Subscriber }) {
   const { showModal, close } = useModal();
   const router = useRouter();

   const deleteSubscriberModalBtn = () => {
      const deleteSubscriber = async (callback: Function) => {
         const response = await removeSubscriber(subscriber.subscriberId);
         if (response) {
            close();
            router.push("/subscribers");
         } else {
            toast.error("Failed to remove subscriber: " + subscriber.phoneNumber);
            close();
            callback();
         }
      }

      showModal({
         content: <>
            <div className="text-ml full bold-600 mb-1 text-center">Delete Subscriber</div>
            <div className="text-xxs pd-1 grey-5 text-center">
               Are you sure you want to delete <b>{subscriber.phoneNumber}</b> from your sms list?
            </div>
            <div className="box full dfb wrap gap-10">
               <AwaitButton className="xxxs full pd-15 pdx-2 delete" onClick={deleteSubscriber}>
                  <Trash2 size={15} /> Delete Subscriber
               </AwaitButton>
               <button className="xxxs full pd-15 pdx-2 outline-black tiny-shadow" onClick={close}>
                  Cancel
               </button>
            </div>
         </>
      })
   }

   return (
      <AppWrapper>
         <Breadcrumb
            pages={[
               { label: "All Subscribers", href: "/subscribers" },
               { label: subscriber.phoneNumber, href: "" },
            ]}
         />
         <Spacing />
         <div className="text-xs pd-05 grey-4">Subscriber</div>
         <div className="text-l full bold-600">{subscriber.phoneNumber}</div>
         <div className="text-xxs grey-5 pd-1">
            Subscribed on {formatMilliseconds(parseInt(subscriber.dateJoined), false, false)}
         </div>
         <Spacing />
         <div className="box full pd-1">
            <button className="xxxs pd-1 pdx-2 delete" onClick={deleteSubscriberModalBtn}>
               <Trash2 size={15} /> Delete Subscriber
            </button>
         </div>
      </AppWrapper>
   )
}
