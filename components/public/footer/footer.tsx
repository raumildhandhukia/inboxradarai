import React from "react";
import { Navigation } from "@/components/public/footer/navigation";
import { ContactForm } from "@/components/public/footer/contact";
import { BuyMeCoffee } from "@/components/public/footer/buymecoffee";

const Footer = () => {
  return (
    <div id="contact" className="">
      <div className="bg-gradient-to-t from-gray-100 to-transparent min-h-[50vh] flex flex-col">
        <div className="border-t pt-5 flex flex-col md:flex-row md:justify-stretch gap-x-8 2xl:gap-x-20 md:px-20 2xl:px-72">
          <div className="flex flex-col justify-center md:items-start mb-2 md:-ml-5">
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
