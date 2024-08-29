import React from "react";
import Settings from "@/components/home/label-settings";
import { Label } from "@/types";
import { getAILabels } from "@/data/AIOperations";
import Logo from "@/public/Logo";
import { auth } from "@/auth";
import { getUserPlan } from "@/actions/plan";
const Page = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return <div>Unauthorized</div>;
  }

  const res = await getUserPlan();
  const plan = res?.plan;
  if (!plan) {
    return <div>Unauthorized</div>;
  }

  return <Settings plan={plan} />;
};

export default Page;
