"use client";
import { useTransition } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { createStripeSession } from "@/lib/stripe";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import Link from "next/link";
import { manageSubscriptions } from "@/actions/manage-subscriptions";

interface BillingFormProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const BillingForm = ({ subscriptionPlan }: BillingFormProps) => {
  const [isLoading, startTransition] = useTransition();
  const { toast } = useToast();
  const user = useCurrentUser();
  if (!user || !user.id) return null;
  const handleSumbit = async () => {
    startTransition(async () => {
      const url = await manageSubscriptions(
        user.id || "",
        subscriptionPlan.name || ""
      );
      if (url) window.location.href = url;
      if (!url) {
        toast({
          title: "There was a problem...",
          description: "Please try again in a moment",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <MaxWidthWrapper className="max-w-5xl">
      <form
        className="mt-12"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSumbit();
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>
              You are currently on the{" "}
              <strong>{subscriptionPlan.name || "Free"}</strong> plan.
              {subscriptionPlan.stripeCurrentPeriodEnd &&
                subscriptionPlan.isCanceled &&
                new Date() < subscriptionPlan.stripeCurrentPeriodEnd &&
                ` Your plan will be canceled on ${format(
                  subscriptionPlan.stripeCurrentPeriodEnd!,
                  "MMMM.dd.yyyy"
                )}.`}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
            <div className="flex gap-2">
              <Button type="submit">
                {isLoading ? (
                  <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                ) : null}
                {"Manage Subscription"}
              </Button>
              <Link href="/inbox?type=primary">
                <Button>Take me to dashboard</Button>
              </Link>
            </div>

            {subscriptionPlan.isSubscribed
              ? !subscriptionPlan.isCanceled && (
                  <p className="rounded-full text-xs font-medium">
                    {"Your plan renews on "}
                    {format(
                      subscriptionPlan.stripeCurrentPeriodEnd!,
                      "MMMM.dd.yyyy"
                    )}
                    .
                  </p>
                )
              : null}
          </CardFooter>
        </Card>
      </form>
    </MaxWidthWrapper>
  );
};

export default BillingForm;
