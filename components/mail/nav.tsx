"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { InboxContext } from "@/context/inbox-context";
import { MailPlus } from "lucide-react";

interface NavProps {
  isCollapsed: boolean;
  showCompose?: boolean;
  links: {
    id: string;
    text: string;
    icon?: React.JSX.Element;
    href: string;
    color?: string;
    type?: string;
  }[];
}

export function Nav({ links, isCollapsed, showCompose }: NavProps) {
  const searchParams = useSearchParams();
  const inboxType = searchParams.get("type");
  const labelName = searchParams.get("label");
  const { query, setQuery, setComposeMessage, setSelectedEmail } =
    useContext(InboxContext);

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {showCompose ? (
          isCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setComposeMessage(true)}
                  className="p-0 mb-2"
                  variant="indigo"
                >
                  <MailPlus className="w-4 h-4" />
                  <span className="sr-only">Compose</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                Compose
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              onClick={() => {
                setComposeMessage(true);
                setSelectedEmail(null);
              }}
              variant="indigo"
              className="flex gap-2 w-max rounded-2xl text-lg p-6"
            >
              <MailPlus />
              <span>Compose</span>
            </Button>
          )
        ) : null}
        {links.map((link, index) => {
          const variant =
            (inboxType &&
              link.type?.toLowerCase().includes(inboxType?.toLowerCase())) ||
            (labelName &&
              link.id.toLowerCase().includes(labelName?.toLowerCase()))
              ? "default"
              : "ghost";
          return isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant, size: "icon" }),
                    "h-9 w-9",
                    inboxType &&
                      link.text
                        .toLowerCase()
                        .includes(inboxType?.toLowerCase()) &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  {link.icon}
                  {link.color && (
                    <div
                      style={{
                        backgroundColor: link.color,
                        width: 15,
                        height: 15,
                        borderRadius: "50%",
                      }}
                    ></div>
                  )}
                  <span className="sr-only">{link.text}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.text}
                {/* {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )} */}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href={link.href}
              className={cn(
                buttonVariants({ variant, size: "sm" }),

                // "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              {link.icon && <div className="mr-2">{link.icon}</div>}
              {link.color && (
                <div
                  style={{
                    backgroundColor: link.color,
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                    marginRight: 12,
                    marginLeft: 2,
                  }}
                ></div>
              )}
              {link.text}
              {/* {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === link.variant &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )} */}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
