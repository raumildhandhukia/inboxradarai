import { ReactNode, Suspense } from "react";

import { SessionProvider } from "next-auth/react";
import SideBarCotextProvider from "@/context/side-bar-context-provider";
import Sidebar from "@/components/home/sidebar";
import { sidebarItems } from "@/data";
import SearchBar from "@/components/home/search-bar";
import InboxContextProvider from "@/context/inbox-context-provider";
import {
  FullPageLoaderLayout,
  InboxPageSkeletonLoader,
} from "@/components/home/inbox/skeleton";
import UserContextProvider from "@/context/user-context-provider";
import EmailDetailContextProvider from "@/context/email-detail-context-provider";
import { Toaster } from "@/components/ui/toaster";
import { BeatLoader } from "react-spinners";

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
              <Suspense fallback={<InboxPageSkeletonLoader />}>
                <div className="!bg-white">{children}</div>
              </Suspense>
              <Toaster />
            </EmailDetailContextProvider>
          </SideBarCotextProvider>
        </InboxContextProvider>
      </UserContextProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
