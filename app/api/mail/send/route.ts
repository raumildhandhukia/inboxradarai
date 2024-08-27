import { auth as getSession } from "@/auth";
import { getRefresh } from "@/actions/auth/account";
import { sendEmail, getGoogleApiHandler } from "@/data/gmail";
export async function POST(req: Request) {
  try {
    const session = await getSession();
    const user = session?.user;
    if (!user || !user.email) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { from, to, cc, bcc, subject, message, account } = body;
    const threadId = body.threadId;
    const messageId = body.messageId;

    if (!to || !subject || !message || !account) {
      return new Response("Missing fields", { status: 400 });
    }
    const refresh = await getRefresh(user.id!, account);
    if (!refresh) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { refresh_token } = refresh;
    const handler = await getGoogleApiHandler(refresh_token);

    const res = await sendEmail(
      from || account,
      to,
      cc,
      bcc,
      subject,
      message,
      handler,
      account,
      threadId,
      messageId
    );
    if (!res) {
      return new Response("Not sent", { status: 500 });
    }
    return new Response("Sent", {
      status: 200,
    });
  } catch (e) {
    return new Response("Not sent", { status: 500 });
  }
}
