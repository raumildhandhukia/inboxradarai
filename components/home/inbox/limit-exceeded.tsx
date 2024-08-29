import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext } from "react";
import { TbAnalyze } from "react-icons/tb";
import { InboxContext } from "@/context/inbox-context";
import { EmailDetailContext } from "@/context/email-detail-context";

interface LimitExceededProps {
  handleAnalyze: () => void;
  removeCooldown: () => void;
  emailsLeft: boolean;
}

const LimitExceeded: React.FC<LimitExceededProps> = ({
  handleAnalyze,
  removeCooldown,
  emailsLeft,
}) => {
  const { selectedAccount } = useContext(InboxContext);
  const { cooldownTime, setCooldownTime } = useContext(EmailDetailContext);
  useEffect(() => {
    if (cooldownTime > 0) {
      setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
    } else {
      if (emailsLeft) {
        removeCooldown();
      }
    }
  }, [cooldownTime]);

  return (
    <div className="flex justify-center items-center gap-5 px-2">
      {!emailsLeft ? (
        <div className="flex ml-5">
          <p className="">
            You have reached your monthly limit. Upgrade Your Plan to get
            insights.{" "}
          </p>
        </div>
      ) : (
        <>
          <Button
            variant="hacker"
            className="w-4 rounded-full"
            disabled={cooldownTime > 0}
            onClick={() => {
              handleAnalyze();
            }}
          >
            {cooldownTime < 0 ? (
              <div>
                <TbAnalyze className="scale-[1.5]" />
              </div>
            ) : (
              <span>{cooldownTime.toFixed(0)}</span>
            )}
          </Button>
          <p className="">Upgrade your plan to get insights now. </p>
        </>
      )}
    </div>
  );
};

export default LimitExceeded;
