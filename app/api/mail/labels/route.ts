import { getAILabels } from "@/actions/inbox/labels";
export async function GET(request: Request) {
  try {
    const data = await getAILabels();
    if (!data) {
      return new Response("Unauthorized", { status: 401 });
    }
    return Response.json(data, { status: 201 });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
