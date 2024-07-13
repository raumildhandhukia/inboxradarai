import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  console.log("Received event with body:", body);
  console.log("Received signature:", signature);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
    console.log("Constructed event:", event);
  } catch (err) {
    console.error("Webhook Error:", err);
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  console.log("Event type:", event.type);
  console.log("Session object:", session);

  if (!session?.metadata?.userId) {
    console.warn("No userId found in session metadata.");
    return new Response(null, {
      status: 200,
    });
  }

  if (event.type === "customer.subscription.updated") {
    try {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      console.log("Retrieved subscription:", subscription);

      const res = await db.user.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          plan: "NEW PLAN YAYY",
        },
      });

      console.log("Database update result:", res);
    } catch (err) {
      console.error("Error updating subscription:", err);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    try {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      console.log("Retrieved subscription:", subscription);

      const res = await db.user.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          plan: "FREE",
        },
      });

      console.log("Database update result:", res);
    } catch (err) {
      console.error("Error updating subscription:", err);
    }
  }

  if (event.type === "checkout.session.completed") {
    try {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      console.log("Retrieved subscription:", subscription);

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
          plan: session.metadata.plan.toUpperCase(),
        },
      });

      console.log("Updated user with checkout.session.completed event.");
    } catch (err) {
      console.error("Error updating user for checkout.session.completed:", err);
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    try {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      console.log("Retrieved subscription:", subscription);

      await db.user.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });

      console.log("Updated user with invoice.payment_succeeded event.");
    } catch (err) {
      console.error("Error updating user for invoice.payment_succeeded:", err);
    }
  }

  return new Response(null, { status: 200 });
}
