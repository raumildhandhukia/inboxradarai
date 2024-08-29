import { getAILabels } from "@/data/AIOperations";
import { auth } from "@/auth";
export async function GET(request: Request) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const data = await getAILabels(user.id!);
    if (!data) {
      return new Response("Unauthorized", { status: 401 });
    }
    return Response.json(data, { status: 201 });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
