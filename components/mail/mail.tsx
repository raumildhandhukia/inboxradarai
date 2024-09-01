"use client";

import * as React from "react";
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
import {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { InboxContext } from "@/context/inbox-context";
import { UserContext } from "@/context/user-context";
import SearchBar from "../home/search-bar";
import Logo from "@/public/Logo";
import { Button } from "../ui/button";
import Profile from "../home/user-options-dropdown";
import { TbLogout2 } from "react-icons/tb";
import { logout } from "@/actions/auth/logout";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import {
  EmailListItemsSkeletonLoader,
  FullPageLoaderLayout,
  LabelSidebarSkeleton,
} from "../home/inbox/skeleton";
import { BeatLoader } from "react-spinners";
import { set } from "date-fns";

interface MailProps {
  accounts: Account[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

const EMAILS_URL = "/api/mail";
const SEARCH_URL = "/api/mail/search";

export function Mail({
  accounts,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const { user } = useContext(UserContext);
  const {
    selectedAccount,
    selectedEmail,
    setSelectedEmail,
    composeMessage,
    emails,
    setEmails,
    query,
    setQuery,
  } = useContext(InboxContext);
  const [fullPageLoader, setFullPageLoader] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [refreshEmails, setRefreshEmails] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageTokens, setPageTokens] = useState<string[] | [null]>([null]);

  const abortControllerRef = useRef<AbortController | null>(null);

  const [isLoading, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const inboxType = searchParams.get("type");
  const labelName = searchParams.get("label");
  const queryType = searchParams.get("query");

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
  const Prev = () => (
    <button
      disabled={page === 1}
      className={`${page === 1 ? "text-muted-foreground cursor-default" : ""}`}
      onClick={() => {
        setSelectedEmail(null);
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
        setSelectedEmail(null);
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
  const getData = async () => {
    if (!selectedAccount) {
      return;
    }
    const URL = `${EMAILS_URL}?page=${pageTokens[Math.max(page - 1, 0)]}${
      inboxType ? `&type=${inboxType}` : labelName ? `&label=${labelName}` : ""
    }&accountId=${selectedAccount.accountId}`;

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
  const fetchResults = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Cancel the previous request
    }

    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;

    try {
      if (!selectedAccount) {
        return;
      }
      const response = await fetch(
        `${SEARCH_URL}?query=${query}&accountId=${
          selectedAccount.accountId
        }&page=${pageTokens[Math.max(page - 1, 0)]}`,
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
  useEffect(() => {
    if (
      (inboxType && inboxType.length > 0) ||
      (labelName && labelName.length > 0)
    ) {
      setPage(1);
      setPageTokens([null]);
      setQuery("");
      if (page === 1) {
        startTransition(async () => {
          await getData();
        });
      }
    }
  }, [inboxType, labelName, selectedAccount]);

  useEffect(() => {
    if (query.length > 0 && queryType) {
      startTransition(async () => {
        await fetchResults();
      });
    } else {
      startTransition(async () => {
        await getData();
      });
    }
  }, [page]);

  const handleSearch = async () => {
    setPage(1);
    setPageTokens([null]);
    router.push("/inbox?query=" + query);

    startTransition(async () => {
      await fetchResults();
    });
  };

  if (fullPageLoader) {
    return (
      <FullPageLoaderLayout>
        <BeatLoader />
      </FullPageLoaderLayout>
    );
  }

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
                  <Suspense fallback={<LabelSidebarSkeleton />}>
                    <Nav isCollapsed={isCollapsed} links={labels} />
                  </Suspense>
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
                  {!isCollapsed && (
                    <Profile
                      isCollapsed={isCollapsed}
                      setFullPageLoader={setFullPageLoader}
                    />
                  )}
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
                    {user.plan || "FREE"}
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
                  <SearchBar search={handleSearch} />
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
                {isLoading ? (
                  <EmailListItemsSkeletonLoader />
                ) : (
                  <MailList items={emails} />
                )}
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                <Suspense fallback={<EmailListItemsSkeletonLoader />}>
                  <MailList
                    items={emails.filter((item) => !item.read)}
                    inUnreadTab
                  />
                </Suspense>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
            {composeMessage ? (
              <Message />
            ) : (
              <MailDisplay
                mail={emails.find((item) => item.id === selectedEmail?.id)}
              />
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </div>
  );
}
