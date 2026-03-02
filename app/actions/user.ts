"use server"
import { dalDbOperation } from "@/dal/helpers";
import { db } from "@/db";
import { automationsTable } from "@/db/schemas";
import { authOptions } from "@/lib/authOptions";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function getCurrentUser () {
   try {
      const session = await getServerSession(authOptions);
      if (!session) return null;
      if (!session.user) return null;
      return session.user;
   } catch (e) { return null; }
}

export async function saveWelcomeSMSMessage (message: string) {
   try {
      const user = await getCurrentUser();
      if (!user) return false;

      const automationId = "4228483f-df55-401d-b567-0152e960e778";
      const saved = await dalDbOperation(async () => {
         const res = await db.update(automationsTable)
            .set({ welcomeText: message })
            .where(eq(automationsTable.automationId, automationId));
         return (res.rowCount === 1)
      });

      return saved.success ? saved.data : false;
   } catch (e) { return false; }
}