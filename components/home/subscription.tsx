"use client";
import { Button } from "@/components/ui/button";
import { getUserPlan } from "@/actions/plan";
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
import React, { useState, useEffect } from "react";
import { UserContext } from "@/context/user-context";
import Link from "next/link";
import Pricing from "../public/pricing";
import { format } from "date-fns";
import { Plan, PLANS } from "@/config/app";
import { start } from "repl";

const Subscription = ({
  isSubscriptionOpen,
  setIsSubscriptionOpen,
}: {
  isSubscriptionOpen: boolean;
  setIsSubscriptionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const { user, refreshUser } = React.useContext(UserContext);
  useEffect(() => {
    const setStates = async () => {
      const userPlanData = await getUserPlan();
      if (!userPlanData) {
        return;
      }
      const { plan, isCanceled, isSubscribed } = userPlanData;
      setPlan(plan);
      setIsSubscribed(isSubscribed);
      setIsCanceled(!!isCanceled);
    };

    setStates();
    refreshUser();
  }, [refreshUser]);

  return (
    <>
      <Dialog open={isSubscriptionOpen} onOpenChange={setIsSubscriptionOpen}>
        <DialogContent className="min-w-max max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Subscription</DialogTitle>
            <DialogDescription>
              Details about your current subscription and usage.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="flex justify-between">
              <div className="flex justify-start items-center gap-2 ">
                <Label htmlFor="name">You are on</Label>
                <div className="bg-gray-200 px-4 py-0 rounded-full -mt-1">
                  <p id="name" className="font-bold">
                    {plan?.plan}
                  </p>
                </div>
                <Label htmlFor="name">Plan</Label>
              </div>
              {/* <Button variant="indigo" className="rounded-full ml-2">
                <Link href="/billing"> Manage Plan</Link>
              </Button> */}
            </div>
            {isCanceled && isSubscribed && (
              <p>
                Your plan will be canceled on
                {format(user?.planEndingDate!, " MMMM.dd.yyyy")}
              </p>
            )}
          </div>
          <div className="flex justify-center gap-10 items-center">
            <div className="gap-2 flex flex-col">
              <div className="flex justify-between gap-4 leading-3">
                <Label htmlFor="name">Emails Processed</Label>
                <div className="">
                  <p id="name" className="font-semibold">
                    {user?.emailsProcessed}
                  </p>
                </div>
              </div>
              <div className="flex justify-between gap-4 leading-3">
                <Label htmlFor="name">Pre-defined Labels</Label>
                <div className="">
                  <p id="name" className="font-semibold">
                    {user?.predefinedLabels?.length}
                  </p>
                </div>
              </div>
              <div className="flex justify-between gap-4 leading-3">
                <Label htmlFor="name">Custom Labels</Label>
                <div className="">
                  <p id="name" className="font-semibold">
                    {user?.customLabels?.length}
                  </p>
                </div>
              </div>
              {user.plan !== "FREE" && !user.hasPlanCancelled && (
                <div className="flex justify-between gap-4 leading-3">
                  <Label htmlFor="name">Subscription Renews</Label>
                  <div className="">
                    <p id="name" className="font-semibold">
                      {user?.stripeEndDate}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="gap-2 flex flex-col">
              <div className="flex justify-between gap-4 leading-3">
                <Label htmlFor="name">Auto Updates</Label>
                <div className="">
                  <input type="checkbox" checked={plan?.autoProcess} disabled />
                </div>
              </div>
              <div className="flex justify-between gap-4 leading-3">
                <Label htmlFor="name">Unlimited Requests</Label>
                <div className="">
                  <input
                    type="checkbox"
                    checked={!plan?.processLimit}
                    disabled
                  />
                </div>
              </div>
              <div className="flex justify-between gap-4 leading-3">
                <Label htmlFor="name">Unlimited Inboxes</Label>
                <div className="">
                  <input
                    type="checkbox"
                    checked={plan?.multipleInbox}
                    disabled
                  />
                </div>
              </div>
              <div className="flex justify-between gap-4 leading-3">
                <Label htmlFor="name">AI Autocomplete Suggestions</Label>
                <div className="">
                  <input type="checkbox" checked={plan?.contentAi} disabled />
                </div>
              </div>
            </div>
          </div>
          <div className="w-max">
            {/* <Pricing noHeading currentPlan={user.plan} /> */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Subscription;
