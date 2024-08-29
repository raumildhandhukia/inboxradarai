import { PLANS } from "@/config/app";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import Stripe from "stripe";

const DOMAIN = process.env.DOMAIN_URL ?? "http://localhost:3000";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-06-20",
  typescript: true,
});

export async function getUserSubscriptionPlan() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return {
      ...PLANS[0],
      isSubscribed: false,
      isCanceled: false,
      stripeCurrentPeriodEnd: null,
    };
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    return {
      ...PLANS[0],
      isSubscribed: false,
      isCanceled: false,
      stripeCurrentPeriodEnd: null,
    };
  }

  const isSubscribed = Boolean(
    dbUser.stripePriceId &&
      dbUser.stripeCurrentPeriodEnd && // 86400000 = 1 day
      dbUser.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
  );

  const plan = isSubscribed
    ? PLANS.find((plan) => plan.price.priceIds.test === dbUser.stripePriceId)
    : null;

  let isCanceled = false;
  if (isSubscribed && dbUser.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      dbUser.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    stripeSubscriptionId: dbUser.stripeSubscriptionId,
    stripeCurrentPeriodEnd: dbUser.stripeCurrentPeriodEnd,
    stripeCustomerId: dbUser.stripeCustomerId,
    isSubscribed,
    isCanceled,
  };
}

export async function createStripeSession(userId: string, planSlug: string) {
  const billingUrl = DOMAIN + "/billing";

  if (!userId) throw new Error("User ID is required");

  const dbUser = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!dbUser) throw new Error("User not found");

  const subscriptionPlan = await getUserSubscriptionPlan();

  if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: dbUser.stripeCustomerId,
      return_url: billingUrl,
    });

    return { url: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billingUrl,
    cancel_url: billingUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [
      {
        price: PLANS.find((plan) => plan.name === "Pro")?.price.priceIds.test,
        quantity: 1,
      },
    ],
    metadata: {
      userId: userId,
      plan: planSlug,
    },
  });

  return { url: stripeSession.url };
}
