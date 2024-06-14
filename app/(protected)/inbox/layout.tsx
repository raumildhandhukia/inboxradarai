import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import SideBarCotextProvider from "@/context/side-bar-context-provider";
import Sidebar from "@/components/home/sidebar";
import { sidebarItems } from "@/data";
import SearchBar from "@/components/home/search-bar";

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
      <SideBarCotextProvider>
        <div className="flex justify-start max-w-screen h-[calc(100dvh)]">
          <Sidebar sidebarItems={sidebarItems} />
          <div className="flex-1 w-full">
            <div className="flex flex-col w-full">
              <SearchBar />
              <div className="flex-1 mt-[10vh]">{children}</div>
            </div>
          </div>
        </div>
      </SideBarCotextProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
