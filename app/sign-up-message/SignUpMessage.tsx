"use client"
import { useState } from "react"
import { toast } from "sonner";
import { saveWelcomeSMSMessage } from "../actions/user";
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import Spacing from "@/components/Spacing/Spacing"
import AwaitButton from "@/components/AwaitButton/AwaitButton";

export default function SignUpMessagePage ({ currentMessage }: { currentMessage: string }) {
   const [message, setMessage] = useState(currentMessage);

   const saveWelcomeMessage = async (callback: Function) => {
      if (message == currentMessage) {
         callback();
         return;
      }
      if (message.trim() == "") {
         toast.error("Please enter a welcome message");
         callback();
         return;
      }
      const saved = await saveWelcomeSMSMessage(message);
      if (saved) {
         toast.success("Saved Welcome SMS Message");
      } else {
         toast.error("Failed to save");
      }
      callback();
   }

   return (
      <AppWrapper>
         <div className="text-xs pd-05 grey-4">Urbanaura SMS Marketing</div>
         <div className="text-l full bold-600">Custom Welcome SMS Message</div>
         <Spacing />
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
               onClick={saveWelcomeMessage}
            >Save Message</AwaitButton>
         </div>
      </AppWrapper>
   )
}
