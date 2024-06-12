import React from "react";
import Image from "next/image";
import Link from "next/link";
import FancyButton from "@/components/ui/fancy-button";
import { Social } from "@/components/public/footer/social";

export const BuyMeCoffee = () => {
  return (
    <div className="mt-10 md:mt-0">
      <div className="flex flex-col items-center gap-y-8">
        <h3 className="ThemeText !text-left text-4xl">Buy Me A Coffee</h3>
        <div className="flex flex-col items-start h-full ">
          <Image
            src="/bmc_qr.png"
            width={150}
            height={150}
            alt="mbc_qr"
            className="invert"
          />
        </div>
        <Link href="https://buymeacoffee.com/raumildhandhukia" target="_blank">
          <FancyButton className="px-8">
            <span className="text-lg">buy me a coffee</span>
            <span className="ml-4 text-2xl">☕</span>
          </FancyButton>
        </Link>
        <Social />
      </div>
    </div>
  );
};
