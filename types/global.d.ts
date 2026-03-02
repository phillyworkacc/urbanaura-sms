declare module "*.css"
declare module "*.png"

type Subscriber = {
   id: number;
   subscriberId: string;
   phoneNumber: string;
   dateJoined: string;
}

type AutomationDefault = {
   id: number;
   automationId: string;
   welcomeText: string;
}

type Campaign = {
   id: number;
   campaignId: string;
   name: string;
   message: string;
   sent: boolean;
   sentOn: string;
   dateCreated: string;
}