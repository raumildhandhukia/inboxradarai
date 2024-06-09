"use server";
import { db } from "@/lib/db";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import { auth } from "@/auth";

export const getGoogleApiHandler = async (refresh_token: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) {
    return null;
  }
  const token = {
    type: "authorized_user",
    client_id: process.env.AUTH_GOOGLE_ID,
    client_secret: process.env.AUTH_GOOGLE_SECRET,
    refresh_token,
  };

  return google.auth.fromJSON(token);
};
export async function listEmails(auth: any) {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.list({
    userId: "me",
  });
  const messages = res.data.messages;
  if (!messages) {
    return [];
  }
  const emails = await Promise.all(
    messages.map(async (message: any) => {
      const email = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });
      return email.data;
    })
  );

  return emails;
}
