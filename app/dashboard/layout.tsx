import { ReactNode } from "react";
import Nav from "@/components/nav";
import Aside from "@/components/aside";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default DashboardLayout;
