import { auth } from "@/auth";
import { getRefresh } from "@/actions/auth/refreshToken";
import {
  listEmails,
  getGoogleApiHandler,
  getEmail,
} from "@/actions/mail/gmail";
import { getAnalysis } from "@/actions/genAI/dbOperations";
import { Email, EmailAnalysis } from "@/types";

interface ReturnType extends Email {
  analysis?: EmailAnalysis;
}

export const getInboxData = async (
  page: string | null,
  type: string | null
) => {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) {
    return null;
  }
  const refresh = await getRefresh(user.id);
  if (!refresh) {
    return null;
  }
  const { refresh_token } = refresh;

  const handler = await getGoogleApiHandler(refresh_token);
  return await listEmails(handler, page, type);
};

export const getEmailData = async (emailId: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) {
    return null;
  }
  const refresh = await getRefresh(user.id);
  if (!refresh) {
    return null;
  }
  const { refresh_token } = refresh;

  const handler = await getGoogleApiHandler(refresh_token);
  const data: ReturnType = await getEmail(handler, emailId, true);
  const analysis: EmailAnalysis[] | null = await getAnalysis([emailId]);
  if (analysis) {
    data.analysis = analysis[0];
  }
  return data;
};
