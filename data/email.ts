import { auth } from "@/auth";
import { getRefresh } from "@/actions/auth/refreshToken";
import {
  listEmails,
  getGoogleApiHandler,
  getEmail,
  queryEmails,
} from "@/data/gmail";
import { getAnalysis } from "@/data/AIOperations";
import { Email, EmailAnalysis } from "@/types";
import { User } from "next-auth";

interface ReturnType extends Email {
  analysis?: EmailAnalysis;
}

export const queryInbox = async (query: string, user: User) => {
  const refresh = await getRefresh(user.id!);
  if (!refresh) {
    return null;
  }
  const { refresh_token } = refresh;

  const handler = await getGoogleApiHandler(refresh_token);
  return await queryEmails(handler, user, query);
};

export const getInboxData = async (
  page: string | null,
  type: string | null,
  user: User,
  labelId: string | null
) => {
  const refresh = await getRefresh(user.id!);
  if (!refresh) {
    return null;
  }
  const { refresh_token } = refresh;

  const handler = await getGoogleApiHandler(refresh_token);
  return await listEmails(handler, page, type, user, labelId);
};

export const getEmailData = async (emailId: string, user: User) => {
  const refresh = await getRefresh(user.id!);
  if (!refresh) {
    return null;
  }
  const { refresh_token } = refresh;

  const handler = await getGoogleApiHandler(refresh_token);
  const data: ReturnType = await getEmail(handler, emailId, user, true);
  const analysis: EmailAnalysis[] | null = await getAnalysis([emailId], user);
  if (analysis) {
    data.analysis = analysis[0];
  }
  return data;
};
