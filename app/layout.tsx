import type { Metadata } from "next";
import { Anonymous_Pro, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
const poppins = Poppins({
  weight: ["100", "300", "500", "700"],
  subsets: ["latin"],
});
const pro = Anonymous_Pro({
  weight: ["400", "700"],
  subsets: ["greek"],
});

export const metadata: Metadata = {
  title: "Inbox Radar AI",
  description: "AI powered job application tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pro.className} ${poppins.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-white dark:bg-neutral-950">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
