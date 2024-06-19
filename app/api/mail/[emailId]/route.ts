import { getEmail, getGoogleApiHandler } from "@/actions/inbox/gmail";
import { auth } from "@/auth";
import { getRefresh } from "@/actions/auth/refreshToken";
import { Email } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { emailId: string } }
) {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user || !user.id) {
      return new Response("Unauthorized", { status: 401 });
    }
    const refresh = await getRefresh(user.id);
    if (!refresh) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { refresh_token } = refresh;

    const handler = await getGoogleApiHandler(refresh_token);
    const data: Email = await getEmail(handler, params.emailId, true);

    return Response.json(data);
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
