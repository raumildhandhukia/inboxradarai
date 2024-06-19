"use client";
import { useContext, createContext, Dispatch, SetStateAction } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Logo from "@/public/Logo";
import { useTheme } from "next-themes";
import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/actions/auth/logout";
import { TbLogout2 } from "react-icons/tb";
import Settings from "@/components/home/settings";
import Profile from "./profile";
import { ModeToggle } from "../theme/theme-toggle";
("@/components/home/profile");

interface AsideProps {
  children: React.ReactNode;
}

interface SideBarItemProps {
  id: number;
  icon: React.ReactNode;
  text: string;
  onClick: (text: string) => void;
  active?: boolean;
  alert?: boolean;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({
  id,
  icon,
  text,
  onClick,
  active,
  alert,
}) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      onClick={() => onClick(text)}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        expanded ? "w-[95vw]" : "w-max"
      } md:w-max ${
        active
          ? "bg-gradient-to-tr from-[rgba(0,0,0,0.08)] to-[rgba(0,0,0,0.1)] dark:from-[rgba(255,255,255,0.4)] dark:to-[rgba(255,255,255,0.1)] dark:text-gray-200"
          : "hover:bg-[rgba(255,255,255,0.1)] text-gray-700 dark:text-gray-400"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all  ${
          expanded ? "w-full md:w-52 ml-3" : "!w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <span
          className={`absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full ${
            expanded ? "" : "top-2 right-2"
          }`}
        />
      )}
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -transition-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover-translate-x-0">
          {text}
        </div>
      )}
    </li>
  );
};
const SidebarContext = createContext({ expanded: false });
const Aside: React.FC<AsideProps> = ({ children }) => {
  const [expanded, setExpanded] = React.useState(true);
  const { theme } = useTheme();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="h-[calc[100dvh]]">
      <nav className="h-full flex flex-col dark:bg-neutral-950 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            className={`overflow-hidden transition-all ${
              expanded ? "w-full" : "w-0"
            }`}
          >
            <Logo
              color={`${theme === "dark" ? "#F3E4AB" : "black"}`}
              className="w-40 "
            />
          </div>
          <Button
            variant="hacker"
            className=""
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronLeftIcon className="w-6 h-6" />
            ) : (
              <ChevronRightIcon className="w-6 h-6" />
            )}
          </Button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3">
          <Profile />
          <div
            className={`flex justify-end items-center gap-3 w-52 ml-3 overflow-hidden transition-all ${
              expanded ? "w-full" : "!w-0"
            }`}
          >
            <ModeToggle />
            <Settings />
            <Button variant="hacker" className="" onClick={handleLogout}>
              <TbLogout2 className="scale-[1.5]" />
            </Button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Aside;
