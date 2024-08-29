import Nav from "@/components/public/nav";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="px-32 py-20 prose !min-w-full">{children}</div>;
}
