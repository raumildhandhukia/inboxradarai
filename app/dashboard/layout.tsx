import { ReactNode } from "react";
import Nav from "@/components/nav";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      <Nav type="dashboard" />
      {children}
    </div>
  );
};

export default DashboardLayout;
