"use server";
import { db } from "@/lib/db";

export const storeAccountData = async (
  refresh_token: string,
  providerAccountId: string,
  email: string
) => {
  try {
    await db.account.updateMany({
      where: { providerAccountId },
      data: { refresh_token, email },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getRefresh = async (userId: string, email: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId, email },
    });
    return {
      refresh_token: account?.refresh_token || "",
      provider: account?.provider || "",
    };
  } catch (error) {
    console.error(error);
  }
};
