import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { BackgroundBeams } from "@/components/ui/background-beams";

const FirstTimeConfLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Toaster />
      <BackgroundBeams />
      <div className=" h-screen w-screen">{children}</div>
    </SessionProvider>
  );
};

export default FirstTimeConfLayout;
