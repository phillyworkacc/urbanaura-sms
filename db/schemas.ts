import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const subscribersTable = pgTable("subscribers", {
   id: serial("id").primaryKey(),
   subscriberId: text("subscriber_id"),
   phoneNumber: text("phone_number"),
   dateJoined: text("date_joined")
});

export const automationsTable = pgTable("automations", {
   id: serial("id").primaryKey(),
   automationId: text("automation_id"),
   welcomeText: text("welcome_text")
});

export const campaignsTable = pgTable("campaigns", {
   id: serial("id").primaryKey(),
   campaignId: text("campaign_id"),
   name: text("name"),
   message: text("message"),
   sent: boolean("sent"),
   sentOn: text("sent_on"),
   dateCreated: text("date_created")
});