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
export async function listEmails(auth: any, page: string | null) {
  const gmail = google.gmail({ version: "v1", auth });
  let res;
  let pageToken;
  if (!page) {
    pageToken = undefined;
  } else {
    if (page === "null") {
      pageToken = undefined;
    } else {
      pageToken = page;
    }
  }
  try {
    res = await gmail.users.messages.list({
      userId: "me",
      maxResults: 50,
      pageToken,
    });
  } catch (e) {
    console.error(pageToken);
  }
  if (!res) {
    return { emails: [], nextPageToken: null };
  }
  const messages = res.data.messages;
  if (!messages) {
    return { emails: [], nextPageToken: null };
  }
  const nextPageToken = res.data.nextPageToken;
  const emails = await Promise.all(
    messages.map(async (message: any) => {
      const email = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });
      const headers = email.data.payload?.headers;
      const subject = headers?.find(
        (header: any) => header.name === "Subject"
      )?.value;
      const from = headers?.find(
        (header: any) => header.name === "From"
      )?.value;
      const snippet = email.data.snippet;
      const id = email.data.id;
      const date = headers?.find(
        (header: any) => header.name === "Date"
      )?.value;
      const labelIds = email.data.labelIds;

      const emailBody1 =
        email.data.payload?.parts && email.data.payload?.parts[1]?.body?.data;
      const emailBody0 =
        email.data.payload?.parts && email.data.payload?.parts[0]?.body?.data;

      let body0, body1;
      if (!emailBody0) {
        body0 = snippet;
      } else {
        body0 = Buffer.from(emailBody0, "base64").toString("utf8");
      }
      if (!emailBody1) {
        body1 = snippet;
      } else {
        body1 = Buffer.from(emailBody1, "base64").toString("utf8");
      }
      return {
        id,
        labelIds,
        snippet,
        subject,
        from,
        date,
        body: [body0, body1],
        AILabel: {
          text: "reject",
          color: "red",
        },
      };
    })
  );

  return { emails, nextPageToken };
}
