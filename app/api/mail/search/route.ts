import { queryInbox } from "@/data/email";
import { EmailSearchResultProps } from "@/types";
import { auth } from "@/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  if (!query) {
    return new Response("Bad Request", { status: 400 });
  }
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const data: EmailSearchResultProps[] | null = await queryInbox(query, user);
    if (!data) {
      return new Response("Unauthorized", { status: 401 });
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
