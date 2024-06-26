import { cn } from "@/lib/utils";
const FancyButton = ({
  submit,
  onClick,
  children,
  className,
}: {
  submit?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <button
    type={`${submit ? "submit" : "button"}`}
    onClick={onClick}
    className="bg-white dark:bg-slate-800 no-underline group cursor-pointer relative dark:shadow-2xl dark:shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  dark:text-white inline-block"
  >
    <span className="absolute inset-0 overflow-hidden rounded-full">
      <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </span>
    <div
      className={cn(
        `relative flex space-x-2 items-center z-10 rounded-full bg-zinc-100 dark:bg-zinc-950 px-4 py-1 ring-1 ring-black-100/100 dark:ring-white/10`,
        className
      )}
    >
      {children}
    </div>
    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
  </button>
);
export default FancyButton;
