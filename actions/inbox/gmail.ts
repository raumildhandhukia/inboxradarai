"use server";
import { db } from "@/lib/db";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import { auth } from "@/auth";
import { Email } from "@/types";

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

export async function getEmail(auth: any, id: string, body?: boolean) {
  const gmail = google.gmail({ version: "v1", auth });
  const email = await gmail.users.messages.get({
    userId: "me",
    id,
  });
  const headers = email.data.payload?.headers;
  const subject = headers?.find(
    (header: any) => header.name === "Subject"
  )?.value;
  const from = headers?.find((header: any) => header.name === "From")?.value;
  const to = headers?.find((header: any) => header.name === "To")?.value;
  const snippet = email.data.snippet;
  const date = headers?.find((header: any) => header.name === "Date")?.value;
  const labelIds = email.data.labelIds;
  const parts = email.data.payload?.parts || [];

  const mail = {
    id,
    labelIds,
    snippet,
    subject,
    from,
    to,
    date,
    body: "",
    AILabel: {
      label: "reject",
      color: "red",
    },
  };

  if (body) {
    let body = "";
    if (email.data.payload?.mimeType === "text/html") {
      const encodedBody = email.data.payload?.body?.data;
      if (encodedBody) {
        body = encodedBody;
      }
    } else {
      parts.forEach((part: any) => {
        if (part.mimeType === "text/html") {
          body = part.body.data;
        }
      });
    }
    mail.body = body;
  }
  return mail;
}

export async function listEmails(
  auth: any,
  page: string | null,
  type: string | null
) {
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
  let qValue = "";
  if (type) {
    qValue = `category:${type}`;
  }
  try {
    res = await gmail.users.messages.list({
      userId: "me",
      maxResults: 50,
      pageToken,
      q: qValue,
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
  const emails: Email[] = await Promise.all(
    messages.map(async (message: any) => {
      return await getEmail(auth, message.id);
    })
  );

  return { emails, nextPageToken };
}
