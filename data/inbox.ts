import { db } from "@/lib/db";

export const getInboxByUserId = async (userId: string) => {
  try {
    const inbox = await db.account.findMany({
      where: {
        userId,
      },
    });
    return inbox;
  } catch (e) {
    return [];
  }
};
