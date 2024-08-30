import { Email } from "@/types";
import { getEmailData } from "@/data/email";
import { auth } from "@/auth";
import { verifyAccount, getAccountById } from "@/data/account";

export async function GET(
  request: Request,
  { params }: { params: { emailId: string } }
) {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");
    if (!accountId || !(await verifyAccount(parseInt(accountId), user.id!))) {
      return new Response("No Email Provided", { status: 404 });
    }
    const account = await getAccountById(parseInt(accountId));
    if (!account) {
      return new Response("Account not found", { status: 404 });
    }
    const email = account.email!;
    const data: Email | null = await getEmailData(params.emailId, user, email);
    if (!data) {
      return new Response("Unauthorized", { status: 401 });
    }
    return Response.json(data, { status: 200 });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
