import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserContext } from "@/context/user-context";
import { useContext, useState } from "react";

const Preferences = ({
  isPreferencesOpen,
  setIsPreferencesOpen,
}: {
  isPreferencesOpen: boolean;
  setIsPreferencesOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user, saveChanges, setUser } = useContext(UserContext);

  return (
    <>
      <Dialog open={isPreferencesOpen} onOpenChange={setIsPreferencesOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Preferences</DialogTitle>
            <DialogDescription>
              Make changes to your preferences here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full h-full justify-center gap-5">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-3 justify-center">
              <p className="text-center text-2xl">{user.name}</p>
              <p className="text-center text-md text-neutral-500">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Label htmlFor="theme" className="text-md">
                Subscription
              </Label>
              <p className="text-left text-sm text-neutral-500 mt-[3px]">
                {user.plan}
              </p>
            </div>
            {/* <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                checked={user.autoUpdate}
                // disabled={user.plan === "FREE"}
                onCheckedChange={(e) => {
                  setUser({
                    ...user,
                    autoUpdate: !user.autoUpdate,
                  });
                }}
              />
              <Label htmlFor="airplane-mode">Auto Update</Label>
            </div> */}
            <div className="flex flex-col gap-1 mt-5"></div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                setIsPreferencesOpen(false);
                saveChanges();
              }}
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Preferences;
