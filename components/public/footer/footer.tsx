import React from "react";
import { Navigation } from "@/components/public/footer/navigation";
import { ContactForm } from "@/components/public/footer/contact";
import { BuyMeCoffee } from "@/components/public/footer/buymecoffee";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = ({ mini }: { mini?: boolean }) => {
  if (mini) {
    return (
      <div className="w-screen h-20 md:px-20 md:py-2 bg-gray-900 ">
        <div className="border-t w-full">
          <div className="flex justify-between items-start px-4 py-2">
            <span className="text-muted-foreground text-[10px] mt-2">
              Copyright © 2024 InboxRadarAI. All rights reserved.
            </span>
            <div className="">
              <Button variant="link">
                <Link
                  href="/cookie-policy"
                  className="text-xs text-muted-foreground"
                >
                  Cookie Policy
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/privacy" className="text-xs text-muted-foreground">
                  Privacy Policy
                </Link>
              </Button>

              <Button variant="link">
                <Link href="/terms" className="text-xs text-muted-foreground">
                  Terms of Service
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/pricing" className="text-xs text-muted-foreground">
                  Pricing
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/faq" className="text-xs text-muted-foreground">
                  FAQ
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/about" className="text-xs text-muted-foreground">
                  About
                </Link>
              </Button>

              <Button variant="link">
                <Link href="/contact" className="text-xs text-muted-foreground">
                  Contact
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="contact" className="">
      <div className="bg-gradient-to-t from-gray-100 to-transparent min-h-[50vh] flex flex-col">
        <div className="border-t pt-5 flex flex-col md:flex-row md:justify-between gap-x-8 2xl:gap-x-20 md:px-20 2xl:px-72">
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
