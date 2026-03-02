
type DashboardMetricsReturn = {
   all: number;
   today: number;
   thisMonth: number;
}

export class SubscriberMetrics {
   readonly subscribers: Subscriber[];

   constructor (totalSubs: Subscriber[]) {
      this.subscribers = totalSubs;
   }

   dashboardMetrics(): DashboardMetricsReturn {
      const startOfToday = new Date(Date.now());
      startOfToday.setHours(0, 0, 0, 0);

      const startOfMonth = new Date(Date.now());
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      return {
         all: this.subscribers.length,
         today: this.subscribers.filter(sub => (parseInt(sub.dateJoined) >= startOfToday.getTime())).length,
         thisMonth: this.subscribers.filter(sub => (parseInt(sub.dateJoined) >= startOfMonth.getTime())).length
      }
   }

   getAllYears () {
      const years = this.subscribers.map(item => {
         const date = new Date(parseInt(item.dateJoined));
         return date.getFullYear().toString();
      });

      // Filter out duplicates and return the unique years
      return [...new Set(years)];
   }

   chartMonthly (targetYear: number) {
      const months = [
         "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
   
      const grouped: {
         [key: number]: {
            [key: string]: { subscribers: number; } 
         }
      } = {};
   
      // Get the current date for determining the current month and year
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonthIndex = currentDate.getMonth(); // 0-based (0 = Jan, 11 = Dec)
   
      // Set initial amount for each month and year as 0
      this.subscribers.forEach(({ subscriberId, dateJoined }) => {
         const dateObj = new Date(parseInt(dateJoined));
         const year = dateObj.getFullYear();
         const month = months[dateObj.getMonth()];
   
         // Only process data for the target year
         if (year === targetYear) {
            if (!grouped[year]) {
               grouped[year] = {};
               months.forEach(monthName => {
                  grouped[year][monthName] = {
                     subscribers: 0
                  }; // Initialize each month with 0
               });
            }
            grouped[year][month].subscribers += 1;
         }
      });
   
      // Return the result for the specified year
      const result: {
         year: number;
         month: string;
         totalSubscribers: number;
      }[] = [];
   
      // If the year exists, format the result for the required months
      if (grouped[targetYear]) {
         const monthsData = grouped[targetYear];
   
         // If we're in the current year, stop at the current month
         const lastMonthToShow = targetYear === currentYear ? currentMonthIndex : 11;
   
         months.slice(0, lastMonthToShow + 1).forEach(month => {
            result.push({
               year: targetYear, month,
               totalSubscribers: monthsData[month].subscribers
            });
         });
      }
   
      return result;
   }

   chartToday () {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const currentDay = now.getDate();

      // Initialize 24 hours with 0 users
      const hourlyData = Array.from({ length: 24 }, (_, hour) => {
         const period = hour >= 12 ? 'pm' : 'am';
         const hour12 = hour % 12 === 0 ? 12 : hour % 12; // Convert to 12-hour format
         return {
            hour: `${hour12}${period}`, // e.g. "1am", "12pm"
            totalSubscribers: 0
         };
      });

      // Count users per hour for today
      this.subscribers.forEach(({ subscriberId, dateJoined }) => {
         const dateObj = new Date(parseInt(dateJoined));
         if (
            dateObj.getFullYear() === currentYear &&
            dateObj.getMonth() === currentMonth &&
            dateObj.getDate() === currentDay
         ) {
            const hour = dateObj.getHours();
            hourlyData[hour].totalSubscribers += 1;
         }
      });

      return hourlyData;
   }

   chartLast7Days () {
      const now = Date.now();
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

      const last7Days: string[] = [];
      for (let i = 0; i < 7; i++) {
         const day = new Date(now - i * 24 * 60 * 60 * 1000);
         const shortDate = day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
         last7Days.push(shortDate);
      }

      const groupedByDate: { [key: string]: number } = {};

      this.subscribers.forEach(({ dateJoined }) => {
         const dateStr = new Date(parseInt(dateJoined)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
         if (parseInt(dateJoined) >= sevenDaysAgo) {
            if (!groupedByDate[dateStr]) groupedByDate[dateStr] = 0;
            groupedByDate[dateStr] += 1;
         }
      });

      const result = last7Days.map(date => ({
         date,
         totalSubscribers: groupedByDate[date] || 0
      }));

      return result.toReversed();
   }

   chartLast30Days () {
      const now = Date.now();
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

      const last30Days: string[] = [];
      for (let i = 0; i < 30; i++) {
         const day = new Date(now - i * 24 * 60 * 60 * 1000);
         const shortDate = day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
         last30Days.push(shortDate);
      }

      const groupedByDate: { [key: string]: number } = {};

      this.subscribers.forEach(({ dateJoined }) => {
         const dateStr = new Date(parseInt(dateJoined)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
         if (parseInt(dateJoined) >= thirtyDaysAgo) {
            if (!groupedByDate[dateStr]) groupedByDate[dateStr] = 0;
            groupedByDate[dateStr] += 1;
         }
      });

      const result = last30Days.map(date => ({
         date, totalSubscribers: groupedByDate[date] || 0
      }));

      return result.toReversed();
   }

   chartThisMonth () {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonthIndex = currentDate.getMonth(); // 0-based (0 = Jan, 11 = Dec)
      const currentMonth = currentDate.toLocaleString('default', { month: 'short' }); // Short month name (e.g., "May")

      // get number of days in the month
      const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

      // create an array initializing all subs to 0
      const result = Array.from({ length: daysInMonth }, (_,i) => i+1).map(day => ({
         date: `${currentMonth} ${day}`,
         totalSubscribers: 0
      }));

      // add in all the subscribers for the days in the current month
      this.subscribers.forEach(({ dateJoined }) => {
         const joinDate = new Date(parseInt(dateJoined));
         const monthIndexJoined = new Date(parseInt(dateJoined)).getMonth();
         if (monthIndexJoined == currentMonthIndex && joinDate.getFullYear() === currentYear) {
            result[joinDate.getDate()-1].totalSubscribers += 1;
         }
      })

      return result;
   }
}