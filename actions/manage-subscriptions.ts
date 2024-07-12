"use server";
import { createStripeSession } from "@/lib/stripe";
export const manageSubscriptions = async (userId: string, plan: string) => {
  const { url } = await createStripeSession(userId, plan);
  return url;
};
