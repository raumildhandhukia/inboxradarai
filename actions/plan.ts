"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { PLANS } from "@/config/app";

type Plan = {
  id: number;
  name: string;
  plan: string;
  emailsAllowed: number;
  processLimit: boolean;
  autoProcess: boolean;
  customTag: number;
  totalTags: number;
  price: {
    amount: number;
    priceIds: {
      test: string;
      production: string;
    };
  };
};

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
        dbUser.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    );
    if (!isSubscribed) {
      return {
        plan: PLANS.find((plan) => plan.plan === "FREE") as Plan,
        isSubscribed: false,
        isCanceled: dbUser.changeToFreePlanOnPeriodEnd,
      };
    }
    const plan = PLANS.find(
      (plan) => plan.price.priceIds.test === dbUser.stripePriceId
    );
    return {
      plan: { ...plan } as Plan,
      isSubscribed,
      isCanceled: false,
    };
  } catch (e) {
    return null;
  }
};
