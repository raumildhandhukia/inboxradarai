import { getInboxData } from "@/actions/inbox/email";
import { Email } from "@/types";

interface ReturnType {
  emails: Email[];
  nextPageToken: string | null | undefined;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const type = searchParams.get("type");
    const data: ReturnType | null = await getInboxData(page, type);
    if (!data) {
      return new Response("Unauthorized", { status: 401 });
    }
    return Response.json(data, { status: 201 });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
