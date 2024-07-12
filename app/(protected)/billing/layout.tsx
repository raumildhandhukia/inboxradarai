import React from "react";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Layout;
