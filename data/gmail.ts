"use server";
import { google } from "googleapis";
import { sidebarItems } from ".";
import { Email, EmailAnalysis, EmailSearchResultProps } from "@/types";
import { getAnalysis, getLabelEmails } from "./AIOperations";
import { User } from "next-auth";

interface ReturnType extends Email {
  analysis?: EmailAnalysis;
}

export const queryEmails = async (
  auth: any,
  user: User,
  query: string,
  pageToken: string | undefined,
  emailAddress: string
) => {
  try {
    let nextPageToken: string | null | undefined;
    const gmail = google.gmail({ version: "v1", auth });
    const res = await gmail.users.messages.list({
      userId: "me",
      maxResults: 20,
      pageToken,
      q: query,
    });
    if (!res) {
      return { emails: [], nextPageToken: null };
    }
    nextPageToken = res.data.nextPageToken;
    const messagesIds =
      res.data.messages?.map((message: any) => message.id) || [];
    const emails: Email[] = await Promise.all(
      messagesIds.map(async (id: string) => {
        return await getEmail(auth, id, user, emailAddress);
      })
    );
    const promises = emails.map(async (email) => {
      const emailData = await getEmail(auth, email.id, user, emailAddress);
      const analysis: EmailAnalysis[] | null = await getAnalysis(
        [email.id],
        user,
        emailAddress
      );
      return {
        ...emailData,
        analysis: analysis ? analysis[0] : null,
      };
    });
    const results = await Promise.all(promises);
    return { emails: results, nextPageToken };
  } catch (e) {
    console.error(e);
    return { emails: [], nextPageToken: null };
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
  emailAddress: string,
  body?: boolean
) {
  try {
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
    const read = !labelIds?.includes("UNREAD");
    const threadId = email.data.threadId;
    const messageId = headers?.find(
      (header: any) => header.name === "Message-ID"
    )?.value;
    const deliveredTo = headers?.find(
      (header: any) => header.name === "Delivered-To"
    )?.value;

    const mail: ReturnType = {
      id,
      labelIds,
      snippet,
      subject,
      from,
      to,
      date,
      read,
      threadId,
      messageId,
      deliveredTo,
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
    const analysis: EmailAnalysis[] | null = await getAnalysis(
      [id],
      user,
      emailAddress
    );
    if (analysis && analysis.length > 0) {
      mail.analysis = analysis[0];
    }

    return mail;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function listEmails(
  auth: any,
  page: string | null,
  type: string | null,
  user: User,
  labelId: string | null,
  emailAddress: string
) {
  let messagesIds: string[] = [];
  let nextPageToken: string | null | undefined = undefined;
  if (labelId && labelId !== "null") {
    messagesIds = await getLabelEmails(labelId || "", emailAddress);
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
      if (type === "all") {
        qValue = "";
      } else {
        const queryPrefix = sidebarItems.find(
          (item) => item.type === type
        )?.queryPrefix;
        qValue = `${queryPrefix}:${type}`;
      }
    }
    try {
      res = await gmail.users.messages.list({
        userId: "me",
        maxResults: 10,
        pageToken,
        q: qValue,
        includeSpamTrash: true,
      });
      if (res.data.messages?.length === 0 && type === "primary") {
        res = await gmail.users.messages.list({
          userId: "me",
          maxResults: 15,
          pageToken,
          q: "in:inbox",
          includeSpamTrash: true,
        });
      }
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
      const email = await getEmail(auth, id, user, emailAddress);
      const analysis = await getAnalysis([id], user, emailAddress);
      return { ...email, analysis: analysis ? analysis[0] : null };
    })
  );

  return { emails, nextPageToken };
}

export async function modifyEmail(emailId: string, auth: any, label: string) {
  try {
    const gmail = google.gmail({ version: "v1", auth });
    // Do the magic
    const res = await gmail.users.messages.modify({
      // The ID of the message to modify.
      id: emailId,
      // The user's email address. The special value `me` can be used to indicate the authenticated user.
      userId: "me",
      requestBody: {
        removeLabelIds: [label],
      },
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function trashEmail(emailId: string, auth: any) {
  try {
    const gmail = google.gmail({ version: "v1", auth });
    const res = await gmail.users.messages.trash({
      id: emailId,
      userId: "me",
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function untrashEmail(emailId: string, auth: any) {
  try {
    const gmail = google.gmail({ version: "v1", auth });
    const res = await gmail.users.messages.untrash({
      id: emailId,
      userId: "me",
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function sendEmail(
  from: string,
  to: string[],
  cc: string[],
  bcc: string[],
  subject: string,
  message: string,
  auth: any,
  account: string,
  threadId: string | undefined,
  messageId: string | undefined
) {
  try {
    const gmail = google.gmail({ version: "v1", auth });
    const toEmails = to.join(", ");
    const ccEmails = cc && cc.length > 0 ? `Cc: ${cc.join(", ")}\r\n` : "";
    const bccEmails = bcc && bcc.length > 0 ? `Bcc: ${bcc.join(", ")}\r\n` : "";
    const inReplyTo = messageId ? `In-Reply-To: ${messageId}\r\n` : "";
    const references = messageId ? `References: ${messageId}\r\n` : "";
    const type = "Content-Type: text/html; charset=UTF-8";

    const emailMessage =
      `To: ${toEmails}\r\n` +
      `${ccEmails}` +
      `${bccEmails}` +
      inReplyTo +
      references +
      `Subject: ${subject}\r\n` +
      type +
      `\r\n\r\n${message}`;
    const encodedMessage = btoa(emailMessage);
    const response = await gmail.users.messages.send({
      userId: "me",

      requestBody: {
        raw: encodedMessage,
        threadId,
      },
    });
    return true;
  } catch (e) {
    console.log("sending email error", e);
    return false;
  }
}
