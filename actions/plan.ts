"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { PLANS, Plan } from "@/config/app";

export const getUserPlan = async () => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      throw new Error("User not found");
    }
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });
    if (!dbUser) {
      throw new Error("User not found");
    }
    const isSubscribed = Boolean(
      dbUser.stripePriceId &&
        dbUser.stripeCurrentPeriodEnd && // 86400000 = 1 day
        dbUser.stripeCurrentPeriodEnd.getTime() > Date.now()
    );
    if (!isSubscribed) {
      return {
        plan: PLANS.find((plan) => plan.plan === "FREE") as Plan,
        isSubscribed: false,
        isCanceled: dbUser.changeToFreePlanOnPeriodEnd,
      };
    }
    const plan = PLANS.find(
      (plan) => plan.price.priceIds.production === dbUser.stripePriceId
    );
    return {
      plan: { ...plan } as Plan,
      isSubscribed,
      isCanceled: dbUser.changeToFreePlanOnPeriodEnd,
    };
  } catch (e) {
    return null;
  }
};
