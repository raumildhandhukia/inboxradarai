import { getInboxByUserId } from "@/data/inbox";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Mail from "@/components/mail/page";

import React from "react";

const Page = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }
  const inboxes = await getInboxByUserId(userId);

  if (inboxes.length === 0) {
    redirect("/add-inbox");
  } else {
    return <Mail />;
  }
};

export default Page;
