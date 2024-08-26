import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header: React.FC<HeaderProps> = ({ label }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1
        className={cn(
          font,
          "text-3xl font-semibold text-zinc-900 dark:text-zinc-200",
          font.className
        )}
      >
        Inbox Radar
      </h1>
      <p className="text-muted-foreground text-md">{label}</p>
    </div>
  );
};
