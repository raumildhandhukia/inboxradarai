import {
  getAILabels,
  getAnalysis,
  setAPIStats,
  setAnalysis,
  isAIAnalysisAllowed,
} from "@/data/AIOperations";
import { analyze } from "@/data/gemini";
import { convertAndFilterHTMLToText, decodeAndSanitizeHTML } from "@/lib/utils";
import { getEmailData } from "@/data/email";
import {
  Email,
  Label,
  Tag,
  AnalysisType,
  AnalysisResponseType,
  SuccessResponseType,
  FailureResponseType,
  AnalysisFailure,
  EmailAnalysis,
} from "@/types";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const reqBody = await req.json();
    const {
      emailIDs,
      findExisting,
      emailAddress,
    }: { emailIDs: string[]; findExisting: boolean; emailAddress: string } =
      reqBody;
    if (!emailAddress) {
      return new Response("Email is required", { status: 400 });
    }
    const labels: Label[] = await getAILabels(user);
    let doneEmailIDs: string[] = [];
    let doneAnalysis: AnalysisResponseType[] = [];
    if (findExisting) {
      const existingAnalysis: EmailAnalysis[] | null = await getAnalysis(
        emailIDs,
        user
      );
      if (existingAnalysis && existingAnalysis.length > 0) {
        doneEmailIDs = existingAnalysis.map((analysis) => analysis.emailId);
        doneAnalysis = existingAnalysis.map((analysis) => ({
          analysis,
          emailId: analysis.emailId,
          success: true,
        }));
      }
    }

    const remainingEmailIDs = emailIDs.filter(
      (emailId: string) => !doneEmailIDs.includes(emailId)
    );
    const stats = await isAIAnalysisAllowed(user);
    const isUnderLimit = stats ? stats?.isValid : true;
    const timeLeft = stats ? stats?.timeLeft : 0;
    const emailsLeft = stats ? stats?.emailsLeft : 0;

    if (!isUnderLimit) {
      const remainingAnalysis: FailureResponseType[] = remainingEmailIDs.map(
        (emailId: string) => ({
          emailId,
          success: false,
          limitExceeded: true,
          emailsLeft,
          timeLeft,
        })
      );
      doneAnalysis = doneAnalysis.concat(remainingAnalysis);
      return new Response(JSON.stringify(doneAnalysis), { status: 251 });
    }

    const remainingAnalysis: AnalysisResponseType[] = await Promise.all(
      remainingEmailIDs.map(async (emailId: string) => {
        try {
          const data: Email | null = await getEmailData(
            emailId,
            user,
            emailAddress
          );
          if (data) {
            const body = convertAndFilterHTMLToText(
              Buffer.from(data.body || "", "base64").toString("utf-8")
            );
            const res: AnalysisType = await analyze(body, labels);
            if (!res) {
              return {
                emailId,
                success: false,
              } as FailureResponseType;
            }
            if (res.success) {
              const analysis = (res as SuccessResponseType).analysis;
              const emailAnalysis = {
                emailId,
                summary: analysis.summary,
                tag: analysis.tag,
                actions: analysis.actions,
                isImportant: analysis.isImportant,
              };
              const set = await setAnalysis(emailAnalysis, user, emailAddress);
              if (!set) {
                return {
                  emailId,
                  success: false,
                } as FailureResponseType;
              }
              return {
                analysis,
                emailId,
                success: true,
              } as SuccessResponseType;
            } else {
              return {
                emailId,
                success: false,
              } as FailureResponseType;
            }
          } else {
            return {
              emailId,
              success: false,
            } as FailureResponseType;
          }
        } catch (e) {
          return {
            emailId,
            success: false,
          } as FailureResponseType;
        }
      })
    );
    await setAPIStats(remainingAnalysis.length, user);
    doneAnalysis = doneAnalysis.concat(remainingAnalysis);

    if (doneAnalysis.length === 0) {
      return new Response("No Emails Found", { status: 404 });
    }

    return new Response(JSON.stringify(doneAnalysis), { status: 200 });
  } catch (e) {
    return new Response("Internal Server Error - While Analyzing Email", {
      status: 500,
    });
  }
}
