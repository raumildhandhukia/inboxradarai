import { ReactNode } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Suspense } from "react";
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Suspense fallback={null}>
      <div className="h-[calc(100dvh)] flex items-center justify-center">
        <BackgroundBeams />
        {children}
      </div>
    </Suspense>
  );
};

export default AuthLayout;
