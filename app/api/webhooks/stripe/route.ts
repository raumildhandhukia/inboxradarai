import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    );
  }

  if (event.type === "customer.subscription.updated") {
    const session = event.data.object as Stripe.Subscription;
    try {
      const subscription = await stripe.subscriptions.retrieve(
        session.id as string
      );
      const planId = subscription.items.data[0].price.id;
      const user = await db.user.findFirst({
        where: {
          stripeSubscriptionId: subscription.id,
        },
      });
      if (!user) {
        return new Response(null, {
          status: 200,
        });
      }
      await db.user.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: planId,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          lastFreeTierRefillDate: new Date(
            subscription.current_period_end * 1000
          ),
          changeToFreePlanOnPeriodEnd: subscription.cancel_at_period_end,
        },
      });
    } catch (error) {
      console.error("Error updating user", error);
      return new Response(null, {
        status: 500,
      });
    }
  }
  if (event.type === "customer.subscription.deleted") {
    const session = event.data.object as Stripe.Subscription;
    try {
      const subscription = await stripe.subscriptions.retrieve(
        session.id as string
      );
      const planId = subscription.items.data[0].price.id;
      const user = await db.user.findFirst({
        where: {
          stripeSubscriptionId: subscription.id,
        },
      });
      if (!user) {
        return new Response(null, {
          status: 200,
        });
      }
      await db.user.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: planId,
          stripeCurrentPeriodEnd: new Date(),
          lastFreeTierRefillDate: new Date(),
          emailProcessed: 0,
          changeToFreePlanOnPeriodEnd: false,
        },
      });
    } catch (error) {
      console.error("Error updating user", error);
      return new Response(null, {
        status: 500,
      });
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    const session = event.data.object as Stripe.Invoice;
    if (session.billing_reason == "subscription_create") {
      return new Response(null, {
        status: 200,
      });
    }
    try {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      await db.user.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          lastFreeTierRefillDate: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });
    } catch (error) {
      console.error("Error updating user", error);
      return new Response(null, {
        status: 500,
      });
    }
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      if (!session?.metadata?.userId) {
        console.warn("No user ID found in metadata");
        return new Response(null, {
          status: 200,
        });
      }
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      await db.user.update({
        where: {
          id: session.metadata.userId,
        },
        data: {
          stripeCustomerId: subscription.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          lastFreeTierRefillDate: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });
    } catch (error) {
      console.error("Error updating user", error);
      return new Response(null, {
        status: 500,
      });
    }
  }

  return new Response(null, { status: 200 });
}
