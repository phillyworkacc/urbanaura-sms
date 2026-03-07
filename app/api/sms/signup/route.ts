import { sendWelcomeSMSMessage } from "@/app/actions/twilio";
import { db } from "@/db";
import { subscribersTable } from "@/db/schemas";
import { uuid } from "@/utils/uuid";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
   'https://uaofk.com',
   'https://www.uaofk.com',
   '*'
];

function makeCorsResponse(body: any, status: number, origin: string) {
   return new NextResponse(JSON.stringify(body), {
      status,
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': origin,
         'Access-Control-Allow-Methods': 'POST, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type',
         'Access-Control-Max-Age': '86400',
      },
   });
}

export async function OPTIONS(req: Request) {
   const origin = req.headers.get('origin') || '';
   if (!allowedOrigins.includes(origin)) {
      return new NextResponse('Forbidden', { status: 403 });
   }

   return new NextResponse(null, {
      status: 204,
      headers: {
         'Access-Control-Allow-Origin': origin,
         'Access-Control-Allow-Methods': 'POST, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type'
      },
   });
}

export async function POST (req: NextRequest) {
   const origin = req.headers.get('origin') || '';
   if (!allowedOrigins.includes(origin)) {
      return new NextResponse('Forbidden', { status: 403 });
   }

	const body = await req.json();
	const { phoneNumber } = body;

	if (phoneNumber == "") {
      return makeCorsResponse({ success: false }, 200, origin);
	}

   console.log(origin)
   console.log(phoneNumber)

   try {
      // add phone number to subscribers
      const subscriberId = uuid();
      const dateJoined = Date.now().toString();
		const res = await db.insert(subscribersTable).values({
         subscriberId, phoneNumber, dateJoined
      });

      if (res.rowCount === 1) {
         // once added, send the user an sms message
         const sendToNewSubscriber = await sendWelcomeSMSMessage(phoneNumber);
         return makeCorsResponse({ success: sendToNewSubscriber }, 200, origin);
      } else {
         return makeCorsResponse({ success: false }, 200, origin);
      }
	} catch (e) {
		console.log(e);
      return makeCorsResponse({ success: false }, 200, origin);
	}
}