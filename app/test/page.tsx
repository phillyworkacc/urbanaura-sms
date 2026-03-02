'use client'
import { useState } from "react";
import { toast } from "sonner";

export default function page() {
   const [phoneNumber, setPhoneNumber] = useState("");

   function isValidUKMobile(number: string) {
      const cleaned = number.replace(/[\s-]/g, '');
      return /^(?:\+44|0)7\d{9}$/.test(cleaned);
   }
   
   const signUpSMS = async () => {
      if (phoneNumber.trim() == "") {
         toast.error("Please enter a phone number")
         return;
      }
      if (!isValidUKMobile(phoneNumber)) {
         toast.error("Enter a valid UK phone number")
         return;
      }
      const response = await fetch("/api/sms/signup", {
         method: "POST",
         body: JSON.stringify({ phoneNumber })
      });
      const result = await response.json();
      if (result.success) {
         toast.success("Signed Up");
      }
   }

   return (
      <div className='box full h-full pd-5 pdx-5'>
         <div className="box full pd-1">
            <input 
               type="text" 
               className="xxs pd-1 pdx-15" 
               placeholder='Phone Number' 
               value={phoneNumber} 
               onChange={e => setPhoneNumber(e.target.value)}
            />
         </div>
         <button onClick={signUpSMS}>Sign Up</button>
      </div>
   )
}
