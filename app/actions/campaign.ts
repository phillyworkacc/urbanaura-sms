"use server"
import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import { db } from "@/db";
import { campaignsTable } from "@/db/schemas";
import { uuid } from "@/utils/uuid";
import { eq } from "drizzle-orm";

export async function createCampaign (name: string, message: string) {
   try {
      const campaignId = uuid();
      const result = await dalRequireAuth(() =>
         dalDbOperation(async () => {
            const dateCreated = Date.now().toString();
            const res = await db.insert(campaignsTable).values({
               campaignId, name, message, dateCreated, sent: false, sentOn: null
            });

            return (res.rowCount === 1)
         })
      );
      return result.success ? (result.data ? campaignId : false) : false;
   } catch (e) {
      return false;
   }
}

export async function updateCampaign (campaignId: string, message: string) {
   try {
      const result = await dalRequireAuth(() =>
         dalDbOperation(async () => {
            const res = await db.update(campaignsTable)
               .set({ message })
               .where(eq(campaignsTable.campaignId, campaignId));

            return (res.rowCount === 1)
         })
      );
      return result.success ? result.data : false;
   } catch (e) {
      return false;
   }
}

export async function setCampaignToSent (campaignId: string) {
   try {
      const sentOn = Date.now().toString();
      const result = await dalRequireAuth(() =>
         dalDbOperation(async () => {
            const res = await db.update(campaignsTable)
               .set({ sent: true, sentOn })
               .where(eq(campaignsTable.campaignId, campaignId));

            return (res.rowCount === 1)
         })
      );
      return result.success ? result.data : false;
   } catch (e) {
      return false;
   }
}

export async function getCampaign (campaignId: string) {
   try {
      const result = await dalRequireAuth(() =>
         dalDbOperation(async () => {
            const res = await db.select().from(campaignsTable).where(eq(campaignsTable.campaignId, campaignId)).limit(1);
            return res[0];
         })
      );
      return result.success ? result.data : false;
   } catch (e) {
      return false;
   }
}


export async function deleteCampaign (campaignId: string) {
   try {
      const result = await dalRequireAuth(() =>
         dalDbOperation(async () => {
            const res = await db.delete(campaignsTable).where(eq(campaignsTable.campaignId, campaignId));
            return (res.rowCount === 1)
         })
      );
      return result.success ? result.data : false;
   } catch (e) {
      return false;
   }
}