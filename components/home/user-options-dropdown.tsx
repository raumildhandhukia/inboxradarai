"use client";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Subscription from "./subscription";
import Preferences from "./preferences";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

const DropDown: React.FC<{
  isCollapsed: boolean;
  setFullPageLoader: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  isCollapsed,
  setFullPageLoader,
}: {
  isCollapsed: boolean;
  setFullPageLoader: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = useCurrentUser();
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <FlyoutLink
        href="#"
        isCollapsed={isCollapsed}
        setFullPageLoader={setFullPageLoader}
      >
        <Avatar>
          <AvatarImage
            src={user?.image || "https://github.com/shadcn.png"}
            alt={user?.name || "CN"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </FlyoutLink>
    </div>
  );
};

interface FlyoutLink {
  children: React.ReactNode;
  href: string;
  isCollapsed: boolean;
  setFullPageLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlyoutLink = ({
  children,
  href,
  isCollapsed,
  setFullPageLoader,
}: FlyoutLink) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => setOpen(!open)}
      className="relative w-fit h-fit"
    >
      <a href={href} className="relative text-white">
        {children}
        <span
          style={{
            transform: open ? "scaleX(1)" : "scaleX(0)",
          }}
        />
      </a>

      <div onClick={(e) => e.stopPropagation()}>
        {isSubscriptionOpen && (
          <Subscription
            isSubscriptionOpen={isSubscriptionOpen}
            setIsSubscriptionOpen={setIsSubscriptionOpen}
          />
        )}
        {isPreferencesOpen && (
          <Preferences
            isPreferencesOpen={isPreferencesOpen}
            setIsPreferencesOpen={setIsPreferencesOpen}
          />
        )}
      </div>

      <AnimatePresence>
        {open && !isCollapsed && (
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-[6.5rem] -top-[220px] bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-5 -bottom-4 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white border-b-2 border-r-2" />
            <div className="w-52 bg-white rounded-lg p-6 shadow-xl h-[200px] flex flex-col justify-evenly border-2">
              <Button
                variant="hacker"
                onClick={() => {
                  setIsSubscriptionOpen(!isSubscriptionOpen);
                  setOpen(false);
                }}
              >
                Subscription
              </Button>

              <Button
                onClick={() => {
                  setIsPreferencesOpen(!isPreferencesOpen);
                  setOpen(false);
                }}
                variant="hacker"
              >
                Preferences
              </Button>

              <Button
                onClick={() => {
                  setOpen(false);
                  router.push("/label-settings");
                  setFullPageLoader(true);
                  // redirect("/label-settings");
                }}
                variant="hacker"
              >
                <Link href="/label-settings">Labels</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDown;
