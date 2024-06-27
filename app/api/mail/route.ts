import { getInboxData } from "@/data/email";
import { Email } from "@/types";
import { auth } from "@/auth";

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
    const data: ReturnType | null = await getInboxData(page, type, user);
    if (!data) {
      return new Response("Unauthorized", { status: 401 });
    }
    return Response.json(data, { status: 201 });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
