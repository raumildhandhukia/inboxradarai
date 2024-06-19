"use client";
import Inbox from "@/components/home/inbox/inbox";

import { useSearchParams } from "next/navigation";
export default function Page() {
  const searchParams = useSearchParams();
  const search = searchParams.get("type");
  return (
    <div className="mx-5 border-t rounded-3xl shadow-lg">
      <Inbox type={search} />
    </div>
  );
}
