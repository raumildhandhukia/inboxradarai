import Footer from "@/components/public/footer/footer";
import Nav from "@/components/public/nav";
import React from "react";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <Nav />
      {children}
      <div className="absolute bottom-0 w-full">
        <Footer mini />
      </div>
    </div>
  );
};

export default AboutLayout;
