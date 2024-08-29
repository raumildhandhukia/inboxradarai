import { SessionProvider } from "next-auth/react";
import React from "react";

const SubscribeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div className="!bg-white">{children}</div>
    </SessionProvider>
  );
};

export default SubscribeLayout;
