import { getInboxData } from "@/data/email";
import { Email } from "@/types";
import { auth } from "@/auth";
import { verifyAccount, getAccountById } from "@/data/account";
interface ReturnType {
  emails: Email[];
  nextPageToken: string | null | undefined;
}

export async function GET(request: Request) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const type = searchParams.get("type");
    const accountId = searchParams.get("accountId");
    if (!accountId || !(await verifyAccount(parseInt(accountId), user.id!))) {
      return new Response("No Email Provided", { status: 404 });
    }
    const account = await getAccountById(parseInt(accountId));
    if (!account) {
      return new Response("Account not found", { status: 404 });
    }
    const email = account.email!;
    const labelId = searchParams.get("label");
    const data: ReturnType | null = await getInboxData(
      page,
      type,
      user,
      labelId,
      email
    );
    if (!data) {
      return new Response("Unauthorized", { status: 401 });
    }

    return Response.json(data, { status: 201 });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
