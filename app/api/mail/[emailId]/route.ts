import { Email } from "@/types";
import { getEmailData } from "@/actions/mail/email";

export async function GET(
  request: Request,
  { params }: { params: { emailId: string } }
) {
  try {
    const data: Email | null = await getEmailData(params.emailId);
    if (!data) {
      return new Response("Unauthorized", { status: 401 });
    }
    return Response.json(data, { status: 200 });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
