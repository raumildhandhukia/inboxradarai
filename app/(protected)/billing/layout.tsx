import React from "react";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <SessionProvider>
      {" "}
      <div className="!bg-white">{children}</div>
    </SessionProvider>
  );
};

export default Layout;
