"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth/logout";

interface NavProps {
  type?: String;
}

const Nav: React.FC<NavProps> = ({ type }) => {
  const Router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

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
        !isOpen ? "max-h-[5rem]" : "min-h-[100vh]"
      }
     bg-purple-100 [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.4),rgba(255,255,255,0))]
    `}
    >
      <div className="flex justify-between items-center md:-mt-6">
        <Image
          className="md:hidden !w-24 -mt-5 -ml-5"
          src="/logo.svg"
          alt="logo"
          width={24}
          height={30}
        />

        <Image
          src="/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="hidden md:block w-0 md:!w-40 md:-mt-5"
        />

        <div className="flex items-center -mt-5 md:-ml-30">
          {type === "dashboard" ? null : (
            <div className="hidden md:flex items-center justify-between gap-4 w-full">
              <ul className="md:flex md:gap-10 md:ml-36">
                <li className="hover:text-gray-400 cursor-pointer">
                  <Link href="#features">Pricing</Link>
                </li>
                <li className="hover:text-gray-400 cursor-pointer">
                  <Link href="#features">Blog</Link>
                </li>
                <li className="hover:text-gray-400 cursor-pointer">
                  <Link href="#features">Contact</Link>
                </li>
              </ul>
              <div className="flex gap-5">
                <Button
                  variant="outline"
                  className="invisible md:visible rounded-3xl"
                  onClick={() => {
                    Router.push("/auth/login");
                  }}
                >
                  Log In
                </Button>
                {/* <Button
                  variant="destructive"
                  className="invisible md:visible rounded-3xl bg-green-500"
                  onClick={() => {
                    Router.push("/auth/signup");
                  }}
                >
                  Sign Up
                </Button> */}
              </div>
            </div>
          )}
        </div>
        {type === "dashboard" ? (
          <Button
            variant="destructive"
            className="rounded-3xl bg-green-500 -mt-7"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        ) : (
          <div className="flex items-center gap-6 md:hidden -mt-5">
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
        )}
      </div>
      {isOpen ? (
        <div>
          <ul className="flex flex-col items-end gap-3">
            <li className="hover:text-gray-400 cursor-pointer">
              <Link href="#features">Pricing</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link href="#features">Blog</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link href="#features">Contact</Link>
            </li>
            <Button
              variant="outline"
              className="rounded-3xl w-24"
              onClick={() => {
                Router.push("/auth/login");
              }}
            >
              Log In
            </Button>
            {/* <Button
              variant="destructive"
              className="rounded-3xl bg-green-500 w-24"
              onClick={() => {
                Router.push("/auth/signup");
              }}
            >
              Sign Up
            </Button> */}
          </ul>
        </div>
      ) : null}
    </nav>
  );
};

export default Nav;
