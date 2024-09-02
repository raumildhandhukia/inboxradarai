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
import HyperText from "../ui/hyper-text";
import Logo from "@/public/Logo";
import { useCurrentUser } from "@/hooks/useCurrentUser";
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
      if (isOpen) {
        setIsOpen(false);
      }
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
      className={`border-b-[1px] fixed top-0 z-10 px-8 py-2 w-[100vw] mx-autoflex flex-col  items-center ${
        !isOpen ? "md:min-h-[5rem] min-h-[3rem]" : "min-h-[100vh]"
      }
      bg-black
    `}
    >
      <div>
        <div className="flex justify-between items-center">
          <Logo
            onClick={() => {
              Router.push("/");
            }}
            color="white"
            className="mt-2 md:mt-1 w-20 md:!w-32 cursor-pointer"
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
      </div>
    </nav>
  );
};

const NavLinks = ({ className }: { className?: string }) => {
  const Router = useRouter();
  const user = useCurrentUser();
  return (
    <>
      <ul className={`${className}`}>
        {/* <li className="text-gray-800 font-light hover:text-gray-400 cursor-pointer mt-1">
          <Link href="/">
            <HyperText text="Home" className="cursor-pointer" />
          </Link>
        </li>
        <li className="text-gray-800 font-light hover:text-gray-400 cursor-pointer mt-1">
          <Link href="/pricing">
            <HyperText text="Pricing" className="cursor-pointer" />
          </Link>
        </li>
        <li className="text-gray-800 font-light hover:text-gray-400 cursor-pointer mt-1">
          <Link href="#contact">
            <HyperText text="Contact" className="cursor-pointer" />
          </Link>
        </li>
        <li className="text-gray-800 font-light hover:text-gray-400 cursor-pointer mt-1">
          <Link href="/about">
            <HyperText text="About" className="cursor-pointer" />
          </Link>
        </li>
        <li className="text-gray-800 font-light hover:text-gray-400 cursor-pointer mt-1">
          <Link href="/blog">
            <HyperText text="Blog" className="cursor-pointer" />
          </Link></li> */}

        <Button
          variant="indigo"
          className="rounded-2xl bg-white ml-3 font-bold mt-1"
          onClick={() => {
            Router.push("/auth/login");
          }}
        >
          <Link href="/auth/login">
            <HyperText
              text={user ? "Back to site" : "Sign In"}
              className="cursor-pointer"
            />
          </Link>
        </Button>
        {/* <Button
          variant="hacker"
          className="rounded-none bg-white ml-3 font-medium"
          onClick={() => {
            Router.push("/auth/register");
          }}
        >
          Sign Up
        </Button> */}
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
