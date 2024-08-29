import { SessionProvider } from "next-auth/react";
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { FullPageLoaderLayout } from "@/components/home/inbox/skeleton";
import { BeatLoader } from "react-spinners";
import Logo from "@/public/Logo";

const FirstTimeConfLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Toaster />
      <div className="h-screen w-screen">
        <div className="relative w-full h-full">
          <Logo className="w-40 absolute top-10 left-24" color="black" />
          <div className="absolute top-14 right-20">
            {/* <span className="text-4xl font-bold">AI Label Settings</span> */}
          </div>

          <div className="flex items-center justify-center w-full h-full">
            <div className="!bg-white">{children}</div>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default FirstTimeConfLayout;
