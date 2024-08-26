"use client";
import React, { useContext } from "react";
import Aside, { SideBarItem } from "./aside";
import { SideBarItemContext } from "@/context/side-bar-context";
import { UserContext } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { AILabel } from "./inbox/email-detail/email";

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
  const { user } = useContext(UserContext);
  const { activeItem, setActiveItem } = useContext(SideBarItemContext);
  const handleSidebarItemClick = (text: string, label: boolean) => {
    setActiveItem(text);
    if (label) {
      router.push(`/inbox?label=${text}`);
      return;
    }
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
          {user.customLabels?.map((label, index) => (
            <SideBarItem
              active={label.id === activeItem}
              key={index}
              id={index}
              icon={
                <div
                  style={{
                    backgroundColor: label.color || "#000",
                  }}
                  className="w-3 h-3 rounded-full"
                />
              }
              text={label.label}
              labelId={label.id}
              label
              color={label.color || "#000"}
              onClick={handleSidebarItemClick}
            />
          ))}
          {user.predefinedLabels?.map((label, index) => (
            <SideBarItem
              active={label.id === activeItem}
              key={index}
              id={index}
              icon={
                <div
                  style={{
                    backgroundColor: label.color || "#000",
                  }}
                  className="w-3 h-3 rounded-full"
                />
              }
              text={label.label}
              labelId={label.id}
              label
              color={label.color || "#000"}
              onClick={handleSidebarItemClick}
            />
          ))}
        </div>
      </div>
    </Aside>
  );
};

export default Sidebar;
