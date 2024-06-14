import React from "react";

const FirstTimeConfLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  );
};

export default FirstTimeConfLayout;
