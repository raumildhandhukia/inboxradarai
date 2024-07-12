import React from "react";
import { auth } from "@/auth";
import { createStripeSession } from "@/lib/stripe";
import { redirect } from "next/navigation";
interface SubscribeProps {
  params: { plan: string };
}

const Subscribe = async ({ params }: SubscribeProps) => {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) {
    return null;
  }
  const plan = params.plan;
  const { url } = await createStripeSession(user.id, plan);
  if (url) {
    redirect(url);
  }

  return <div>{`subscribe to ${plan}`}</div>;
};

export default Subscribe;
