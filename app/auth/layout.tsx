import { Nav } from "@/components/public/nav";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ReactNode, Suspense } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main>
      <header className="">
        <Nav />
      </header>
      <div className="h-[calc(100dvh)] flex items-center justify-center">
        <BackgroundBeams className="" />
        <Suspense>{children}</Suspense>
      </div>
    </main>
  );
};

export default AuthLayout;
