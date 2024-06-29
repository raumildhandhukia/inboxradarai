"use client";
import EmailDetailContext from "@/context/email-detail-context";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <EmailDetailContext>{children}</EmailDetailContext>;
}
