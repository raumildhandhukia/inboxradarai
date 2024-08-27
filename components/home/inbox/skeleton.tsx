"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/public/Logo";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DotLoader } from "react-spinners";
const defaultLayout = [20, 32, 48];
export const InboxPageSkeletonLoader = () => {
  return (
    <>
      <div className="relative">
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
            collapsible={true}
            minSize={15}
            maxSize={15}
            className={"min-w-[50px] transition-all duration-300 ease-in-out"}
          >
            <div className="flex flex-col justify-between max-h-screen h-screen">
              <div>
                <div
                  className={"flex h-[52px] items-center justify-center px-2"}
                >
                  <Skeleton className="w-full h-8" />
                </div>
                <Separator />
                <div className="p-4">
                  <Skeleton className="w-32 h-10" />
                </div>
                <LabelSidebarSkeleton />
                <Separator />

                <LabelSidebarSkeleton />
                <div className="p-4 mt-2">
                  <Skeleton className="w-full h-8 rounded-lg" />
                </div>
              </div>

              <div>
                <Separator />
                <div className={"flex p-3 w-full justify-between"}>
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <Skeleton className="w-8 h-8 rounded-lg" />
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
                  ></TabsTrigger>
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
                  <Skeleton className="w-24 h-8" />
                </div>
                <div className="gap-1 flex justify-center items-center">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <Skeleton className="w-8 h-8 rounded-lg" />
                </div>
              </div>
              <TabsContent value="all" className="m-0">
                <EmailListItemsSkeletonLoader />
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                <EmailListItemsSkeletonLoader />
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
            <EmailDetailSkeletonLoader />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};
export const EmailDetailSkeletonLoader = () => (
  <>
    <EmailDislayHeaderSkeletonLoader />
    <Separator />
    <EmailDisplayAIInsightsSkeletonLoader />
    <Separator />
    <EmailDisplaySkeletonLoader />
  </>
);

export const LabelSidebarSkeleton = () => {
  const randomNumber = Math.floor(Math.random() * 5) + 3;
  const dummy = Array.from({ length: randomNumber });
  return (
    <div className="flex flex-col gap- py-2">
      <nav className="grid gap-3 px-2">
        {dummy.map((dum, index) => {
          return (
            <div className="flex gap-3" key={index}>
              <Skeleton className="h-5 w-5" />
              <a className="inline-flex items-center transition-colors px-3 justify-start">
                <Skeleton
                  className="max-w-full h-5"
                  style={{
                    width: Math.floor(Math.random() * 50) + 100,
                  }}
                />
              </a>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export const EmailListItemsSkeletonLoader = () => {
  const numberOfItems = Math.floor(Math.random() * 10) + 5;
  const dummy = Array.from({ length: numberOfItems });
  return (
    <div className="flex flex-col gap-1 p-4 pt-0">
      {dummy.map((dum, index) => {
        return (
          <div
            className="max-w-full flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
            key={index}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div>
                    <Skeleton
                      className=" max-w-full h-3"
                      style={{
                        width: Math.floor(Math.random() * 50) + 100,
                      }}
                    />
                  </div>
                  <Skeleton className="flex h-2 w-2"></Skeleton>
                </div>
                <div className="ml-auto">
                  <div>
                    <Skeleton className="w-[40px] max-w-full h-3" />
                  </div>
                </div>
              </div>
              <div>
                <Skeleton className="w-[440px] max-w-full h-3" />
              </div>
            </div>
            <div className={`overflow-ellipsis line-clamp-2`}>
              <Skeleton
                className="h-3 max-w-full"
                style={{
                  width: Math.floor(Math.random() * 50) + 50,
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center border transition-colors border-transparent">
                {Math.floor(Math.random() * 10) > 5 && (
                  <Skeleton className="w-[72px] max-w-full h-3" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const EmailDislayHeaderSkeletonLoader = () => (
  <>
    <div className="flex items-start p-4">
      <div className="flex items-start gap-4">
        <div className="grid gap-2 ml-5">
          <div>
            <Skeleton className="w-[376px] max-w-full h-3" />
          </div>
          <div className="line-clamp-1">
            <Skeleton className="w-[504px] max-w-full h-3" />
          </div>
          <div className="line-clamp-1">
            <Skeleton className="w-[384px] max-w-full h-3" />
          </div>
        </div>
      </div>
      <div className="ml-auto flex flex-col gap-2">
        <div>
          <div>
            <Skeleton className="w-[216px] max-w-full h-3" />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="inline-flex items-center justify-center transition-colors h-9 w-9">
            <Skeleton className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center justify-center transition-colors h-9 w-9">
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  </>
);
export const EmailDisplaySkeletonLoader = () => {
  const randomNum = Math.floor(Math.random() * 10) + 20;
  const dummy = Array.from({ length: randomNum });
  return (
    <div className="p-4 flex flex-col gap-2">
      {dummy.map((dum, index) => {
        return (
          <div key={index}>
            <Skeleton
              className="max-w-full h-3"
              style={{
                width: Math.floor(Math.random() * 800) + 20,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
export const EmailDisplayAIInsightsSkeletonLoader = () => (
  <>
    <div className="p-4 pt-0">
      <div>
        <div className="">
          <div className="inline-flex items-center justify-center transition-colors h-9 px-2 py-2">
            <Skeleton className="w-[96px] max-w-full h-3" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-5">
            <span className="ml-1">
              <Skeleton className="w-[100px] max-w-full h-8" />
            </span>
          </div>
          <Skeleton className="w-[96px] max-w-full h-3 ml-2" />
          <div className="mt-2 ml-1 flex flex-col gap-2">
            <Skeleton className="w-[1992px] max-w-full h-3" />
            <Skeleton className="w-[1992px] max-w-full h-3" />
            <Skeleton
              className="max-w-full h-3"
              style={{
                width: Math.floor(Math.random() * 50) + 100,
              }}
            />
          </div>

          <div className="flex flex-col gap-1 ml-1 mt-2">
            <span>
              <Skeleton className="w-[144px] max-w-full h-3" />
            </span>
            <span>
              <Skeleton className="w-[288px] max-w-full h-3 " />
            </span>
            <span>
              <Skeleton className="w-[192px] max-w-full h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </>
);

export function FullPageLoaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {children}
    </div>
  );
}

export function EmailListSkeleton() {
  const dummy = Array.from({ length: 50 });
  return (
    <div className="p-5 ">
      <div className="flex items-start justify-between h-12">
        <div className="flex items-start gap-5">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-7 w-20 rounded-xl" />
          <Skeleton className="h-7 w-10 rounded-md" />
          <Skeleton className="h-7 w-20 rounded-xl" />
        </div>
      </div>
      <div className="pr-3">
        <Table>
          <TableBody>
            {dummy.map((dum, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="py-3">
                    <ChevronDownIcon />
                    {/* <Skeleton className="h-4 w-4 max-w-4" /> */}
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 max-w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[15vw] max-w-[15vw]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[40vw] max-w-[35vw]" />
                  </TableCell>
                  <TableCell className="min-w-[7vw] text-right !text-[13px]">
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export function EmailSkeleton() {
  const dummy = Array.from({ length: 50 });
  return (
    <div className="p-5">
      <div className="flex items-start justify-between h-12">
        <div className="flex items-start gap-5">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-7 w-20 rounded-xl" />
          <Skeleton className="h-7 w-10 rounded-md" />
          <Skeleton className="h-7 w-20 rounded-xl" />
        </div>
      </div>
      <div className="pr-3 border-t rounded-2xl p-5">
        <div className="mx-10">
          <Skeleton className="h-28 w-full rounded-3xl" />
        </div>
        <div className="ml-20 mt-5">
          <Skeleton className="h-8 w-96 rounded-full" />
        </div>
        <div className="flex justify-between mt-8">
          <div className="flex gap-5 ">
            <div>
              <Skeleton className="h-16 w-16 rounded-full" />
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <Skeleton className="h-5 w-32 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
          <div>
            <Skeleton className="h-5 w-52 rounded-full mt-2" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-96 w-[60%] mt-5 rounded-2xl" />
      </div>
    </div>
  );
}
export const EmailListItemSkeleton = () => {
  return (
    <div className="w-full flex gap-10">
      <div>
        <Skeleton className="ml-3 h-8 w-7 rounded-xl bg-primary/10" />
      </div>
      <div className="w-[12vw] flex flex-col gap-1 -ml-5">
        <Skeleton className="h-4 w-full rounded-md bg-primary/10" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-12 rounded-md bg-primary/10" />
          <Skeleton className="h-4 w-16 rounded-md bg-primary/10" />
        </div>
      </div>
      <div className="w-[20vw] flex-1 ml-1">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-full rounded-md bg-primary/10" />
          <Skeleton className="h-4 w-[75%] rounded-md bg-primary/10" />
        </div>
      </div>
      <div className="">
        <Skeleton className="h-4 w-[10vw] rounded-md bg-primary/10" />
      </div>
    </div>
  );
};
export const EmailDetailsSkeleton = () => (
  <div className="">
    <div className="flex gap-5 ml-1">
      <Skeleton className="w-16 h-4" />

      <Skeleton className="w-24 h-4" />
    </div>
    <div className="mt-2 ml-1">
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-[65%] h-4 mt-1" />
    </div>
    <div className="flex flex-col gap-1 ml-1 mt-2">
      <Skeleton className="w-36 h-4" />

      <Skeleton className="w-20 h-4" />
      <Skeleton className="w-24 h-4" />
    </div>
  </div>
);
