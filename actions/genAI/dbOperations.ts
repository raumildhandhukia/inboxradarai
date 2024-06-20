"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { EmailAnalysis, Label } from "@/types";

export const setAnalysis = async ({ ...emailAnalysis }: EmailAnalysis) => {
  const { emailId, summary, isImportant, tag, actions } = emailAnalysis;
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) {
    return false;
  }
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
        userId: user.id,
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
export const getAnalysis = async (emailIDs: string[]) => {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) {
    return null;
  }
  try {
    const analysis: EmailAnalysis[] = await db.processedEmails.findMany({
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
    return analysis;
  } catch (e) {
    return null;
  }
};

export const getAILabels = async () => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user || !user.id) {
      return null;
    }
    const labels: Label[] = await db.tag.findMany({
      select: {
        id: true,
        label: true,
        description: true,
        color: true,
      },
      where: {
        userId: user.id,
      },
    });
    return labels;
  } catch (e) {
    return null;
  }
};
