import { analyze } from "@/actions/genAI/emailAnalysis";
import { getAILabels } from "@/actions/genAI/dbOperations";
import { convertAndFilterHTMLToText, decodeAndSanitizeHTML } from "@/lib/utils";
import { getEmailData } from "@/actions/mail/email";
import { setAnalysis } from "@/actions/genAI/dbOperations";
import { Email, Label, Tag } from "@/types";

interface AnalysisReturnType {
  data: {
    summary: string | null | undefined;
    isImportant: boolean | null | undefined;
    actions: string[] | null | undefined;
    tag: Tag | null | undefined;
  };
  success: boolean;
}

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { emailIDs } = reqBody;
    const labels: Label[] = (await getAILabels()) || [];
    const res = await Promise.all(
      emailIDs.map(async (emailId: string) => {
        try {
          const data: Email | null = await getEmailData(emailId);
          if (data) {
            const body = convertAndFilterHTMLToText(
              Buffer.from(data.body || "", "base64").toString("utf-8")
            );
            const analysis: AnalysisReturnType = await analyze(body, labels);
            if (analysis.success) {
              const emailAnalysis = {
                emailId,
                summary: analysis.data.summary,
                tag: analysis.data.tag,
                actions: analysis.data.actions,
                isImportant: analysis.data.isImportant,
              };
              const set = await setAnalysis(emailAnalysis);
              if (!set) {
                return { analysis: {}, emailId, success: false };
              }
              return { analysis: analysis.data, emailId, success: true };
            } else {
              return { analysis: {}, emailId, success: false };
            }
          }
        } catch (e) {
          return { analysis: {}, emailId, success: false };
        }
      })
    );
    if (res.length === 0) {
      return new Response("No Emails Found", { status: 404 });
    }

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (e) {
    return new Response("Internal Server Error - While Analyzing Email", {
      status: 500,
    });
  }
}
