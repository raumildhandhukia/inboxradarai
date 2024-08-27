import FancyButton from "@/components/ui/fancy-button";
import { socialMedia } from "@/data";
import Link from "next/link";
import Image from "next/image";
import { CgWebsite } from "react-icons/cg";
import { SiGmail } from "react-icons/si";
import { Button } from "@/components/ui/button";

export const Social = () => {
  return (
    <div className="flex items-center md:gap-3 gap-6 order-1 md:order-2">
      <Button variant="hacker" className="py-2 rounded-none">
        <Link href="https://raumild.com" target="_blank">
          <div className="flex items-center gap-4">
            <CgWebsite className="w-6 h-6" />
          </div>
        </Link>
      </Button>

      <div
        key="email"
        className="w-10 h-10 cursor-pointer flex justify-center items-center border bg-white"
      >
        <Link href="mailto:raumild@gmail.com" target="_blank">
          <SiGmail />
        </Link>
      </div>
      {socialMedia.map((info) => (
        <div
          key={info.id}
          className="w-10 h-10 cursor-pointer flex justify-center items-center border bg-white"
        >
          <Link href={info.link} target="_blank">
            <Image
              src={info.img}
              alt="icons"
              width={20}
              height={20}
              className="invert"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
