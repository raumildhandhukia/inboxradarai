"use client";
import SideBarCotextProvider from "@/context/side-bar-context";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <SideBarCotextProvider>{children}</SideBarCotextProvider>;
}
