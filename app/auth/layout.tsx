import { ReactNode } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-[calc(100dvh)] flex items-center justify-center">
      <BackgroundBeams />
      {children}
    </div>
  );
};

export default AuthLayout;
