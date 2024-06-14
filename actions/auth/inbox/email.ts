import { auth } from "@/auth";
import { getRefresh } from "../refreshToken";
import { listEmails, getGoogleApiHandler } from "@/actions/auth/inbox/gmail";

export const getInboxData = async (page: string | null) => {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) {
    return null;
  }
  const refresh = await getRefresh(user.id);
  if (!refresh) {
    return null;
  }
  const { refresh_token, provider } = refresh;
  if (provider === "google") {
    const handler = await getGoogleApiHandler(refresh_token);
    return await listEmails(handler, page);
  }
  return null;
};
