import React, { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMdSettings } from "react-icons/io";

const Settings = ({}: {}) => {
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center h-9 w-11 bg-green-600 rounded-xl hover:bg-green-600/50">
        <IoMdSettings color="black" className="scale-[1.5]" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;
