import { queryInbox } from "@/data/email";
import { Email, EmailSearchResultProps } from "@/types";
import { auth } from "@/auth";

type ResponseType = {
  emails: Email[];
  nextPageToken: string | null | undefined;
} | null;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  if (!query) {
    return new Response("Bad Request", { status: 400 });
  }
  const page =
    searchParams.get("page") && searchParams.get("page") !== "null"
      ? searchParams.get("page") || undefined
      : undefined;

  const email = searchParams.get("email");
  if (!email) {
    return new Response("Bad Request", { status: 400 });
  }
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
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
