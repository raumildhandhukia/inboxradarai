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
import React, { useContext } from "react";
import { UserContext } from "@/context/user-context";
import Link from "next/link";
import Pricing from "../public/pricing";
import { format } from "date-fns";

const Subscription = ({
  isSubscriptionOpen,
  setIsSubscriptionOpen,
}: {
  isSubscriptionOpen: boolean;
  setIsSubscriptionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Dialog open={isSubscriptionOpen} onOpenChange={setIsSubscriptionOpen}>
        <DialogContent className="min-w-max max-h-[90vh] overflow-scroll">
          <DialogHeader>
            <DialogTitle>Subscription</DialogTitle>
            <DialogDescription>
              Details about your current subscription and usage.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="flex justify-start gap-2 leading-3">
              <Label htmlFor="name">Current Subscription</Label>
              <div className="bg-gray-200 px-4 py-2 rounded-full -mt-1">
                <p id="name" className="">
                  {user.plan}
                </p>
              </div>
            </div>
            {user.hasPlanCancelled && (
              <p>
                Your plan will be canceled on
                {format(user.planEndingDate!, " MMMM.dd.yyyy")}
              </p>
            )}
          </div>
          <div className="flex justify-start gap-2 leading-3">
            <Label htmlFor="name">Emails Processed</Label>
            <div className="">
              <p id="name" className="font-semibold">
                {user.emailsProcessed}
              </p>
            </div>
          </div>
          <div className="flex justify-start gap-2 leading-3">
            <Label htmlFor="name">Pre-defined Labels</Label>
            <div className="">
              <p id="name" className="font-semibold">
                {user.predefinedLabels.length}
              </p>
            </div>
          </div>
          <div className="flex justify-start gap-2 leading-3">
            <Label htmlFor="name">Custom Labels</Label>
            <div className="">
              <p id="name" className="font-semibold">
                {user.customLabels.length}
              </p>
            </div>
          </div>
          {user.plan !== "FREE" && (
            <div className="flex justify-start gap-2 leading-3">
              <Label htmlFor="name">Subscription Renews</Label>
              <div className="">
                <p id="name" className="font-semibold"></p>
              </div>
            </div>
          )}
          <div className="w-max">
            <Pricing noHeading currentPlan={user.plan} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Subscription;
