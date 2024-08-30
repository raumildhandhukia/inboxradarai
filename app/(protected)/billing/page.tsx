import React from "react";
import BillingForm from "@/components/home/billing-form";
import { getUserSubscriptionPlan } from "@/lib/stripe";

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();
  console.log("subscriptionPlan", subscriptionPlan);
  return <BillingForm subscriptionPlan={subscriptionPlan} />;
};

export default Page;
