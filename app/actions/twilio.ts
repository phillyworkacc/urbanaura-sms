"use server"
import { db } from "@/db";
import { automationsTable, subscribersTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import twilio from "twilio";
import { getCampaign, setCampaignToSent } from "./campaign";
import { dalRequireAuth } from "@/dal/helpers";
import { getCurrentUser } from "./user";
import { wait } from "@/utils/wait";

export async function sendSMSMessage (receivingPhoneNumber: string, message: string) {
   try {
      // check that all environment variables are working
      if (!process.env.TWILIO_ACCOUNT_SID) return {
         success: false,
         error: "NO ACCOUNT SID"
      }
      
      if (!process.env.TWILIO_AUTH_TOKEN) return {
         success: false,
         error: "NO AUTH TOKEN"
      }

      if (!process.env.TWILIO_NUMBER) return {
         success: false,
         error: "NO TWILIO PHONE NUMBER"
      }
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      
      const urbanauraPhoneNumber = process.env.TWILIO_NUMBER;
      await client.messages.create({
         body: `${message}\n\nReply STP to unsubscribe.`,
         from: urbanauraPhoneNumber,
         to: receivingPhoneNumber,
      })

      return {
         success: true,
         result: `SMS Message sent to ${receivingPhoneNumber}`
      }
   } catch (e) {
      console.error(e)
      return {
         success: false,
         error: "Failed to send sms message"
      }
   }
}

export async function sendWelcomeSMSMessage (receivingPhoneNumber: string) {
   try {
      // get welcome message
      const automationId = "4228483f-df55-401d-b567-0152e960e778";
      const res = await db.select()
         .from(automationsTable)
         .where(eq(automationsTable.automationId, automationId))
         .limit(1);

      if (!res[0].welcomeText || res[0].welcomeText.trim() == "") return false;
      
      const sent = await sendSMSMessage(receivingPhoneNumber, res[0].welcomeText);
      return sent.success;
   } catch (e) {
      console.error(e)
      return false;
   }
}

export async function sendCampaign(campaignId: string) {
   try {
      const user = await getCurrentUser();
      if (!user) return false;
   
      // get the campaign message
      const campaignInfo = await getCampaign(campaignId);
      if (!campaignInfo) return false;
   
      // get all the subscribers
      const subscribers = await db.select().from(subscribersTable);
      if (!subscribers) return false;
   
      // loop through each subscriber and send them the campaign message
      for (const subscriber of subscribers) {
         try {
            const res = await sendSMSMessage(subscriber.phoneNumber!, campaignInfo.message!);
            console.log(res.success ? res.result : res.error);
            await wait(0.5);
         } catch (error) {
            console.error(`Failed: ${subscriber.phoneNumber}`, error);
         }
      }
   
      // once all the messages have been sent 
      // we can update the campaign status to sent
      const setToSent = await setCampaignToSent(campaignId);
      return setToSent;
   } catch (e) {
      return false;
   }
}