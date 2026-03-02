import { sendWelcomeSMSMessage } from "@/app/actions/twilio";
import { db } from "@/db";
import { subscribersTable } from "@/db/schemas";
import { uuid } from "@/utils/uuid";
import { NextRequest, NextResponse } from "next/server";

const getCORSHeaders = () => {
   const headers = new Headers();
   headers.set('Access-Control-Allow-Origin', '*');
   headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
   headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   return headers;
};

export async function OPTIONS() {
   return new NextResponse(null, {
      status: 204,
      headers: getCORSHeaders(),
   });
}

export async function POST (req: NextRequest) {
	const body = await req.json();
	const { phoneNumber } = body;

	if (phoneNumber == "") {
		return NextResponse.json(JSON.stringify({ success: false }), { status: 200, headers: getCORSHeaders() })
	}

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
         return NextResponse.json(JSON.stringify({ success: sendToNewSubscriber }), { status: 200, headers: getCORSHeaders() })
      } else {
   		return NextResponse.json(JSON.stringify({ success: false }), { status: 200, headers: getCORSHeaders() })
      }
	} catch (e) {
		console.log(e);
		return NextResponse.json(JSON.stringify({ success: false }), { status: 200, headers: getCORSHeaders() })
	}
}