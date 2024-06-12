import React from "react";
import { Navigation } from "@/components/public/footer/navigation";
import { ContactForm } from "@/components/public/footer/contact";
import { BuyMeCoffee } from "@/components/public/footer/buymecoffee";

const Footer = () => {
  return (
    <div id="contact">
      <div className="bg-gradient-to-t from-black-100 to-transparent min-h-[50vh] flex flex-col pt-5">
        <div className="border-t pt-5 flex flex-col md:flex-row md:justify-evenly gap-x-20 md:px-16 2xl:px-72">
          <div className="flex flex-col justify-center md:items-start mb-2">
            <div className="ThemeText text-4xl">InboxRadarAI</div>
            <div className="flex-1">
              <Navigation />
            </div>
          </div>
          <div className="mt-6 md:mt-0 px-10 md:px-0">
            <ContactForm />
          </div>
          <BuyMeCoffee />
        </div>
        <div className="ThemeText text-sm mt-7 mb-5">
          © 2024 InboxRadarAI. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
