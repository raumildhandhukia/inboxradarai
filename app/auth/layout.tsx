import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-[calc(100dvh)] flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
