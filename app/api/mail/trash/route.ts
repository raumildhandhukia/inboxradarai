import { auth as getSession } from "@/auth";
import { getRefresh } from "@/actions/auth/account";
import { trashEmail, untrashEmail, getGoogleApiHandler } from "@/data/gmail";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const user = session?.user;
    if (!user || !user.email) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { emailId, account, action } = body;
    if (action !== "TRASH" && action !== "UNTRASH") {
      return new Response("Invalid Action", { status: 400 });
    }
    if (!emailId) {
      return new Response("Invalid Email ID", { status: 400 });
    }
    if (!account) {
      return new Response("Invalid Account", { status: 400 });
    }
    const refresh = await getRefresh(user.id!, account);
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
