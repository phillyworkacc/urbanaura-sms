'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import Chart from "@/components/Chart/Chart";
import Select from "@/components/Select/Select";
import Spacing from "@/components/Spacing/Spacing";
import { SubscriberMetrics } from "@/utils/subscriberMetrics";
import { useEffect, useState } from "react";

type InsightsPageProps = {
	totalSubscribers: Subscriber[];
}

type ChartInfo = {
   data: any[];
   xDataKey: string;
   yDataKey: string;
}

export default function InsightsPage({ totalSubscribers }: InsightsPageProps) {
   const subscribersChartData = new SubscriberMetrics(totalSubscribers);
   const [chartOrganizer, setChartOrganizer] = useState("Today");
   const [chartInfo, setChartInfo] = useState<ChartInfo>({ data: subscribersChartData.chartToday(), xDataKey: "hour", yDataKey: "totalSubscribers" });

   useEffect(() => {
      if (chartOrganizer == "Today") {
         setChartInfo({ data: subscribersChartData.chartToday(), xDataKey: "hour", yDataKey: "totalSubscribers" })
      } else if (chartOrganizer == "Last 7 Days") {
         setChartInfo({ data: subscribersChartData.chartLast7Days(), xDataKey: "date", yDataKey: "totalSubscribers" })
      } else if (chartOrganizer == "Last 30 Days") {
         setChartInfo({ data: subscribersChartData.chartLast30Days(), xDataKey: "date", yDataKey: "totalSubscribers" })
      } else if (chartOrganizer == "This Month") {
         setChartInfo({ data: subscribersChartData.chartThisMonth(), xDataKey: "date", yDataKey: "totalSubscribers" })
      } else if (subscribersChartData.getAllYears().includes(chartOrganizer)) {
         setChartInfo({ data: subscribersChartData.chartMonthly(parseInt(chartOrganizer)), xDataKey: "month", yDataKey: "totalSubscribers" })
      }
   }, [chartOrganizer])

   return (
      <AppWrapper>
         <div className="text-xs pd-05 grey-4">Urbanaura SMS Marketing</div>
         <div className="text-l full bold-600">Subscriber Insights</div>
         <Spacing />

         <div className="box full mb-1 dfb align-center justify-end">
            <Select
               options={["Today", "Last 7 Days", "Last 30 Days", "This Month", ...subscribersChartData.getAllYears() ]}
               onSelect={item => setChartOrganizer(item)}
               selectedOptionStyle={{ padding: "3px 0" }}
               optionStyle={{ padding: "9px 12px" }}
            />
         </div>
         <Chart data={chartInfo.data} xDataKey={chartInfo.xDataKey} yDataKey={chartInfo.yDataKey} />
      </AppWrapper>
   )
}
