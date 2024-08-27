import { auth } from "@/auth";
import { generateAutocompleteSuggestions } from "@/data/gemini";
import { PLANS } from "@/config/app";
import { type Plan } from "@/config/app";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user || !user.email) {
      return new Response("Unauthorized", { status: 401 });
    }
    const plan: Plan | undefined = PLANS.find(
      (p: Plan) => p.price.priceIds.test === user.stripePriceId
    );
    if (!plan || !plan.contentAi) {
      return new Response("Upgrade Your Plan, Sir !!!", { status: 401 });
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
