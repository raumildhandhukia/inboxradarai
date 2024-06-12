"use client";
import React, { use, useEffect } from "react";
import Image from "next/image";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth/logout";
import { FloatingNav } from "@/components/ui/floating-navbar";

interface NavProps {
  type?: String;
}

export const Nav: React.FC<NavProps> = ({ type }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const Router = useRouter();

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const preventScroll = (e: any) => {
      e.preventDefault();
    };

    if (isOpen) {
      window.addEventListener("scroll", preventScroll, { passive: false });
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      window.removeEventListener("scroll", preventScroll);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    }

    return () => {
      window.removeEventListener("scroll", preventScroll);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isOpen]);
  return (
    <nav
      style={{
        WebkitBackdropFilter: "blur(10px)",
        backdropFilter: "blur(10px)",
      }}
      className={`fixed top-0 z-10 px-8 w-[100vw] mx-auto ${
        !isOpen ? "md:min-h-[5rem] min-h-[3rem]" : "min-h-[100vh]"
      }
     bg-purple-100 [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.4),rgba(255,255,255,0))]
    `}
    >
      <div className="flex justify-between items-center">
        <Image
          onClick={() => {
            Router.push("/");
          }}
          src="/logo.svg"
          alt="logo"
          width={50}
          height={30}
          className="mt-2 md:mt-1 w-20 md:!w-40 cursor-pointer"
        />

        <div className="flex items-center md:-ml-30">
          <div className="hidden md:flex items-center justify-between gap-4 w-full">
            <NavLinks className="md:flex md:gap-10 md:ml-36" />
          </div>
        </div>

        <div className="flex items-center gap-6 md:hidden">
          {/* <Button variant="destructive">Sign In</Button> */}
          {!isOpen ? (
            <HamburgerMenuIcon
              className="text-3xl cursor-pointer"
              onClick={toggleMenu}
            />
          ) : (
            <Cross1Icon
              className="text-3xl cursor-pointer"
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>
      {isOpen ? (
        <div>
          <NavLinks className="flex flex-col items-end gap-3" />
        </div>
      ) : null}
    </nav>
  );
};

const NavLinks = ({ className }: { className?: string }) => {
  const Router = useRouter();
  return (
    <>
      <ul className={`${className}`}>
        <li className="text-gray-300 hover:text-gray-400 cursor-pointer mt-1">
          <Link href="/">Home</Link>
        </li>
        <li className="text-gray-300 hover:text-gray-400 cursor-pointer mt-1">
          <Link href="/pricing">Pricing</Link>
        </li>
        <li className="text-gray-300 hover:text-gray-400 cursor-pointer mt-1">
          <Link href="#contact">Contact</Link>
        </li>
        <li className="text-gray-300 hover:text-gray-400 cursor-pointer mt-1">
          <Link href="/about">About</Link>
        </li>
        <li className="text-gray-300 hover:text-gray-400 cursor-pointer mt-1">
          <Link href="/blog">Blog</Link>
        </li>
        <Button
          variant="outline"
          className="rounded-3xl bg-green-500 ml-3"
          onClick={() => {
            Router.push("/auth/login");
          }}
        >
          Sign In
        </Button>
      </ul>
    </>
  );
};

const Navbar = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);
  if (isMobile) {
    return <Nav />;
  }
  return <FloatingNav />;
};

export default Navbar;
