import Footer from "@/components/public/footer/footer";
import Nav from "@/components/public/nav";
import React from "react";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Nav />
      {children}
      <Footer mini />
    </div>
  );
};

export default AboutLayout;
