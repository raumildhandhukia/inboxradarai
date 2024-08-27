import React, { ReactNode, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { IoMdSettings } from "react-icons/io";
import { sidebarItems } from "@/data";
import { Label } from "@/types";

const Settings = ({}: {}) => {
  const [aiLabels, setAILabels] = React.useState<Label[]>([]);
  useEffect(() => {
    const get = async () => {
      const res = await fetch("/api/mail/labels", {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setAILabels(data);
      } else {
        console.error("Error fetching AI Labels");
      }
    };
    get();
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center h-9 w-11 bg-white hover:bg-black hover:text-white border rounded-none">
        <IoMdSettings className="scale-[1.5]" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Customize your AI Inbox Settings</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-semibold mt-5">Inbox Categories</h3>
          <div className="flex justify-between flex-wrap gap-x-5 gap-y-4">
            {sidebarItems.map((item) => (
              <div
                key={item.text}
                className="flex items-center space-x-2 w-[40%]"
              >
                <Checkbox id={item.text} />
                <label htmlFor={item.text} className="text-sm font-medium ">
                  {item.text}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-semibold mt-5">AI Labels</h3>
          <div className="flex justify-between flex-wrap gap-x-5 gap-y-4">
            {aiLabels.map((label) => (
              <div
                key={label.id}
                className="flex items-center space-x-2 w-[40%]"
              >
                <Checkbox id={label.label || ""} />
                <label
                  htmlFor={label.label || ""}
                  className="text-sm font-medium "
                >
                  {label.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;
