"use server"
import { db } from "@/db";
import { subscribersTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "./user";

export async function removeSubscriber (subscriberId: string) {
   try {
      const user = await getCurrentUser();
      if (!user) return false;
      
      const res = await db.delete(subscribersTable).where(eq(subscribersTable.subscriberId, subscriberId));
      return (res.rowCount === 1);
   } catch (e) {
      return false;
   }
}