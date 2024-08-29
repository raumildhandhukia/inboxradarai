import { performCronOperations } from "@/data/user";

const CRON_KEY = process.env.CRON_KEY;
export async function POST(req: Request) {
  try {
    if (!CRON_KEY) {
      return new Response("Failure with system. No Cron Key Found in System.", {
        status: 401,
      });
    }
    const body = await req.json();
    const { key } = body;
    if (key !== CRON_KEY) {
      return new Response("Unauthorized", { status: 401 });
    }
    const res = await performCronOperations();
    if (!res) {
      return new Response("Cron Failed", {
        status: 500,
      });
    }
    return new Response("Cron Successfully", { status: 200 });
  } catch (e) {
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
