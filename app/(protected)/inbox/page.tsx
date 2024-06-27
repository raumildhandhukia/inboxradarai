"use client";
import Inbox from "@/components/home/inbox/inbox";

import { useSearchParams } from "next/navigation";
export default function Page() {
  const searchParams = useSearchParams();
  const search = searchParams.get("type");
  return <Inbox type={search} />;
}
