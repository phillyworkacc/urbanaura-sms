import { db } from "@/db";
import { subscribersTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   try {
      const formData = await req.formData();
   
      const from = formData.get("From") as string; // customer
      const to = formData.get("To") as string;     // Twilio number
      const body = formData.get("Body") as string;

      if (!process.env.TWILIO_NUMBER) return new Response("Error", { status: 500 });

      // validate twilio phone number
      const urbanauraPhoneNumber = process.env.TWILIO_NUMBER;
      if (to !== urbanauraPhoneNumber) {
         return new Response("Error", { status: 500 });
      }

      // check the content of the message if it says stop
      if (body.trim().startsWith("STP".toUpperCase())) {
         // if the subscriber says stop
         // remove them from the subscribers list
         await db.delete(subscribersTable).where(eq(subscribersTable.phoneNumber, from));
         return new Response('<Response/>', {
            status: 200,
            headers: { 'Content-Type': 'text/xml' },
         });
      }
      
      return new Response('<Response/>', {
         status: 200,
         headers: { 'Content-Type': 'text/xml' },
      });
   } catch (e) {
      console.log(e);
      return new Response("Error", { status: 500 });
   }
}
