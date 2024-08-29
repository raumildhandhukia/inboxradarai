"use server";
import { db } from "@/lib/db";
import { EmailAnalysis, Label } from "@/types";
import { REQUEST_COOL_DOWN } from "@/config/app";

import { User } from "next-auth";
import { getUserPlan } from "@/actions/plan";

interface ExtUser extends User {
  stripePriceId: string;
}
export const setAnalysis = async (
  { ...emailAnalysis }: EmailAnalysis,
  user: User,
  emailAddress: string
) => {
  const { emailId, summary, isImportant, tags, actions } = emailAnalysis;
  try {
    const processedEmail = await db.processedEmails.upsert({
      where: { emailId },
      update: {
        emailAddress,
        summary,
        actions,
        isImportant,
      },
      create: {
        emailId,
        emailAddress,
        userId: user.id!,
        summary,
        actions,
        isImportant,
      },
    });
    const deleted = await db.processedEmailsOnTags.deleteMany({
      where: {
        emailId: processedEmail.id,
      },
    });
    const created = await db.processedEmailsOnTags.createMany({
      data: tags.map((t) => ({
        emailId: processedEmail.id,
        tagId: t.id,
      })),
    });
    return true;
  } catch (e) {
    console.error("Error in setAnalysis:", e);
    return false;
  }
};

// returns the AI analysis for the given email IDs
export const getAnalysis = async (
  emailIDs: string[],
  user: User,
  emailAddress: string
): Promise<EmailAnalysis[] | null> => {
  try {
    if (emailIDs.length > 1) {
      console.error("Error in getAnalysis: emailIDs length is greater than 1");
    }
    const apperentlyManyanalysisBecauseOfPoorShemaDesign =
      await db.processedEmails.findMany({
        select: {
          emailId: true,
          summary: true,
          isImportant: true,
          actions: true,
          tags: {
            select: {
              tag: {
                select: {
                  id: true,
                  label: true,
                  description: true,
                  color: true,
                  predefinedId: true,
                  isActive: true,
                },
              },
            },
          },
        },
        where: {
          emailId: emailIDs[0],
          emailAddress,
          userId: user.id!,
        },
      });
    const analysis = apperentlyManyanalysisBecauseOfPoorShemaDesign[0];

    return [
      {
        emailId: analysis.emailId,
        summary: analysis.summary,
        isImportant: analysis.isImportant,
        actions: analysis.actions,
        tags: analysis.tags.map((t) => t.tag),
      },
    ] as EmailAnalysis[];
  } catch (e) {
    return null;
  }
};

// Returns the labels for the user
export const getAILabels = async (userId: string): Promise<Label[]> => {
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
        userId: userId,
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

// checks if AI analysis is allowed, and returns values for time left and emails left
export const isAIAnalysisAllowed = async (
  user: ExtUser
): Promise<AllowedResponse> => {
  try {
    const res = await getAPIStats(user);
    const stats = res?.stats;
    const ResUserPlan = await getUserPlan();
    if (!ResUserPlan) {
      return { isValid: false, timeLeft: 0, emailsLeft: 0 };
    }
    const plan = ResUserPlan.plan;

    if (!plan || !stats) {
      return { isValid: false, timeLeft: 0, emailsLeft: 0 };
    }

    const processLimit = plan?.processLimit;
    const allowedEmails = plan?.emailsAllowed || 0;

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

// Returns the API stats for the user related to the API usage
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
      };
    }
    if (stats && !stats.emailProcessed) {
      stats.emailProcessed = 0;
    }
    if (stats && !stats.nextAPITime) {
      stats.nextAPITime = new Date();
    }
    return { stats };
  } catch (e) {
    return {
      stats: {
        emailProcessed: 0,
        nextAPITime: new Date(),
      },
    };
  }
};

// setting the stats for the user about API usage
export const setAPIStats = async (emailProcessed: number, user: ExtUser) => {
  const res = await getUserPlan();
  const plan = res?.plan;
  if (!plan) {
    return false;
  }
  let nextAIAnalysysTime = new Date();

  if (plan?.processLimit) {
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

// Returns the Email IDs of emails that have the given label and email address
export const getLabelEmails = async (labelId: string, email: string) => {
  const label = await db.processedEmailsOnTags.findMany({
    where: {
      tagId: labelId,
      processedEmail: {
        emailAddress: email,
      },
    },
    select: {
      emailId: true,
      processedEmail: {
        select: {
          emailId: true,
        },
      },
    },
  });
  const emailIds = label.map((l) => l.processedEmail.emailId);
  return emailIds as string[];
};
