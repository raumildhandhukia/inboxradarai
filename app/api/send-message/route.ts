import { sendMessage } from "@/actions/sendMessage";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await sendMessage(body);
    return new Response("Sent", {
      status: 200,
    });
  } catch (e) {
    return new Response("Not sent", { status: 500 });
  }
}
