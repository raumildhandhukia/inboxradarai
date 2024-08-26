import { auth } from "@/auth";
import { generateAutocompleteSuggestions } from "@/data/gemini";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user || !user.email) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { context } = body;
    const response = await generateAutocompleteSuggestions(context);
    return new Response(response, { status: 200 });
  } catch (e) {
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
