import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-[calc(100dvh)] flex items-center justify-center bg-gradient-to-tr from-zinc-800 via-zinc-200 to-zinc-600">
      {children}
    </div>
  );
};

export default AuthLayout;
