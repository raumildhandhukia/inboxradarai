"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
export const getAILabels = async () => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user || !user.id) {
      return null;
    }
    const labels = await db.tag.findMany({
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
