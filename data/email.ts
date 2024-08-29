import { auth } from "@/auth";
import { getRefresh } from "@/actions/auth/account";
import {
  listEmails,
  getGoogleApiHandler,
  getEmail,
  queryEmails,
} from "@/data/gmail";
import { getAnalysis } from "@/data/AIOperations";
import { Email, EmailAnalysis } from "@/types";
import { User } from "next-auth";
import { Return } from "@prisma/client/runtime/library";

interface ReturnType extends Email {
  analysis?: EmailAnalysis;
}

export const queryInbox = async (
  query: string,
  user: User,
  email: string,
  page: string | undefined
) => {
  const refresh = await getRefresh(user.id!, email);
  if (!refresh) {
    return null;
  }
  const { refresh_token } = refresh;

  const handler = await getGoogleApiHandler(refresh_token);
  return await queryEmails(handler, user, query, page, email);
};

export const getInboxData = async (
  page: string | null,
  type: string | null,
  user: User,
  labelId: string | null,
  email: string
) => {
  const refresh = await getRefresh(user.id!, email);
  if (!refresh) {
    return null;
  }
  const { refresh_token } = refresh;
  const handler = await getGoogleApiHandler(refresh_token);
  return await listEmails(handler, page, type, user, labelId, email);
};

export const getEmailData = async (
  emailId: string,
  user: User,
  email: string
) => {
  const refresh = await getRefresh(user.id!, email);
  if (!refresh) {
    return null;
  }
  const { refresh_token } = refresh;

  const handler = await getGoogleApiHandler(refresh_token);
  const data: ReturnType = await getEmail(handler, emailId, user, email, true);
  const analysis: EmailAnalysis[] | null = await getAnalysis(
    [emailId],
    user,
    email
  );
  if (analysis) {
    data.analysis = analysis[0];
  }
  return data;
};
