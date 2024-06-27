"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { AnalysisType, EmailAnalysis, Label } from "@/types";
import { PLANS, REQUEST_COOL_DOWN } from "@/config/app";

import { model } from "@/lib/gemini";
import { User } from "next-auth";

interface ExtUser extends User {
  plan: string;
}
export const analyze = async (
  body: string,
  labels: Label[]
): Promise<AnalysisType> => {
  if (body.length === 0) {
    return {
      success: false,
    } as AnalysisType;
  }
  const labelsList: string = labels
    .map(
      (label, index) =>
        `Label ${index + 1}) 
          id:${label.id} 
          label:${label.label} 
          description:${label.description} 
          color:${label.color}`
    )
    .join(", ");
  const prompt = `
  Response Return Type: JSON OBJECT
  Response Example (MUST INCLUDE ALL KEYS): {
      "summary": "The email is about .....",
      "isImportant": false/true (replace with actual value) (true if it is really important, newsletter are not important. promotional emails are not important, social media notification emails are not important.), 
      personolized email are important, emails which requires next steps, or it is a decision, or it is financial email, or it is tracking, or it is message from someone, or it is reciept, or it is security,
      or it is security code, or it is alert, or it is confirmation or it is invitation
      "actions": ["Action 1", "Action 2", "Action 3"] (replace with actual actions, keep empty if no actions needed. ),
      "tag":"Label id from the list of labels provided"}

  Email Data ${body}
  Instructions:
  1) Summerize the email content. max 3 small lines.
  2) Identify if the email is important or not. (true/false) 
  3) List any actions that need to be taken. Max 3 actions. Actions should be in the form of a string. You should decide what actions are suitable for the email.
     Actions can be empty too if no actions needed. Dependent upon nature of email decide if actions are needed or not.
  4) Assign a tag (Fields returned (id, label, description, color)) to the email from the following list: [${labelsList}]
     if list does not contain any labels which are suitable for the email or label list is empty, value for AILabel should be null.
  `;
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const textToJson: EmailAnalysis = JSON.parse(text);
    return {
      success: true,
      analysis: textToJson,
    } as AnalysisType;
  } catch (e) {
    return {
      success: false,
    } as AnalysisType;
  }
};

export const setAnalysis = async (
  { ...emailAnalysis }: EmailAnalysis,
  user: User
) => {
  const { emailId, summary, isImportant, tag, actions } = emailAnalysis;

  try {
    await db.processedEmails.upsert({
      where: {
        emailId,
        userId: user.id,
      },
      update: {
        summary,
        tagId: tag?.id || null,
        actions: actions || [],
        isImportant: isImportant || false,
      },
      create: {
        emailId,
        userId: user.id!,
        summary,
        tagId: tag?.id || null,
        actions: actions || [],
        isImportant: isImportant || false,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};
export const getAnalysis = async (
  emailIDs: string[],
  user: User
): Promise<EmailAnalysis[] | null> => {
  try {
    const analysis = await db.processedEmails.findMany({
      select: {
        emailId: true,
        summary: true,
        tag: {
          select: {
            id: true,
            label: true,
            color: true,
            description: true,
          },
        },
        actions: true,
        isImportant: true,
      },
      where: {
        userId: user.id,
        emailId: {
          in: emailIDs,
        },
      },
    });
    return analysis as EmailAnalysis[];
  } catch (e) {
    return null;
  }
};

export const getAILabels = async (user: User): Promise<Label[]> => {
  try {
    const labels = await db.tag.findMany({
      select: {
        id: true,
        label: true,
        description: true,
        color: true,
        predefinedId: true,
        isActive: true,
      },
      where: {
        userId: user.id,
      },
    });

    return labels as Label[];
  } catch (e) {
    return [];
  }
};

interface AllowedResponse {
  isValid: boolean;
  timeLeft: number;
  emailsLeft: number;
}

export const isAIAnalysisAllowed = async (
  user: ExtUser
): Promise<AllowedResponse> => {
  try {
    const res = await getAPIStats(user);
    const stats = res?.stats;
    const plan = res?.plan;

    if (!plan || !stats) {
      return { isValid: false, timeLeft: 0, emailsLeft: 0 };
    }

    const currentPlan = PLANS.find((p) => p.plan === plan);
    const processLimit = currentPlan?.processLimit;
    const allowedEmails = currentPlan?.emailsAllowed || 0;

    if (stats.emailProcessed && stats.emailProcessed >= allowedEmails) {
      return {
        isValid: false,
        timeLeft:
          ((stats.nextAPITime?.getTime() || 0) - new Date().getTime()) / 1000,
        emailsLeft: allowedEmails - stats.emailProcessed,
      };
    }

    if (
      processLimit &&
      stats.nextAPITime &&
      stats.nextAPITime.getTime() > new Date().getTime()
    ) {
      return {
        isValid: false,
        timeLeft:
          ((stats.nextAPITime?.getTime() || 0) - new Date().getTime()) / 1000,
        emailsLeft: allowedEmails - stats.emailProcessed!,
      };
    }

    return {
      isValid: true,
      timeLeft: 0,
      emailsLeft: allowedEmails - stats.emailProcessed!,
    };
  } catch (error) {
    console.error("Error in isAIAnalysisAllowed:", error);
    return { isValid: false, timeLeft: 0, emailsLeft: 0 };
  }
};

export const getAPIStats = async (user: ExtUser) => {
  try {
    const stats = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        emailProcessed: true,
        nextAPITime: true,
      },
    });
    if (!stats) {
      return {
        stats: {
          emailProcessed: 0,
          nextAPITime: new Date(),
        },
        plan: user.plan,
      };
    }
    if (stats && !stats.emailProcessed) {
      stats.emailProcessed = 0;
    }
    if (stats && !stats.nextAPITime) {
      stats.nextAPITime = new Date();
    }
    return { stats, plan: user.plan };
  } catch (e) {
    return {
      stats: {
        emailProcessed: 0,
        nextAPITime: new Date(),
      },
      plan: user.plan,
    };
  }
};

export const setAPIStats = async (emailProcessed: number, user: ExtUser) => {
  const plan = user.plan;
  if (!plan) {
    return false;
  }
  let nextAIAnalysysTime = new Date();
  const currentPlan = PLANS.find((p) => p.plan === plan);
  if (currentPlan?.processLimit) {
    // Add one minute to the current time
    nextAIAnalysysTime = new Date(new Date().getTime() + REQUEST_COOL_DOWN);
  }

  try {
    const currentUserData = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        emailProcessed: true,
      },
    });

    const updatedEmailProcessed =
      (currentUserData?.emailProcessed || 0) + emailProcessed;

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailProcessed: updatedEmailProcessed,
        nextAPITime: nextAIAnalysysTime,
      },
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
