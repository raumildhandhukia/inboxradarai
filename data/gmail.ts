"use server";
import { db } from "@/lib/db";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import { auth } from "@/auth";
import { Email, EmailAnalysis, EmailSearchResultProps } from "@/types";
import { getAnalysis, getLabelEmails } from "./AIOperations";
import { User } from "next-auth";

interface ReturnType extends Email {
  analysis?: EmailAnalysis;
}

export const queryEmails = async (auth: any, user: User, query: string) => {
  try {
    const gmail = google.gmail({ version: "v1", auth });
    const res = await gmail.users.messages.list({
      userId: "me",
      maxResults: 20,
      q: query,
    });
    if (!res) {
      return [];
    }
    const messagesIds =
      res.data.messages?.map((message: any) => message.id) || [];
    const emails: Email[] = await Promise.all(
      messagesIds.map(async (id: string) => {
        return await getEmail(auth, id, user);
      })
    );
    const results: EmailSearchResultProps[] = emails.map((email) => {
      const sender = email.from?.slice(0, email.from.indexOf("<")) || "";
      return {
        id: email.id,
        sender: email.from?.split("<")[0] || "",
        senderEmail: email.from?.split("<")[1].split(">")[0] || "",
        subject: email.subject || "",
        date: email.date || "",
        snippet: email.snippet || "",
      };
    });
    return results;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getGoogleApiHandler = async (refresh_token: string) => {
  const token = {
    type: "authorized_user",
    client_id: process.env.AUTH_GOOGLE_ID,
    client_secret: process.env.AUTH_GOOGLE_SECRET,
    refresh_token,
  };

  return google.auth.fromJSON(token);
};

export async function getEmail(
  auth: any,
  id: string,
  user: User,
  body?: boolean
) {
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

  const mail: ReturnType = {
    id,
    labelIds,
    snippet,
    subject,
    from,
    to,
    date,
    body: "",
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
  const analysis: EmailAnalysis[] | null = await getAnalysis([id], user);
  if (analysis && analysis.length > 0) {
    mail.analysis = analysis[0];
  }

  return mail;
}

export async function listEmails(
  auth: any,
  page: string | null,
  type: string | null,
  user: User,
  labelId: string | null
) {
  let messagesIds: string[] = [];
  let nextPageToken: string | null | undefined = undefined;
  if (labelId && labelId !== "null") {
    messagesIds = await getLabelEmails(labelId || "");
  } else {
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
    messagesIds = res.data.messages?.map((message: any) => message.id) || [];
    if (!messagesIds) {
      return { emails: [], nextPageToken: null };
    }
    nextPageToken = res.data.nextPageToken;
  }

  const emails: Email[] = await Promise.all(
    messagesIds.map(async (id: string) => {
      return await getEmail(auth, id, user);
    })
  );

  return { emails, nextPageToken };
}
