import { Nav } from "@/components/public/nav";
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
        <Suspense>{children}</Suspense>
      </div>
    </main>
  );
};

export default AuthLayout;
