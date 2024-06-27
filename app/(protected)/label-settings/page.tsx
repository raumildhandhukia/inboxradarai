import React from "react";
import Settings from "@/components/home/label-settings";
import { Label } from "@/types";
import { getAILabels } from "@/data/AIOperations";
import Logo from "@/public/Logo";
import { auth } from "@/auth";
const Page = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return <div>Unauthorized</div>;
  }
  let labels: Label[] | null = await getAILabels(user);
  if (!labels) {
    labels = [];
  }

  return (
    <div className="relative w-full h-full">
      <Logo className="w-52 absolute top-10 left-20" color="black" />
      <div className="absolute top-14 right-20">
        <span className="text-4xl font-bold">AI Label Settings</span>
      </div>

      <div className="flex items-center justify-center w-full h-full">
        <Settings existingLabels={labels} />
      </div>
    </div>
  );
};

export default Page;
