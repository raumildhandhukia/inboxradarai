"use server";
import { db } from "@/lib/db";

export const userInfo = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        tags: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
