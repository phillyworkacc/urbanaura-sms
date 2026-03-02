"use client"
import AwaitButton from "@/components/AwaitButton/AwaitButton"
import { UrbanAuraWhiteLogo } from "@/components/Icons/Icon"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginForm () {
   const router = useRouter();
   const [password, setPassword] = useState("");

   const loginFormSubmit = async (callback: Function) => {
      if (password == "") {
         toast.error("Please enter a password");
         callback();
         return;
      }
      const response = await signIn("credentials", { password, redirect: false });
      if (response?.error) {
         toast.error("Incorrect password!");
         callback();
         return;
      }
      router.push("/");
   }

   return (
      <div className="box full h-full dfb column gap-10 pd-2 pdx-2">
         <div className="box full pd-1 dfb align-center justify-center mt-3">
            <UrbanAuraWhiteLogo size={50} />
         </div>
         <div className="text-xs full grey-5 text-center">
            Please enter the password below if you are an <b>UrbanAura Admin</b>
         </div>
         <div className="box full mt-1 dfb align-center justify-center">
            <input
               type="password"
               className="xxs pd-13 pdx-2 full"
               placeholder="Password"
               style={{ maxWidth: "400px" }}
               onChange={e => setPassword(e.target.value)}
               value={password}
            />
         </div>
         <div className="box full dfb align-center justify-center">
            <AwaitButton 
               className="xxs pd-13 full"
               onClick={loginFormSubmit}
               style={{ maxWidth: "400px" }}
            >Sign In</AwaitButton>
         </div>
      </div>
   )
}
