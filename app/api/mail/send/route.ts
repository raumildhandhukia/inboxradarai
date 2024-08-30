import { auth as getSession } from "@/auth";
import { getRefresh } from "@/actions/auth/account";
import { sendEmail, getGoogleApiHandler } from "@/data/gmail";
import { verifyAccount, getAccountById } from "@/data/account";
export async function POST(req: Request) {
  try {
    const session = await getSession();
    const user = session?.user;
    if (!user || !user.email) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { from, to, cc, bcc, subject, message, accountId } = body;
    if (!accountId || !(await verifyAccount(parseInt(accountId), user.id!))) {
      return new Response("Unauthorized", { status: 404 });
    }
    const account = await getAccountById(parseInt(accountId));
    if (!account) {
      return new Response("Account not found", { status: 404 });
    }
    const email = account.email!;
    const threadId = body.threadId;
    const messageId = body.messageId;

    if (!to || !subject || !message || !account) {
      return new Response("Missing fields", { status: 400 });
    }
    const refresh = await getRefresh(user.id!, email);
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
      email,
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
