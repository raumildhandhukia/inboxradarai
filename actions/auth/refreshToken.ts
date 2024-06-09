"use server";
import { db } from "@/lib/db";

export const storeRefresh = async (
  refresh_token: string,
  providerAccountId: string
) => {
  try {
    await db.account.updateMany({
      where: { providerAccountId },
      data: { refresh_token },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getRefresh = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });
    return {
      refresh_token: account?.refresh_token || "",
      provider: account?.provider || "",
    };
  } catch (error) {
    console.error(error);
  }
};
