import { queryInbox } from "@/data/email";
import { Email, EmailSearchResultProps } from "@/types";
import { auth } from "@/auth";
import { verifyAccount, getAccountById } from "@/data/account";

type ResponseType = {
  emails: Email[];
  nextPageToken: string | null | undefined;
} | null;

export async function GET(request: Request) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");
  if (!accountId || !(await verifyAccount(parseInt(accountId), user.id!))) {
    return new Response("Unauthorized", { status: 404 });
  }
  const account = await getAccountById(parseInt(accountId));
  if (!account) {
    return new Response("Account not found", { status: 404 });
  }
  const email = account.email!;
  const query = searchParams.get("query");
  if (!query) {
    return new Response("Bad Request", { status: 400 });
  }
  const page =
    searchParams.get("page") && searchParams.get("page") !== "null"
      ? searchParams.get("page") || undefined
      : undefined;

  try {
    const data: ResponseType = await queryInbox(query, user, email, page);
    if (!data) {
      return new Response("Unauthorized", { status: 401 });
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
