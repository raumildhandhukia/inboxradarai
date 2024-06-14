"use client";
import { useContext, createContext, Dispatch, SetStateAction } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/actions/auth/logout";
import { TbLogout2 } from "react-icons/tb";

interface AsideProps {
  children: React.ReactNode;
}

interface SideBarItemProps {
  id: number;
  icon: React.ReactNode;
  text: string;
  setActiveItem: Dispatch<SetStateAction<String>>;
  active?: boolean;
  alert?: boolean;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({
  id,
  icon,
  text,
  setActiveItem,
  active,
  alert,
}) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      onClick={() => {
        setActiveItem(text);
      }}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        expanded ? "w-[95vw]" : "w-max"
      } md:w-max ${
        active
          ? "bg-gradient-to-tr from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0.1)] text-gray-200"
          : "hover:bg-[rgba(255,255,255,0.1)] text-gray-400"
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
  const handleLogout = () => {
    logout();
  };
  const user = useCurrentUser();
  const avatarFallback = user?.name ? user.name[0] : "NA";

  return (
    <aside className="h-[calc[100dvh]]">
      <nav className="h-full flex flex-col bg-neutral-950 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            className={`overflow-hidden transition-all ${
              expanded ? "w-full" : "w-0"
            }`}
          >
            <Image src="/logo.svg" alt="logo" width={150} height={32} />
          </div>
          <button
            className="p-1.5 bg-[rgba(255,255,255,0.8)] hover:bg-[rgba(255,255,255,0.5)] rounded-lg transition-all"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronLeftIcon className="w-6 h-6" color="black" />
            ) : (
              <ChevronRightIcon className="w-6 h-6" color="black" />
            )}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3">
          <Avatar>
            <AvatarImage
              src={
                user?.image ||
                `https://avatars.dicebear.com/api/avataaars/username.svg`
              }
            />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div
            className={`flex justify-between items-center w-52 ml-3 overflow-hidden transition-all ${
              expanded ? "w-full" : "!w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="text-gray-600">{user?.name}</h4>
              <span className="text-xs text-gray-600">{user?.email}</span>
            </div>
            <Button
              variant="destructive"
              className="rounded-xl bg-green-500"
              onClick={handleLogout}
            >
              <TbLogout2 color="black" />
            </Button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Aside;
