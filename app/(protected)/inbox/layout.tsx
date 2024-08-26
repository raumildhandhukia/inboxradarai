import { ReactNode, Suspense } from "react";

import { SessionProvider } from "next-auth/react";
import SideBarCotextProvider from "@/context/side-bar-context-provider";
import Sidebar from "@/components/home/sidebar";
import { sidebarItems } from "@/data";
import SearchBar from "@/components/home/search-bar";
import InboxContextProvider from "@/context/inbox-context-provider";
import { EmailListSkeleton } from "@/components/home/inbox/skeleton";
import UserContextProvider from "@/context/user-context-provider";
import EmailDetailContextProvider from "@/context/email-detail-context-provider";
import { Toaster } from "@/components/ui/toaster";

interface DashboardLayoutProps {
  params: {
    slug: string;
  };
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  params,
  children,
}) => {
  return (
    <SessionProvider>
      <UserContextProvider>
        <InboxContextProvider>
          <SideBarCotextProvider>
            <EmailDetailContextProvider>
              {/* <div className="flex justify-start max-w-screen h-screen bg-white dark:bg-neutral-950">
              <Sidebar sidebarItems={sidebarItems} />
              <div className="flex-1 w-full h-full">
                <div className="flex flex-col w-full h-full">
                  <SearchBar />
                  <div className="flex-grow h-full mt-[10vh] overflow-y-auto"> */}
              <Suspense fallback={<EmailListSkeleton />}>{children}</Suspense>
              <Toaster />
              {/* </div>
                </div>
              </div>
            </div> */}
            </EmailDetailContextProvider>
          </SideBarCotextProvider>
        </InboxContextProvider>
      </UserContextProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
