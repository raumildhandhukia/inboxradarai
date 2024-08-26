import { SessionProvider } from "next-auth/react";
import React from "react";

const SubscribeLayout = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SubscribeLayout;
