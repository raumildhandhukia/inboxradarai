"use client";
import InboxCotextProvider from "@/context/inbox-context";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <InboxCotextProvider>{children}</InboxCotextProvider>;
}
