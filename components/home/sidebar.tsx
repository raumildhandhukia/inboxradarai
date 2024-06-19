"use client";
import React, { useContext } from "react";
import Aside, { SideBarItem } from "./aside";
import { SideBarItemContext } from "@/context/side-bar-context";
import { useRouter } from "next/navigation";

interface SidebarProps {
  sidebarItems: {
    id: number;
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarItems }) => {
  const router = useRouter();
  const { activeItem, setActiveItem } = useContext(SideBarItemContext);
  const handleSidebarItemClick = (text: string) => {
    setActiveItem(text);
    router.push(`/inbox?type=${text.toLowerCase()}`);
  };
  return (
    <Aside>
      <div className="flex flex-col h-full">
        <div className="flex-1">
          {sidebarItems.map((item) => (
            <SideBarItem
              key={item.id}
              {...item}
              active={item.text === activeItem}
              onClick={handleSidebarItemClick}
            />
          ))}
        </div>
      </div>
    </Aside>
  );
};

export default Sidebar;
