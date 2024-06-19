import { auth } from "@/auth";
import { getRefresh } from "@/actions/auth/refreshToken";
import { listEmails, getGoogleApiHandler } from "@/actions/inbox/gmail";

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
