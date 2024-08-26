"use client";

import * as React from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MailPlus,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";
import { Account } from "@/types";
import { sidebarItems } from "@/data";
import { cn } from "@/lib/utils";
import Message from "@/components/mail/mail-message";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccountSwitcher } from "./account-switcher";
import { MailDisplay } from "./mail-display";
import { MailList } from "./mail-list";
import { Nav } from "./nav";
import Paginations from "@/components/home/inbox/pagination";
import {
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { type Mail } from "./data";
import { Email } from "@/types";

import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState, useTransition } from "react";
import { InboxContext } from "@/context/inbox-context";
import { UserContext } from "@/context/user-context";
import { text } from "stream/consumers";
import SearchBar from "../home/search-bar";

import Logo from "@/public/Logo";
import { Button } from "../ui/button";
import Profile from "../home/user-options-dropdown";
import { TbLogout2 } from "react-icons/tb";
import { logout } from "@/actions/auth/logout";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

interface MailProps {
  accounts: Account[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mail({
  accounts,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const { user } = useContext(UserContext);
  const { selectedAccount } = useContext(InboxContext);
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const { selectedEmail, setSelectedEmail, composeMessage, setComposeMessage } =
    useContext(InboxContext);
  const searchParams = useSearchParams();
  const inboxType = searchParams.get("type");
  const labelName = searchParams.get("label");
  const [refreshEmails, setRefreshEmails] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageTokens, setPageTokens] = useState<string[] | [null]>([null]);

  const {
    emails,
    setEmails,
    query,
    setQuery,
    isMessageBoxOpen,
    setIsMessageBoxOpen,
  } = useContext(InboxContext);
  const [isLoading, startTransition] = useTransition();
  const abortControllerRef = useRef<AbortController | null>(null);
  const router = useRouter();
  const userLabels = user?.labels || [];
  const labels = userLabels.map((label) => {
    return {
      id: label.id,
      text: label.label,
      color: label.color || "rgba(0,0,0,0.1)",
      href: `/inbox?label=${label.id}`,
    };
  });

  const handleRefresh = () => {
    setRefreshEmails(true);
  };
  let URL = `/api/mail?page=${
    pageTokens[Math.max(page - 1, 0)]
  }&email=${selectedAccount}`;
  if (inboxType) {
    URL += `&type=${inboxType}`;
  } else if (labelName) {
    URL += `&label=${labelName}`;
  }
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setEmails(data.emails);
        setSelectedEmail(data.emails[0]);
        setPageTokens((prev) => {
          prev[page] = data.nextPageToken;
          return prev;
        });
      }
    };
    if (refreshEmails && selectedAccount.length > 0) {
      startTransition(async () => {
        await getData();
      });
      setRefreshEmails(false);
    }
    if (selectedAccount.length > 0 && (inboxType || labelName)) {
      setQuery("");
      getData();
    }
  }, [page, pageTokens, setEmails, refreshEmails, URL, selectedAccount]);
  useEffect(() => {
    // Function to fetch search results
    const fetchResults = async (query: string) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort(); // Cancel the previous request
      }

      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;

      try {
        const response = await fetch(
          `/api/mail/search?query=${query}&email=${selectedAccount}&page=${
            pageTokens[Math.max(page - 1, 0)]
          }`,
          {
            signal: newAbortController.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setEmails(data.emails);
        setPageTokens((prev) => {
          prev[page] = data.nextPageToken;
          return prev;
        });
      } catch (e) {
        console.error("Fetch error:", e);
      }
    };

    if (query && query.length > 0) {
      router.replace(`/inbox?query=${query}`);
      fetchResults(query);
    } else {
      setPageTokens([null]);
      setPage(1);
      if (!inboxType && !labelName) {
        router.push(`/inbox?type=primary`);
      }
    }

    // Clean up the controller when component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query, page]);
  const Prev = () => (
    <button
      disabled={page === 1}
      className={`${page === 1 ? "text-muted-foreground cursor-default" : ""}`}
      onClick={() => {
        setPage((prev) => Math.max(prev - 1, 1));
      }}
    >
      <PaginationPrevious noHover={page === 1} isActive={page != 1} />
    </button>
  );
  const Current = () => <PaginationLink noHover>{page}</PaginationLink>;
  const Next = () => (
    <button
      disabled={pageTokens[page] === undefined}
      className={`${
        pageTokens[page] === undefined
          ? "text-muted-foreground cursor-default"
          : ""
      }`}
      onClick={() => {
        setPage((prev) => prev + 1);
      }}
    >
      <PaginationNext
        noHover={pageTokens[page] === undefined}
        isActive={pageTokens[page] != undefined}
      />
    </button>
  );
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative">
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
              sizes
            )}`;
          }}
          className="h-full max-h-[100vh] items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={15}
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                true
              )}`;
            }}
            onResize={() => {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                false
              )}`;
            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px] transition-all duration-300 ease-in-out"
            )}
          >
            <div className="flex flex-col justify-between max-h-screen h-screen">
              <div>
                <div
                  className={cn(
                    "flex h-[52px] items-center justify-center",
                    isCollapsed ? "h-[52px]" : "px-2"
                  )}
                >
                  <AccountSwitcher
                    isCollapsed={isCollapsed}
                    accounts={accounts}
                  />
                </div>
                <Separator />

                <Nav
                  isCollapsed={isCollapsed}
                  links={sidebarItems}
                  showCompose
                />
                <Separator />
                <ScrollArea className="h-72">
                  <Nav isCollapsed={isCollapsed} links={labels} />
                  {!isCollapsed && (
                    <div className="px-3 flex justify-center">
                      <Button className="w-max py-0 px-10" variant="secondary">
                        <Link
                          href="/label-settings"
                          className="flex gap-2 justify-center items-center"
                        >
                          <IoMdAdd className="text-muted-foreground" />
                          add new label
                        </Link>
                      </Button>
                    </div>
                  )}
                </ScrollArea>
              </div>

              <div>
                <Separator />
                <div
                  className={cn(
                    "flex p-3 w-full",
                    isCollapsed ? "justify-center" : "justify-between"
                  )}
                >
                  {!isCollapsed && <Profile isCollapsed={isCollapsed} />}
                  <Button
                    variant="secondary"
                    className="px-3"
                    onClick={handleLogout}
                  >
                    <TbLogout2 className="scale-[1.3]" />
                  </Button>
                </div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <Tabs defaultValue="all">
              <div className="flex items-center px-4 py-2">
                <Logo className="w-24" color="black" />

                <TabsList className="ml-auto">
                  <TabsTrigger
                    value="all"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    All mail
                  </TabsTrigger>
                  {/* <TabsTrigger
                    value="unread"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    Unread
                  </TabsTrigger> */}
                </TabsList>
              </div>
              <Separator />
              <div className="flex justify-between gap-4 pr-4">
                <div className="flex-1 bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <SearchBar />
                </div>
                <div className="flex-shrink-0 flex flex-col justify-center items-center">
                  <Paginations
                    prev={<Prev />}
                    current={<Current />}
                    next={<Next />}
                  />
                </div>
              </div>
              <TabsContent value="all" className="m-0">
                <MailList items={emails} />
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                <MailList
                  items={emails.filter((item) => !item.read)}
                  inUnreadTab
                />
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
            <MailDisplay
              mail={
                emails.find((item) => item.id === selectedEmail?.id) || null
              }
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
      <Message />
    </div>
  );
}
