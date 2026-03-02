"use client"
import "@/styles/site.css"
import { UrbanAuraLogo } from "../Icons/Icon"
import { useRouter } from "next/navigation"
import { ChartBar, ChevronRight, Megaphone, Menu, MessageCirclePlus, UsersRound } from "lucide-react";
import { useModal } from "../Modal/ModalContext";
import Spacing from "../Spacing/Spacing";

export default function AppWrapper ({ children }: { children: React.ReactNode }) {
   const router = useRouter();
   const { showModal, close } = useModal();
   const links = [
      { name: "All Subscribers", href: "/subscribers", icon: <UsersRound size={17} />, color: "#008607" },
      { name: "Campaigns", href: "/campaigns", icon: <Megaphone size={17} />, color: "#0061bb" },
      { name: "Welcome Message", href: "/sign-up-message", icon: <MessageCirclePlus size={17} />, color: "#b35600" },
      { name: "Insights", href: "/insights", icon: <ChartBar size={17} />, color: "#c40079" },
   ];

   const showHeaderLinksModalBtn = () => {
      showModal({
         content: <>
            <div className="text-l full bold-600 mb-1">Navigation</div>
            <div className="box full dfb column gap-10">
               {links.map(link => (
                  <div 
                     key={link.href}
                     className="box full dfb align-center gap-10 cursor-pointer pd-1"
                     onClick={() => {
                        router.push(link.href);
                        close();
                     }}
                  >
                     <div
                        className="box fit h-fit pd-1 pdx-1 dfb align-center justify-center"
                        style={{ aspectRatio: '1', borderRadius: "100%", background: `${link.color}`, color: "white" }}
                     >{link.icon}</div>
                     <div className="box full dfb align-center gap-5">
                        <div className="text-xxs bold-600 fit">{link.name}</div>
                        <ChevronRight size={15} />
                     </div>
                  </div>
               ))}
            </div>
            <div className="box full mt-1">
               <button className="xxs pd-1 full outline-black" onClick={close}>Close</button>
            </div>
         </>
      })
   }


   return (
      <div className="app">
         <div className="app-header">
            <div className="page-container">
               <div className="box full h-full dfb align-center">
                  <div className="box fit h-fit cursor-pointer" onClick={() => router.push("/")}>
                     <UrbanAuraLogo size={43} />
                  </div>
                  <div className="box full dfb align-center justify-end">
                     <button className="outline-black no-shadow pdx-05" onClick={showHeaderLinksModalBtn}>
                        <Menu />
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div className="app-content">
            <div className="page-container">
               {children}
               <Spacing size={5} />
            </div>
         </div>
      </div>
   )
}
