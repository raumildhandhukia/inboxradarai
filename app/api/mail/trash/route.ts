import { auth as getSession } from "@/auth";
import { getRefresh } from "@/actions/auth/account";
import { trashEmail, untrashEmail, getGoogleApiHandler } from "@/data/gmail";
import { verifyAccount, getAccountById } from "@/data/account";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const user = session?.user;
    if (!user || !user.email) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { emailId, accountId, action } = body;
    if (!accountId || !(await verifyAccount(parseInt(accountId), user.id!))) {
      return new Response("Unauthorized", { status: 404 });
    }
    const account = await getAccountById(parseInt(accountId));
    if (!account) {
      return new Response("Account not found", { status: 404 });
    }
    const email = account.email!;
    if (action !== "TRASH" && action !== "UNTRASH") {
      return new Response("Invalid Action", { status: 400 });
    }
    if (!emailId) {
      return new Response("Invalid Email ID", { status: 400 });
    }
    if (!account) {
      return new Response("Invalid Account", { status: 400 });
    }
    const refresh = await getRefresh(user.id!, email);
    if (!refresh) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { refresh_token } = refresh;
    const handler = await getGoogleApiHandler(refresh_token);
    let res;
    if (action === "TRASH") {
      res = await trashEmail(emailId, handler);
    } else {
      res = await untrashEmail(emailId, handler);
    }
    if (!res) {
      return new Response("Failed to Trash/Untrash", { status: 500 });
    }
    return new Response("Success", { status: 200 });
  } catch (e) {
    return new Response("Failed to Trash/Untrash", { status: 500 });
  }
}
