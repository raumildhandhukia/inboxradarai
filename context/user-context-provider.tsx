"use client";
import UserContextProvider from "@/context/user-context";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <UserContextProvider>{children}</UserContextProvider>;
}
