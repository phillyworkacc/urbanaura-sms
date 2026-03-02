'use client'
import AppWrapper from "../AppWrapper/AppWrapper"
import LoadingCard from "../Card/LoadingCard"
import Spacing from "../Spacing/Spacing"

export default function LoadingPage() {
   return (
      <AppWrapper>
         {Array.from({ length: 3 }, (_,i) => (i+1)).map(i => (
            <div className="box full" key={`loading-box-${i}`}>
               <LoadingCard styles={{ width: "100%", height: "150px", borderRadius: "20px" }} />
               <Spacing />
            </div>
         ))}
      </AppWrapper>
   )
}
