import { getInboxData } from "@/actions/auth/inbox/email";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const data = await getInboxData(page);
    return Response.json(data);
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
